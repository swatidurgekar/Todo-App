import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const newid = Number(req.query.id);
    const client = await MongoClient.connect(
      "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const result = await todosCollection.deleteOne({ id: newid });
    client.close();
    res.status(201).json({ name: "something" });
  }
}

export default handler;
