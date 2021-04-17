import { db } from '../config';

export default async (req, res) => {
  // const client = mongoclient.db("curieXplore");
  try {
    const categories = await db.collection('categoriesPaysage').find().toArray();
    const actors = await db.collection('actors').findOne({ iso: req.params.id });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      Structures: actors,
      Categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
