const { Router } = require('express');
const { uploadFiles } = require('../middleware');
const { TrackCtrl } = require('../controllers');

const router = Router();

router.post(
  '/add',
  uploadFiles.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
  ]),

  TrackCtrl.createTrack
);

router.get('/', TrackCtrl.getAll);
router.get('/search', TrackCtrl.searchByName);
router.get('/getOne/:id', TrackCtrl.getOneById);

module.exports = router;
