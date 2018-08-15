const axios = require('axios');
const config = require('../config/config.js');

exports.index = (req, res) => {
  const url = `${config.cardihab.medications}${req.body.medication_list}`;

  axios.get(url, {
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  }).then((response) => {
    res.status(200).json(response.data);
  }, (error) => {
    res.send(error);
  });
};

