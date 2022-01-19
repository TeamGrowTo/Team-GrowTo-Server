const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.post('/report', require('./reportPOST'));
router.get('/rank', require('./lectureRankGET'));
router.get('/compare', require('./comparingLectureGET'));
router.post('/search', require('./lectureSearchPOST'));
router.get('/result/:findId', require('./getResultGET'));
router.get('/:categoryId/:skillId', require('./getLecturesGET'));

module.exports = router;
