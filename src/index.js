import express from 'express';
import { PORT } from './config';
import loadCountries from './controllers/load-countries';
import findCountry from './controllers/paysage';

const app = express();
app.get('/api/load-countries', loadCountries);
app.get('/api/paysage/:id', findCountry);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
