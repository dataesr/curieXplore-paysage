import { MongoClient } from 'mongodb';
import { MONGO_URI } from './config';

const mongo = new MongoClient(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongo.connect();
export const db = mongo.db('curieXplore');
