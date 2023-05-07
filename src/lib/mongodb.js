import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export default async function connectToDatabase() {
    try {
        console.time('1');
        // console.log("Using database:", process.env.MONGODB_DATABASE);
// database = await mongoClient.db(process.env.MONGODB_DATABASE);

        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db(process.env.MONGODB_DATABASE);
        console.info("mongoLink");
        console.timeLog('1');
        console.timeEnd("1");
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}