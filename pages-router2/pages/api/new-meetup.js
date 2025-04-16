import { MongoClient } from 'mongodb';

// /api/new-meetup         // This is the url of this file and if the url is triggered, it will run the function defined in this file.
// POST /api/new-meetup

async function handler(req, res) {  // --496
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://ralphadab:ralphadab@cluster0.wtnyrmq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();  // This db method will get a hold of the database -- 497

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);  // we're adding/POSTING data to d database here // insertOne is a built-in query command for inserting one new document into the collection or database table

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;