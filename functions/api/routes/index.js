const express = require('express');
const router = express.Router();

router.use('/lectures', require('./lectures'));

module.exports = router;