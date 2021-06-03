/* eslint-disable no-console */
import axios from 'axios';
import { db } from './mongo';
import { PAYSAGE_URL } from './config';

function tranformData(data) {
  const countries = [...new Set(data.map((e) => e.addresses[0].countryIso3))];
  return countries.map(
    (iso) => ({ iso, data: data.filter((e) => e.addresses[0].countryIso3 === iso) }),
  );
}

async function mongoWrite(collection, data) {
  await db.collection(`${collection}_old`).drop()
    .catch(() => { console.log('No old data'); });
  await db.collection(collection).rename(`${collection}_old`)
    .catch(() => { console.log('Init data'); });
  await db.collection(collection).insertMany(data)
    .catch(() => { console.log('Error inserting Data'); });
}

export default async function loadDataJob() {
  const response = await axios.get(PAYSAGE_URL).catch((err) => { throw err; });
  const transformedData = tranformData(response.data.Structures);
  await mongoWrite('actors', transformedData);
  await mongoWrite('categories', response.data.Categories);
}
