const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  username: { type: String, required: [true, 'Useername is required'] },

  text: String,

  trackId: { type: Schema.Types.ObjectId },
});

module.exports = nodel('Comment', commentSchema);
