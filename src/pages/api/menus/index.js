// pages/api/menus/index.js
import { MongoClient } from 'mongodb';
import logger from '../../../lib/logger';




let logObject=[];

function logToServer(message) {
  const timestamp = Date.now();
  // const time2 = standard - timestamp;
  
  let tempLog = {
    timestamp: timestamp,
    message: message,
  };
  logObject.push(tempLog);
  // console.log(logObject);
}



export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      logToServer("clientLoad");
      // console.timeLog("2");
      const db = client.db(process.env.MONGODB_DATABASE);
      logToServer("dbLoad");
      // console.timeLog("2");
      const collection = db.collection(process.env.MONGODB_COLLECTION);
      logToServer("colLoad");
      // console.timeLog("2");
      const menus = await collection.find().toArray();
      logToServer("menuQuery");
      // console.timeLog("2");
      // console.log(menus);
      client.close();
      let big = [];
      big.push(menus);
      big.push(logObject);
      res.status(200).json(big);
      // res.status(201).json(logObject)
      // res.status(200).json(menus);
      // console.info("menuLoad");
      // console.timeLog("2");
      // console.timeEnd("2");
      // logToServer(1,'menu_Load');

    } catch (error) {
      console.error('Error fetching menus:', error);
      logger.info('menu_error');
      res.status(500).json({ error: 'Failed to fetch menus' });
    }
  } else {
    res.status(405).json({ error: 'GET method only allowed' });
  }
}
