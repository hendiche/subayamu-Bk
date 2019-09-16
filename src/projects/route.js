const express = require('express');
const router = express.Router();

// project controller
// pc equals to projectController
const pc = require('./controller');

// project validation
// mw equals to middleware
const mw = require('./validation');


router.get('/:organization_id', pc.projectsByOrganization);
router.post('/add/:organization_id', mw.addProject, pc.insertProject);
router.post('/join/:organization_id', mw.joinProject, pc.joinProject);

router.get('/docs/:project_id', mw.requireProjectId, pc.docsByProject);
router.post('/docs/add', mw.addDocument, pc.insertDocument);
router.put('/docs/:document_id', pc.updateDocument);
router.delete('/docs/:document_id', mw.requireDocumentId, pc.deleteDocument);

router.get('/slide/:project_id', mw.requireProjectId, pc.slideByProject);
router.post('/slide/add', mw.addSlide, pc.insertSlide);
router.delete('/slide/:slide_id', mw.requireSlideId, pc.deleteSlide);

router.get('/youtube/:project_id', mw.requireProjectId, pc.youtubeLinksByProject);
router.post('/youtube/add', mw.addYoutubeLink, pc.insertYoutubeLink);
router.delete('/youtube/:youtube_id', mw.requireYoutubeId, pc.deleteYoutubeLink);


module.exports = router;