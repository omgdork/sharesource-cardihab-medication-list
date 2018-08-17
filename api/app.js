const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const authRouter = require('./routes/authentication.js');
const medicationsRouter = require('./routes/medications.js');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN);
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

app.use('/', routes);
app.use('/auth', authRouter);
app.use('/search_medication', medicationsRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${server.address().port}`);
});
