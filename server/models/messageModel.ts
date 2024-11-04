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
            .sort({ createdAt: -1 })
            .toArray();

        return results;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
