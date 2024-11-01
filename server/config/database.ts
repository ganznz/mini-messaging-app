import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

config();

const uri = `mongodb+srv://${process.env.MONGODB_CONNECTION_CREDENTIALS}@cluster0.e7dld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const run = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to DB");
    } finally {
        // ensure client closes on finish/error
        await client.close();
    }
};
run().catch(console.dir);
