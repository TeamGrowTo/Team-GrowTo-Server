const express = require('express');
const router = express.Router();

router.use('/lectures', require('./lectures'));
router.use('/info', require('./info'));

module.exports = router;