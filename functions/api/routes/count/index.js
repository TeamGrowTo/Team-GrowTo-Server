const express = require('express');
const router = express.Router();

router.get('/total', require('./totalLectureGET'));

module.exports = router;
