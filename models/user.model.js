const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String },
  password: { type: String },
  username: { type: String },
  bio: String,
  avatarUrl: String,
  website: String,
  location: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  savedPins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pin' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Encrypt the Password before Updating
userSchema.pre('findOneAndUpdate', async function (next) {
  const updatedInfo = this.getUpdate();
  if (updatedInfo.password) {
    updatedInfo.password = await bcrypt.hash(updatedInfo.password, 10);
  }
  next();
});

// Check if the password is correct
userSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

module.exports = mongoose.model('User', userSchema);