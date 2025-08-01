// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  inviteCode: { type: String, required: true },
  resetToken: String,
  resetTokenExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
