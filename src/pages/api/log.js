// pages/api/log.js
import logger from "@/lib/logger";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { level, message } = req.body;
    // logger[level](message);
    res.status(200).json({ message: 'Log received and processed' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}