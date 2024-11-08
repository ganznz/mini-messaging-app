import { Request, Response, NextFunction } from "express";
import { Message } from "../schema.js";

export const validateMessage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.user || !req.body.text) {
        res.status(400).send("Invalid request body");
    }
    if (req.body.user.length < 3 || req.body.user.length > 20) {
        res.status(400).send("Invalid Username length");
    }
    if (req.body.text.length < 10 || req.body.user.length > 150) {
        res.status(400).send("Invalid Message length");
    }
    next();
};

export const createMessageObject = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.locals.processedMessage = {
        user: req.body.user,
        text: req.body.text,
        added: new Date(),
    };
    next();
};
