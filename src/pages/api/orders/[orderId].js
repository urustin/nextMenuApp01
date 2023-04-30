import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db(process.env.MONGODB_DB);
      const collection = db.collection('orders');

      const orderId = req.query.orderId;
      const result = await collection.updateOne({ _id: ObjectId(orderId) }, { $set: { status: 'cancelled' } });
      client.close();

      if (result.modifiedCount === 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ error: 'Error cancelling order' });
    }
  } else {
    res.status(405).json({ error: 'PUT method only allowed' });
  }
}
