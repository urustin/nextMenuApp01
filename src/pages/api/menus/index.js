// pages/api/menus/index.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DB);
      const collection = db.collection(process.env.MONGODB_COLLECTION);
        
      const menus = await collection.find().toArray();

      client.close();
      res.status(200).json(menus);
    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  } else {
    res.status(405).json({ error: 'GET method only allowed' });
  }
}
