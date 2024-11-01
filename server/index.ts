import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

import express, { Request, Response } from "express";
import { connectDB } from "./config/database.js";

const PORT = 8080;

// get dir name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// configure dotenv w/ the explicit path
// gotta do this because the cmd that executes this file isn't in same dir as this file
config({ path: path.resolve(__dirname, ".env") });

const app = express();
const dbClient = await connectDB();

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
