const express = require('express');
const bodyParser = require('body-parser');

const { rateLimiter } = require('./rateLimiter');

const REQUEST_RATE = 10;
const TIMEOUT = 10000;

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => rateLimiter(req, res, next, {rate: REQUEST_RATE, timeout: TIMEOUT}));

app.get('/test', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}...`);
});
