const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  // tagId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String }, // Name of the tag (e.g., "Nature", "Photography")
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pin' }], // References to pins associated with this tag
});

module.exports = mongoose.model('tag', tagSchema);
