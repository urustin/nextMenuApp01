// pages/api/menu.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("db_menu"); // 데이터베이스 이름을 설정하세요
  const menuCollection = db.collection("col_menu"); // 컬렉션 이름을 설정하세요

  const menuItems = await menuCollection.find({}).toArray();

  res.status(200).json({ menuItems });
}