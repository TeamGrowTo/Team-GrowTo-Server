const express = require('express');
const router = express.Router();

router.get('/categories', require('./getCategoriesGET'));
router.get('/:categoryId/skills', require('./getSkillsGET'));

module.exports = router;
