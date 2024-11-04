import { MongoClient, ServerApiVersion } from "mongodb";

let dbClient: MongoClient;
let initializationPromise: Promise<MongoClient>;

export const connectDB = async (): Promise<MongoClient> => {
    if (dbClient) return dbClient;
    const uri = `mongodb+srv://${process.env.MONGODB_CONNECTION_CREDENTIALS}@cluster0.e7dld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
