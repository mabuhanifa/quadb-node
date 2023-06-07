const { getResponse } = require('../controller/cryptoController');

const router = require('express').Router();

router.get('/', getResponse);

module.exports = router;