const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profession: { type: String },
  companyName: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  subscription: { type: String },
  newsletter: { type: Boolean },
  image: { type: String }, // store image URL
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
