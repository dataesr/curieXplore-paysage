import express from 'express';
import { PORT } from './config';
import loadCountries from './controllers/load-countries';
import findCountry from './controllers/paysage';

const app = express();
app.get('/load-countries', loadCountries);
app.get('/paysage/:id', findCountry);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
