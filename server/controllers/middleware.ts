import { Request, Response, NextFunction } from "express";
import { Message } from "../schema.js";
import { AppError } from "../utils/errors.js";
import { createBadRequestError } from "../utils/errors.js";

export const validateMessage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.user || !req.body.text) {
        return next(createBadRequestError("Missing required fields"));
    }
    if (req.body.user.length < 3 || req.body.user.length > 20) {
        return next(createBadRequestError("Invalid username length"));
    }
    if (req.body.text.length < 10 || req.body.text.length > 150) {
        return next(createBadRequestError("Invalid message length"));
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

// error handling middleware
export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // handle custom errors
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // default server error
    return res.status(500).json({
        status: "error",
        message: "Something unexpected happened",
    });
};
