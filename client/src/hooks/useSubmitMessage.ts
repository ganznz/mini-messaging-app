import { useState } from "react";
import axios from "axios";
import { z } from "zod";

import { formSchema } from "@/components/schemas/schemas";

export const useSubmitMessage = () => {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<Error | null>(null);

    const submitMessage = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/new", JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status !== 201) throw new Error("Failed to submit message");

            return true;
        } catch (err) {
            console.error(err);
            setErr(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { submitMessage, loading, err };
};
