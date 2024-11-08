import { z } from "zod";

export const formSchema = z.object({
    user: z.string().min(3, { message: "Username is too short!" }).max(20, {
        message: "Username is too long!",
    }),
    text: z
        .string()
        .min(10, { message: "Message is too short!" })
        .max(150, { message: "Message is too short!" }),
});

export interface MessageUnparsed {
    _id: string;
    user: string;
    text: string;
    added: string;
}

export interface MessageParsed {
    uid: string;
    user: string;
    text: string;
    added: Date;
}
