const Axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config.js');

function tranformData(data) {
  console.log('tranformData');
  countries = [...new Set(data.map((structure) => structure.addresses[0].countryIso3))];
  const transformedData = countries.map((iso) => ({
    iso,
    data: data.filter((structure) => structure.addresses[0].countryIso3 === iso)
  }));

  return transformedData;
}

function paysageSave(data) {
  MongoClient.connect(config.mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db("curieXplore");
    dbo.collection('paysage').insertOne(data)
    db.close();
    return 201;
  });
}

exports.loadCountries = (req, res) => {
  console.log('loadCountries() ==> ');
  Axios.get(config.paysageUrl)
  .then((response) => {
    const transformedData = tranformData(response.data.Structures);
    // console.log('transformedData', transformedData);
    res.status(paysageSave(transformedData));
    res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      throw error;
    });
}


