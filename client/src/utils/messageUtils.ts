import { MessageUnparsed, MessageParsed } from "@/components/schemas/schemas";

export const parseMessage = (msg: MessageUnparsed): MessageParsed => {
    return {
        uid: msg._id,
        user: msg.user,
        text: msg.text,
        added: new Date(msg.added),
    };
};

export const parseMessages = (msgs: MessageUnparsed[]): MessageParsed[] => {
    return msgs.map(parseMessage);
};
