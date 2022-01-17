const express = require('express');
const router = express.Router();

router.post('/request', require('./requestLecturePOST'));
router.get('/rank', require('./lectureRankGET'));
router.get('/:categoryId/:skillId', require('./getLecturesGET'));

module.exports = router;
