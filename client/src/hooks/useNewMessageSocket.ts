import { MessageParsed } from "@/components/schemas/schemas";
import { parseMessage } from "@/utils/messageUtils";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useNewMessageSocket = (
    onNewMessage: (msg: MessageParsed) => void
) => {
    const socket = useRef<Socket>();

    useEffect(() => {
        if (!socket.current) {
            const socketUrl =
                import.meta.env.VITE_ENV === "dev"
                    ? import.meta.env.VITE_API_URL_DEV
                    : import.meta.env.VITE_API_URL_PROD;

            socket.current = io(socketUrl);

            socket.current.on("newMessage", (msg) => {
                onNewMessage(parseMessage(msg));
            });
        }

        // cleanup socket connections
        return () => {
            if (socket.current) {
                socket.current.off("newMessage");
                socket.current.disconnect();
                socket.current = undefined;
            }
        };
    }, [onNewMessage]);
};
