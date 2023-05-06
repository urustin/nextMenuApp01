import { MongoClient, ObjectId } from 'mongodb';

async function handleCancelOrder(req, res, orderId) {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DATABASE);
    const ordersCollection = db.collection('col_order');

    // Update order status to cancelled
    // 이건 cancelled로 업데이트
    // await ordersCollection.updateOne({ _id: new ObjectId(orderId) }, { $set: { status: 'cancelled' } });
    //이건 지우기
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });


    // Close connection and return success
    client.close();
    res.status(200).json({ message: 'Order cancelled and deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Failed to cancel the order.' });
  }
}

export default async function handler(req, res) {
  const { orderId } = req.query;

  if (req.method === 'PUT') {
    await handleCancelOrder(req, res, orderId);
  } else {
    res.status(405).json({ error: 'PUT 메소드만 허용됩니다.' });
  }
}
