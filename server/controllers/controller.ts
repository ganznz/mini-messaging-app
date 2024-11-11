import { Request, Response, NextFunction } from "express";
import {
    getMessages as getMessagesFromDB,
    postMessage,
} from "../models/messageModel.js";
import { PostMessageRequest } from "../schema.js";
import { validateMessage, createMessageObject } from "./middleware.js";
import { createBadRequestError, createServerError } from "../utils/errors.js";

export const getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const msgs = await getMessagesFromDB();
        res.send(msgs);
    } catch (err) {
        console.error(err);
        next(createServerError("Failed to get messages"));
    }
};

export const createMessage = [
    validateMessage,
    createMessageObject,
    async (_req: PostMessageRequest, res: Response, next: NextFunction) => {
        try {
            await postMessage(res.locals.processedMessage);
            res.status(201).send("message added successfully");
        } catch (err) {
            next(createBadRequestError("Failed to add message"));
        }
    },
];
