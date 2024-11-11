import { MessageCard } from "./MessageCard";

import { useEffect, useState, useCallback } from "react";

import { useMessages } from "@/hooks/useMessages";
import { useNewMessageSocket } from "@/hooks/useNewMessageSocket";
import { MessageParsed } from "../schemas/schemas";

export const MessageDisplay = () => {
    const { messages: initialMessages, loading, err } = useMessages();
    const [messages, setMessages] = useState(initialMessages);

    // set initial messages to messages state
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    // cache this function between re-renders
    const handleNewMessage = useCallback((msg: MessageParsed) => {
        setMessages((prev) => [msg, ...(prev || [])]);
    }, []);

    useNewMessageSocket(handleNewMessage);

    return (
        <div className="w-full h-full overflow-scroll p-4">
            {loading && <p>Loading messages...</p>}
            {err && <p>Error: {err.message}</p>}
            {messages && messages.length > 0 ? (
                messages.map(({ uid, user, text, added }) => {
                    // message card
                    return (
                        <MessageCard
                            key={uid}
                            user={user}
                            message={text}
                            added={added}
                        />
                    );
                })
            ) : (
                <h2 className="text-center place-self-center mt-[25vh] text-xl text-gray-600">
                    No messages. Send one!
                </h2>
            )}
        </div>
    );
};
