const express = require('express');
const router = express.Router();

router.get('/total', require('./totalLectureGET'));
router.get('/request', require('./requestLectureGET'));
router.get('/find', require('./findLectureGET'));

module.exports = router;
