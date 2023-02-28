const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');
const { CustomError } = require('../helpers');
const { config } = require('../config');
const { TrackService } = require('../services');

class TrackController {
  // Create track:
  createTrack = asyncHandler(async (req, res) => {
    if (!req.files) throw new CustomError('Missing required files.', 400);
    const { picture, audio } = req.files;
    const audioData = audio[0];
    const pictureData = picture[0];

    const uploadAudio = await config.cloudUploads(
      audioData.path,
      'audio',
      audioData.originalname
    );
    const uploadPicture = await config.cloudUploads(
      pictureData.path,
      'musicImages',
      pictureData.originalname
    );
    fs.unlink(audioData.path);
    fs.unlink(pictureData.path);

    const track = await TrackService.createTrack(
      req.body,
      uploadAudio.url,
      uploadPicture.url
    );

    res.status(201).json({ status: 'Ok', track });
  });
  // Get all tracks:
  getAll = asyncHandler(async (req, res) => {
    let { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : limit;

    const tracks = await TrackService.getAll(skip, limit);

    res.status(200).json({ status: 'Ok', tracks, page, limit });
  });

  // Get tracks by name:
  searchByName = asyncHandler(async (req, res) => {
    let { query = '', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : limit;

    const tracks = await TrackService.searchByName(query, skip, limit);

    res.status(200).json({ status: 'Ok', tracks, page, limit });
  });

  // Get one by id:
  getOneById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const track = await (
      await TrackService.getOneById(id)
    ).populate('comments');

    res.status(200).json({ status: 'Ok', track });
  });

  // Update one by id:
  // updateOneById = asyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const track = await TrackService.updateOneById(id, req.body);

  //   res.status(200).json({ status: 'Success', track });
  // });

  // Delete one by id:
  deleteOneById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const deletedTrack = await TrackService.deleteOneById(id);

    res.status(200).json({ status: 'Success', id: deletedTrack._id });
  });
  // Add comment:
  addComment = asyncHandler(async (req, res) => {
    const comment = await TrackService.addComment(req.body);
    res.status(200).json({ status: 'Success', comment });
  });
}

module.exports = new TrackController();
