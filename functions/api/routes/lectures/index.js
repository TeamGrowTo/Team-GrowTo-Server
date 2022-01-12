const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));

module.exports = router;