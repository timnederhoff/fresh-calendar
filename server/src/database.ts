import * as mongodb from "mongodb";
import FruitVegetable from "./fruit-vegetable";

export const collections: {
  fruitVegetables?: mongodb.Collection<FruitVegetable>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("freshcalendar");
  await applySchemaValidation(db);

  const fruitVegetablesCollection = db.collection<FruitVegetable>("fruitVegetables");
  collections.fruitVegetables = fruitVegetablesCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["type", "name", "origins"],
      additionalProperties: false,
      properties: {
        _id: {},
        type: {
          bsonType: "string",
          description: "'type' is required and is one of 'fruit' or 'vegetable'",
        },
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        origins: {
          bsonType: "array",
          items: { $ref: "#/$defs/origin" }
        },
        level: {
          bsonType: "string",
          description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
          enum: ["junior", "mid", "senior"],
        },
      },
    },
    $defs: {
      origin: {
        bsonType: "object",
        properties: {
          country: {
            items: { $ref: "#/$defs/country" },
            description: "country is required"
          },
          months: {
            bsonType: "array",
            items: {
              type: "number",
              description: "month number of the year"
            }
          }
        }
      },
      country: {
        bsonType: "object",
        properties: {
          name: {
            bsonType: "string",
            description: "the name of the country"
          },
          distanceFromUtrecht: {
            bsonType: "number",
            description: "the number of kilometers from utrecht to the country"
          }
        }
      }
    }
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "employees",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection("employees", {validator: jsonSchema});
    }
  });
}
