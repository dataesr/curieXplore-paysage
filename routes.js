import { Router } from 'express';
import loadCountries from './controllers/load-countries';
import findCountry from './controllers/paysage';

const router = Router();

router.get('/load-countries', loadCountries);
router.get('/paysage/:id', findCountry);

export default router;
