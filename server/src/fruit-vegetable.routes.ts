import express from "express";
import mongodb from "mongodb";
import { collections } from "./database";

export const fruitVegetableRouter = express.Router();
fruitVegetableRouter.use(express.json());

fruitVegetableRouter.get("/", async (_req, res) => {
    try {
        const fruitVegetable = await collections.fruitVegetables.find({}).toArray();
        res.status(200).send(fruitVegetable);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

fruitVegetableRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const fruitVegetable = await collections.fruitVegetables.findOne(query);

        if (fruitVegetable) {
            res.status(200).send(fruitVegetable);
        } else {
            res.status(404).send(`Failed to find fruit or vegetable with ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find fruit or vegetable with ID ${req?.params?.id}`);
    }
});

fruitVegetableRouter.post("/", async (req, res) => {
    try {
        const fruitVegetable = req.body;
        const result = await collections.fruitVegetables.insertOne(fruitVegetable);

        if (result.acknowledged) {
            res.status(201).send(`Created a fruit or vegetable with ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a fruit or vegetable with.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

fruitVegetableRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const fruitVegetable = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.fruitVegetables.updateOne(query, { $set: fruitVegetable });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a fruit or vegetable with ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a fruit or vegetable with ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a fruit or vegetable with ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

fruitVegetableRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.fruitVegetables.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a fruit or vegetable with ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a fruit or vegetable with ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a fruit or vegetable with ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
