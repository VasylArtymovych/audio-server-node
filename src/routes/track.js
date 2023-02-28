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
router.post('/comment', TrackCtrl.addComment);

router.get('/', TrackCtrl.getAll);
router.get('/search', TrackCtrl.searchByName);
router.get('/getOne/:id', TrackCtrl.getOneById);
// router.patch('/update/:id', TrackCtrl.updateOneById);
router.delete('/delete/:id', TrackCtrl.deleteOneById);

module.exports = router;
