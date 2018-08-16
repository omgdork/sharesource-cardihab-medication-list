const axios = require('axios');
const config = require('../config/config.js');

exports.index = (req, res) => {
  const url = `${config.cardihab.medications}${req.body.medication}`;

  axios.get(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  }).then((response) => {
    res.status(200).send(response.data);
  }, (error) => {
    res.status(error.response.status).send(error.response.data);
  });
};
