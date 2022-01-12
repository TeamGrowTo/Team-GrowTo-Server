const express = require('express');
const router = express.Router();

router.use('/request', require('./lecture'));

module.exports = router;