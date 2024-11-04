// load server env vars before anything else
import "./config/init.js";
import { getDBClient } from "./config/database.js";

import express, { Request, Response } from "express";

const PORT = 8080;

const app = express();
const dbClient = await getDBClient();

app.get("/", async (req: Request, res: Response) => {
    try {
        const db = dbClient.db("sample_mflix");
        const users = db.collection("users");
        const user = await users.findOne({ name: "Ned Stark" });
        console.log(user);
        res.send("*kissy emoji*");
    } catch (err) {
        console.error(err);
    }
});

app.get("/new", (req: Request, res: Response) => {});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.get("/new", async (req: Request))
