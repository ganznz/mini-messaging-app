import { Request, Response } from "express";
import {
    getMessages as getMessagesFromDB,
    postMessage,
} from "../models/messageModel.js";
import { PostMessageRequest } from "../schema.js";
import { validateMessage, createMessageObject } from "./middleware.js";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const msgs = await getMessagesFromDB();
        res.send(msgs);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createMessage = [
    validateMessage,
    createMessageObject,
    async (_req: PostMessageRequest, res: Response) => {
        try {
            await postMessage(res.locals.processedMessage);
            res.status(201).send("message added successfully");
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
];
