const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  imageUrl: String // Added imageUrl field
});

module.exports = mongoose.model('User', userSchema);
