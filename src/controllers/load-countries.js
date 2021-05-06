import Axios from 'axios';
import { db } from '../mongo';
import { PAYSAGE_URL } from '../config';

function tranformData(data) {
  const countries = [...new Set(data.map((structure) => structure.addresses[0].countryIso3))];
  const transformedData = countries.map((iso) => ({
    iso,
    data: data.filter((structure) => structure.addresses[0].countryIso3 === iso),
  }));

  return transformedData;
}

async function mongoWrite(collectionName, data) {
  try {
    const collections = await db.listCollections().toArray();
    if (collections.find((collection) => collection.name === `${collectionName}_old`)) {
      db.collection(`${collectionName}_old`).drop();
      console.log(`Delete ${collectionName}_old`);
    }
    if (collections.find((collection) => collection.name === collectionName)) {
      db.collection(collectionName).rename(`${collectionName}_old`);
      console.log(`Save old data ${collectionName}`);
    }
    db.collection(collectionName).insertMany(data);
    console.log(`Write new data ${collectionName}`);

    return;
  } catch (err) {
    console.log(err);
  }
}

export default (req, res) => {
  console.log('Load countries from paysage to mongodb');
  Axios.get(PAYSAGE_URL)
    .then((response) => {
      const transformedData = tranformData(response.data.Structures);
      if (mongoWrite('actors', transformedData) && mongoWrite('categories', response.data.Categories)) {
        res.status(201).json({ message: "Successfully loaded countries"});
      } else {
        res.status(500);
      }
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
      throw error;
    });
};
