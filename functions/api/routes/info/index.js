const express = require('express');
const router = express.Router();

router.get('/categories', require('./getCategoriesGET'));

module.exports = router;
