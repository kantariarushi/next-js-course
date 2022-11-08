import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;

    let client;
    let movieResult;
    const connectionString = `mongodb+srv://rushiadmin:2HaAljK2VDkW4MLl@cluster0.dftdcwi.mongodb.net/Movies?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();
    try {
        const result = await db.collection('movies').find({"name": id}).toArray();
        movieResult=result
      } catch (error) {
        client.close();
        res.status(500).json({ message: error.message });
        return;
      }

    client.close();

    res
      .status(201)
      .json({ message: "success!", result: movieResult });
  }
}

export default handler;
