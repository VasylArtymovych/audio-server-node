const { CustomError } = require('../helpers');
const { TrackModel } = require('../models');

class TrackService {
  createTrack = async (body, audioUrl, pictureUrl) => {
    const track = await TrackModel.findOne({
      name: body.name,
      artist: body.artist,
    });
    if (track) throw new CustomError('Track already exist.', 400);

    const newTrack = await TrackModel.create({
      ...body,
      audio: audioUrl,
      picture: pictureUrl,
    });
    if (!newTrack) throw new CustomError('Unable add track.', 400);

    return newTrack;
  };

  getAll = async (skip, limit) => {
    const tracks = await TrackModel.find({}).skip(skip).limit(limit);
    if (!tracks) throw new CustomError('Unable to get tracks.', 500);

    return tracks;
  };

  searchByName = async (query, skip, limit) => {
    const tracks = await TrackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    })
      .skip(skip)
      .limit(limit);
    if (!tracks) throw new CustomError('Unable to get tracks.', 500);

    return tracks;
  };

  getOneById = async (id) => {
    const track = await TrackModel.findById(id);
    if (!track) throw new CustomError(`Track with id: ${id} is not found`, 400);

    return track;
  };
}

module.exports = new TrackService();
