import { useState, useEffect } from "react";
import axios from "axios";

interface MessageUnparsed {
    _id: string;
    user: string;
    text: string;
    added: string;
}

interface MessageParsed {
    uid: string;
    user: string;
    text: string;
    added: Date;
}

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

const parseMessages = (msgs: MessageUnparsed[]) => {
    return msgs.map((msg) => ({
        uid: msg._id,
        user: msg.user,
        text: msg.text,
        added: new Date(msg.added),
    }));
};
