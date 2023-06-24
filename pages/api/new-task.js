// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
    );
    const db = client.db();
    const todosColeection = db.collection("todos");
    const result = await todosColeection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ name: "John Doe" });
  }
}

export default handler;
