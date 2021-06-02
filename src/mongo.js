import { MongoClient } from 'mongodb';
import { MONGO_URI } from './config';

export const mongo = new MongoClient(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongo.connect();
export const db = mongo.db('curiexplore');
