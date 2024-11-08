import { ChangeStreamDocument } from "mongodb";
import { io } from "../index.js";
// "drop" |
// "rename" |
// "dropDatabase" |
// "invalidate" |
// "createIndexes" |
// "create" |
// "modify" |
// "dropIndexes" |
// "shardCollection" |
// "reshardCollection" |
// "refineCollectionShardKey" |
// "insert" |
// "update" |
// "replace" |
// "delete";

export const handleMessageChange = (change: ChangeStreamDocument) => {
    console.log("Change event:", change.operationType);
    switch (change.operationType) {
        // new message added
        case "insert":
            // change.fullDocument is the message
            io.emit("newMessage", change.fullDocument);
            break;
    }
};
