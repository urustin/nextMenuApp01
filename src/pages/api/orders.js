import { MongoClient } from 'mongodb';

async function handleGetOrders(req, res) {
  try {
    // 여기에 MongoDB 연결 및 쿼리 코드를 구현합니다.
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DATABASE);
    // console.log(db);
    const ordersCollection = db.collection('col_order');
    // console.log(ordersCollection);

    // Fetch orders from database
    const ordersFromDatabase = await ordersCollection.find({}).toArray();

    // 주문 데이터를 반환합니다.
    res.status(200).json({ orders: ordersFromDatabase });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
}

async function handleCreateOrder(req, res) {
  const { id, name, price } = req.body;
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DATABASE);
    const ordersCollection = db.collection('col_order');
    // console.log(req.body);
    // Create new order
    const newOrder = {
      name,
      price,
      id,
      orderNumber: Math.floor(Math.random() * 100000),
      createdAt: new Date(),

    };

    await ordersCollection.insertOne(newOrder);

    // Close connection and return success
    client.close();
    res.status(201).json({ orderNumber: newOrder.orderNumber });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: '주문을 처리하는 동안 오류가 발생했습니다.' });
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleCreateOrder(req, res);
  } else if (req.method === 'GET') {
    await handleGetOrders(req, res);
  } else {
    res.status(405).json({ error: 'GET 또는 POST 메소드만 허용됩니다.' });
  }
}
