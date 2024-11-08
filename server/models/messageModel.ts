import { getDBClient } from "../config/database.js";
import { Message } from "../schema.js";

const dbClient = await getDBClient();
const messagesCollection = dbClient
    .db("miniMessagingAppDb")
    .collection<Message>("messages");

/**
 * Retrieves messages from the database
 * @param limit Optional number of messages to retrieve
 * @returns A promise that resolves to an array of messages
 * @throws If there's an error retrieving messages from the database
 */
export const getMessages = async (limit?: number): Promise<Message[]> => {
    try {
        const results = await messagesCollection
            .find({})
            .sort({ added: -1 })
            .limit(200)
            .toArray();

        return results;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

/**
 * Stores a message in the database
 * @param message - The message to store
 * @throws If there's an error storing the message in the database
 */
export const postMessage = async (message: Message) => {
    try {
        const result = await messagesCollection.insertOne(message);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
