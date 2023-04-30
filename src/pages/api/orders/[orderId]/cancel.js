import { MongoClient } from 'mongodb';

async function handleCancelOrder(req, res, orderId) {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    const ordersCollection = db.collection('orders');

    // Update order status to cancelled
    const updateResult = await ordersCollection.updateOne(
      { _id: new MongoClient.ObjectId(orderId) },
      { $set: { status: 'cancelled' } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).json({ error: '주문이 존재하지 않거나 이미 취소되었습니다.' });
      return;
    }

    // Close connection and return success
    client.close();
    res.status(200).json({ message: '주문이 취소되었습니다.' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: '주문을 취소하는 동안 오류가 발생했습니다.' });
  }
}

export default async function handler(req, res) {
  const {
    query: { orderId },
  } = req;

  if (req.method === 'PUT') {
    await handleCancelOrder(req, res, orderId);
  } else {
    res.status(405).json({ error: 'PUT 메소드만 허용됩니다.' });
  }
}
