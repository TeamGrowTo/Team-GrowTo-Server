const express = require('express');
const router = express.Router();

router.post('/', require('./requestLecturePOST'));

module.exports = router;