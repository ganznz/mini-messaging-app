import { MongoClient, ServerApiVersion } from "mongodb";

export const connectDB = async () => {
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

    return client;
};
