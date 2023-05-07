// pages/api/menus/index.js
import { MongoClient } from 'mongodb';
import logger from '../../../lib/logger';

// let cachedClient = null;

// async function connectToDatabase() {
//   if (cachedClient) {
//     return cachedClient;
//   }
//   const client = await new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//   // const client = await MongoClient.connect(process.env.MONGODB_URI);
//   cachedClient = client;
//   return client;
// }



export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // const client = await connectToDatabase();
      console.info("menuStart");
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
      logger.info('menu_Load');
    } catch (error) {
      console.error('Error fetching menus:', error);
      logger.info('menu_error');
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  } else {
    res.status(405).json({ error: 'GET method only allowed' });
  }
}
