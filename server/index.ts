// load server env vars before anything else
import "./config/init.js";
import { getDBClient } from "./config/database.js";

import express, { Request, Response } from "express";
import { getMessages } from "./controllers/controller.js";

const PORT = 8080;

const app = express();

app.get("/", getMessages);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
