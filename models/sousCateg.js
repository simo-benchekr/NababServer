const mongoose = require("mongoose");

const sousCategSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("sousCateg", sousCategSchema);
