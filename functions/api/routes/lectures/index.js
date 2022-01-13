const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.get('/rank', require('./lectureRankGET'));

module.exports = router;
