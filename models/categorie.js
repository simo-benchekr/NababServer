const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("categorie", categorieSchema);
