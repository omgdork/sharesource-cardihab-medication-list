const axios = require('axios');
const config = require('../config/config.js');

exports.login = (req, res) => {
  axios.post(config.cardihab.login, {
    username: req.body.username,
    password: req.body.password,
  }).then((response) => {
    res.status(200).send(response.data);
  }, (e) => {
    res.status(403).send('Invalid login.');
  });
};
