import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, url } = req.body;

    if (
      !name ||
      !url ||
      name.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    if(
      !url.includes('i.pinimg.com')
    ){
      res.status(422).json({ message: 'please select image form this \'https://in.pinterest.com/mordeoorg/movie-wallpapers/\'.' });
      return;
    }

    const newMessage = {
      name,
      url,
    };

    let client;

    const connectionString = `mongodb+srv://rushiadmin:2HaAljK2VDkW4MLl@cluster0.dftdcwi.mongodb.net/Movies?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection('movies').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
