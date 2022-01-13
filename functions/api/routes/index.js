const express = require('express');
const router = express.Router();

router.use('/lectures', require('./lectures'));
router.use('/count', require('./count'));

module.exports = router;
