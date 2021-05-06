import express from 'express';
import { PORT } from './config';
import loadCountries from './controllers/load-countries';
import findCountry from './controllers/paysage';

const app = express();
app.get('/api/load-countries', loadCountries);
app.get('/api/paysage/:id', findCountry);
app.get('/api/', (req, res) => res.json({ message: "Welcome to curiexplore-api" }));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
