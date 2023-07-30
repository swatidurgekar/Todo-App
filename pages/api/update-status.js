import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    const result = await todosCollection.updateOne(
      { id: data.id },
      { $set: { status: "complete" } }
    );
    console.log(result);
    client.close();
    res.status(201).json({ name: "John Doe" });
  }
}

export default handler;
