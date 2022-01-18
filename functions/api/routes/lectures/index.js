const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.get('/rank', require('./lectureRankGET'));
router.get('/compare', require('./comparingLectureGET'));
router.get('/result/:findId', require('./getResultGET'));

module.exports = router;
