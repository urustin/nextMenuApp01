// pages/api/menus/index.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.time("2");
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DATABASE);
      const collection = db.collection(process.env.MONGODB_COLLECTION);
        
      // console.log("Using database:", process.env.MONGODB_DATABASE);
// database = await mongoClient.db(process.env.MONGODB_DATABASE);

      const menus = await collection.find().toArray();
      // console.log(menus);
      client.close();
      res.status(200).json(menus);
      console.info("menuLoad");
      console.timeLog("2");
      console.timeEnd("2");
    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  } else {
    res.status(405).json({ error: 'GET method only allowed' });
  }
}
