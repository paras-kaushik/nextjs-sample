import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup
// code defined here will never end up on the client side
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://paras:qfH7Po4JFKXvo7IJ@cluster0.jf8na.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    //mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
