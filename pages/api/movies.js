import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    let data;
    let movieClient;

    const connectionString = `mongodb+srv://rushiadmin:RYNcFwzwuhZWEdVz@cluster0.dftdcwi.mongodb.net/my-site?retryWrites=true&w=majority`;
    const MovieconnectionString = `mongodb+srv://rushiadmin:RYNcFwzwuhZWEdVz@cluster0.dftdcwi.mongodb.net/Movies?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
      movieClient = await MongoClient.connect(MovieconnectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();
    const movieDb = movieClient.db();
    console.log("into the handler =----=-=-=-=->", db)
    try {
      const result = await db.collection('messages').insertOne(newMessage);
      data = await movieDb.collection('movies').find({}).toArray();
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage, data: data });
  }
  else {
    let data;
    let movieClient;

    const MovieconnectionString = `mongodb+srv://rushiadmin:RYNcFwzwuhZWEdVz@cluster0.dftdcwi.mongodb.net/Movies?retryWrites=true&w=majority`;

    try {
      movieClient = await MongoClient.connect(MovieconnectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const movieDb = movieClient.db();
    try {
      data = await movieDb.collection('movies').find({}).toArray();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', data: data });
  }
}

export default handler;
