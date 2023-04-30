import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log("1body="+req.body);
    const { id, name, price } = req.body;
    // console.log(price);

    const { database } = await connectToDatabase();
    // console.log(client);
    // console.log("database="+database);
    // console.log("connect="+connectToDatabase());
    // const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    // console.log(collection);
    // console.log(collection.find({}));

    try {
      await database.collection("col_menu").insertOne({ id, name, price });
      res.status(201).json({ message: "Menu added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding menu", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
