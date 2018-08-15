const router = require('express').Router();
const controller = require('../controllers/authentication.js');

router.post('/login', controller.login);

module.exports = router;
