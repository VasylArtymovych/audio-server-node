const { Schema, model } = require('mongoose');

const albumSchema = new Schema({
  name: { type: String, unique: true, required: [true, 'Name is required'] },

  artist: { type: String, required: [true, 'Artist is required'] },

  picture: { type: String, required: [true, 'Picture is required'] },

  tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
});

module.exports = model('Album', albumSchema);
