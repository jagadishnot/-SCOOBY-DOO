const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  email: { type: String, required: true },
  phone: String,
  dob: Date,
  gender: String,
  address: String,
  skills: [String],
  bio: String,
  image: String,
  joined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);
