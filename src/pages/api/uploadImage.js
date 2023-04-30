import { MongoClient } from 'mongodb';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';
import nextConnect from 'next-connect';

// multer 설정
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 최대 파일 크기: 5MB
  },
});

const handler = nextConnect();

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  try {
    // MongoDB 연결
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection(process.env.MONGODB_COLLECTION);

    const bucket = new GridFSBucket(db);

    // 이미지 파일 저장
    const file = req.file;
    const uploadStream = bucket.openUploadStream(file.originalname);
    const fileId = uploadStream.id;
    file.stream.pipe(uploadStream);

    // 업로드 완료 시 응답
    uploadStream.on('finish', () => {
      client.close();
      res.status(200).json({ fileId });
    });
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    res.status(500).json({ error: '이미지 업로드 중 오류가 발생했습니다.' });
  }
});

export default handler;
