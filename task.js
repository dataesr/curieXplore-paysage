const cron = require('node-cron');
// const { loadCountries } = require('./controllers/load-countries');

cron.schedule('* * * * *', () => {
  console.log('test');
  // loadCountries();
});
