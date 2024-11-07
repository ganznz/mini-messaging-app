import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(3, { message: "Username is too short!" }).max(20, {
        message: "Username is too long!",
    }),
    msg: z
        .string()
        .min(10, { message: "Message is too short!" })
        .max(150, { message: "Message is too short!" }),
});
