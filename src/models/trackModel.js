const { Schema, model } = require('mongoose');

const trackSchema = new Schema(
  {
    name: { type: String, required: true },

    artist: { type: String, required: true },

    text: String,

    trackListeners: Number,

    picture: { type: String, required: true },

    audio: { type: String, required: true },

    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { versionKey: false }
);

module.exports = model('Track', trackSchema);
