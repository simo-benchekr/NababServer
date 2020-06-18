const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  adr: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  dateIns: {
    type: String,
    required:true
  }
});
module.exports = mongoose.model("user", userSchema);
