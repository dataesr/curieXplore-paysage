const express = require('express');

const router = express.Router();

const loadCountriesControler = require('./controllers/load-countries');
const paysageControler = require('./controllers/paysage');

router.route('/load-countries').get(loadCountriesControler.loadCountries);
router.route('/paysage/:id').get(paysageControler.findCountry);

module.exports = router;