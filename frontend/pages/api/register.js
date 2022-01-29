const { MongoClient } = require('mongodb');


export default async function register(req, res) {
    const uri = "mongodb+srv://conuhacks:conuhacks@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const collection = client.db("blockchainvoting").collection("register");

    await collection.insertOne({
        name: req.query.name,
        email: req.query.email,
        number: req.query.number,
        address: req.query.address,
    });
    res.status(200).json({ message: 'Hello World' });
}