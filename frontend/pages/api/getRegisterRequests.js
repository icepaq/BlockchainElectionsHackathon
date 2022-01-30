const { MongoClient } = require("mongodb");

export default async function register(req, res) {
  const uri =
    "mongodb+srv://conuhacks:conuhacks@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const collection = client.db("blockchainvoting").collection("register");

  const cursor = await collection.find({});
  const result = await cursor.toArray();

  let data = [];
  result.forEach((r) => {
    data.push(r);
  });

  await client.close();
  res.status(200).json({ result: data });
}
