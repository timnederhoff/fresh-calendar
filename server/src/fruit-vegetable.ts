import * as mongodb from "mongodb";

export default interface FruitVegetable {
  type: "fruit" | "vegetable",
  name: string,
  origins: Origin[],
  picture: string
  _id?: mongodb.ObjectId;
}

interface Origin {
  country: Country,
  months: number[]
}

interface Country {
  name: string,
  distanceFromUtrecht: number,
}
