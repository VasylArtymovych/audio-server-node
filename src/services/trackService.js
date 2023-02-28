const { CustomError } = require('../helpers');
const { TrackModel, CommentModel } = require('../models');

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
    if (!track)
      throw new CustomError(`Track with id: ${id} was not found`, 400);

    return track;
  };

  deleteOneById = async (id) => {
    const track = await TrackModel.findById(id);
    if (!track)
      throw new CustomError(`Track with id: ${id} was not found`, 400);

    const deletedTrack = await TrackModel.findByIdAndDelete(id);
    if (!deletedTrack) {
      throw new CustomError(`Unable to delete track.`, 500);
    }

    return deletedTrack;
  };

  addComment = async (data) => {
    const comment = await CommentModel.create({ ...data });
    if (!comment) throw new CustomError(`Unable to create comment.`, 500);

    const track = await TrackModel.updateOne(
      { _id: comment.trackId },
      { $push: { comments: comment._id } }
    );
    if (!track) throw new CustomError(`Unable to add comment list.`, 500);

    return comment;
  };
}

module.exports = new TrackService();
