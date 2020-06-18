const mongoose = require("mongoose");
const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  sousCateg: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("produit", produitSchema);
