const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.post('/report', require('./reportPOST'));
router.get('/rank', require('./lectureRankGET'));
router.get('/:categoryId/:skillId', require('./getLecturesGET'));
router.get('/compare', require('./comparingLectureGET'));
router.get('/result/:findId', require('./getResultGET'));
router.post('/search', require('./lectureSearchPOST'));

module.exports = router;
