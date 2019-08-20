const express = require('express');
const router = express.Router();

// project controller
const {
	projectsByOrganization,
	insertProject,
	youtubeLinksByProject,
	insertYoutubeLink,
} = require('./controller');

// project validation
const {
	addProjectForm,
} = require('./validation');


router.get('/:organization_id', projectsByOrganization);
router.post('/add/:organization_id', addProjectForm, insertProject);

router.get('/youtube/:project_id', youtubeLinksByProject);
router.post('/youtube/add', insertYoutubeLink);

module.exports = router;