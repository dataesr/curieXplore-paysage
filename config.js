import { MongoClient } from 'mongodb';

const port = 3000;

const mongoUrl = 'mongodb://mongo:27017';

const paysageUrl = 'https://paysage.mesri.fr/CurieXplore/Json/';

const mongo = new MongoClient(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
mongo.connect();
const db = mongo.db('curieXplore');

export {
  mongoUrl, mongo, port, paysageUrl, db,
};
