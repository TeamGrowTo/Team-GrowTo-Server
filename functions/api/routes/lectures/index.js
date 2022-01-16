const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.post('/report', require('./reportPOST'));
router.get('/rank', require('./lectureRankGET'));

module.exports = router;
