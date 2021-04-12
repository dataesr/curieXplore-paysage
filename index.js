const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');
const config = require('./config.js');

app.use(routes);
app.use(cors());

app.listen(config.port, () => 
  console.log(`App is listening on port ${config.port}`)
);