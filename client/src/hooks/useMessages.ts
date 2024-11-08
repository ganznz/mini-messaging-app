import { useState, useEffect } from "react";
import axios from "axios";
import { MessageParsed } from "@/components/schemas/schemas";
import { parseMessages } from "@/utils/messageUtils";

export const useMessages = () => {
    const [messages, setMessages] = useState<MessageParsed[]>();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api");
                setMessages(parseMessages(res.data));
            } catch (err) {
                console.error(err);
                setErr(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    return { messages, loading, err };
};
