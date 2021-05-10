import express from 'express';
import cors from 'cors';
import loadCountries from './controllers/load-countries';
import findCountry from './controllers/paysage';

const app = express();
app.use(cors());
app.get('/api/load-countries', loadCountries);
app.get('/api/paysage/:id', findCountry);
app.get('/api/', (req, res) => res.json({ message: "Welcome to curiexplore-api" }));

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
