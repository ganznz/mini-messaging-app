import { Request, Response } from "express";
import { getMessages as getMessagesFromDB } from "../models/messageModel.js";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const msgs = await getMessagesFromDB();
        res.send(msgs);
    } catch (err) {
        console.error(err);
    }
};
