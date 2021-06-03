import { db } from './mongo';

export default async function getCountries(req, res) {
  const categories = await db.collection('categories').find().toArray()
    .catch(() => res.status(500).json({ message: 'Une erreur est survenue' }));
  const actors = await db.collection('actors').findOne({ iso: req.params.id })
    .catch(() => res.status(500).json({ message: 'Une erreur est survenue' }));
  res.status(200).json({ Structures: actors, Categories: categories });
}
