import { Request } from "express";

export interface Message {
    user: string;
    text: string;
    added: Date;
}

export interface PostMessageRequest extends Request {
    body: {
        user: string;
        text: string;
    };
}
