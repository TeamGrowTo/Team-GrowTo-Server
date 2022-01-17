const express = require('express');
const router = express.Router();

router.get('/categories', require('./getCategoriesGET'));
router.get('/report', require('./reportReasonGET'));
router.get('/:skillId/tags', require('./skillTagsGET'));

module.exports = router;
