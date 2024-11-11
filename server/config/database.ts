import { MongoClient, ServerApiVersion } from "mongodb";
import { Message } from "../schema.js";
import { handleMessageChange } from "../services/messageService.js";

let dbClient: MongoClient;
let initializationPromise: Promise<MongoClient>;

export const connectDB = async (): Promise<MongoClient> => {
    if (dbClient) return dbClient;
    const dbCredentials = process.env.MONGODB_CONNECTION_CREDENTIALS;
    const clusterName = process.env.MONGODB_CLUSTER_NAME;
    const uri = `mongodb+srv://${dbCredentials}@${clusterName}.e7dld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    await client.connect();
    console.log("Connected to DB");

    dbClient = client;

    // initialize change stream
    const messageCollection = dbClient
        .db("miniMessagingAppDb")
        .collection<Message>("messages");

    const changeStream = messageCollection.watch();
    changeStream.on("change", handleMessageChange);

    return dbClient;
};

export const getDBClient = async (): Promise<MongoClient> => {
    // ensure db is connected before returning
    // hopefully i remember to add timeout later cbf rn lol
    await initializationPromise;

    if (!dbClient) {
        throw new Error("DB client not connected");
    }
    return dbClient;
};

// immediately invoke func to connect to db
initializationPromise = (async () => {
    try {
        dbClient = await connectDB();
        return dbClient;
    } catch (err) {
        console.error(err);
        throw err;
    }
})();
