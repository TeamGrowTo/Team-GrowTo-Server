const express = require('express');
const router = express.Router();

router.get('/categories', require('./getCategoriesGET'));
router.get('/:skillId/tags', require('./skillTagsGET'));

module.exports = router;
