const express = require('express');
const router = express.Router();

// project controller
// pc equals to projectController
const pc = require('./controller');

// project validation
// md equals to middlware
const md = require('./validation');


router.get('/:organization_id', pc.projectsByOrganization);
router.post('/add/:organization_id', md.addProject, pc.insertProject);
router.post('/join/:organization_id', md.joinProject, pc.joinProject);

router.get('/youtube/:project_id', pc.youtubeLinksByProject);
router.post('/youtube/add', pc.insertYoutubeLink);

module.exports = router;