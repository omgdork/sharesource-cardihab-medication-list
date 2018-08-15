const router = require('express').Router();
const controller = require('../controllers/medications.js');

router.post('/', controller.index);

module.exports = router;
