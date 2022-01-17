const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.get('/rank', require('./lectureRankGET'));
router.get('/compare', require('./comparingLectureGET'));
router.post('/search', require('./lectureSearchPOST'));

module.exports = router;
