import { MongoClient } from 'mongodb';
import Grid from 'gridfs-stream';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const gfs = Grid(db, MongoClient);

    const fileId = req.query.fileId;

    const readStream = gfs.createReadStream({ _id: fileId });
    readStream.pipe(res);

    readStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error retrieving file' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error connecting to database' });
  } finally {
    await client.close();
  }
};

export default handler;
