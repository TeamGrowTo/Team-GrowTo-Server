const express = require('express');
const router = express.Router();

router.get('/total', require('./totalLectureGET'));
router.get('/request', require('./requestLectureGET'));

module.exports = router;
