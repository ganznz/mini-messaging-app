// load server env vars before anything else
import "./config/init.js";

import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

import { getMessages, createMessage } from "./controllers/controller.js";
import { errorHandler } from "./controllers/middleware.js";
import { Response, Request, NextFunction } from "express";

const PORT = 8080;

const app = express();
const httpServer = createServer(app);

// initialize websocket server
const clientUrl =
    process.env.NODE_ENV == "dev"
        ? process.env.CLIENT_URL_DEV
        : process.env.CLIENT_URL_PROD;
const io = new Server(httpServer, {
    cors: {
        origin: clientUrl, // Your Vite dev server URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.get("/api", getMessages);
app.post("/api/new", createMessage);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export { io };
