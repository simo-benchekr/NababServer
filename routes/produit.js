const express = require("express");
const router = express.Router();
const Produit = require("../models/produit");

var Request = require("request");

router.get("/", async (req, res) => {
  try {
    const produit = await Produit.find();
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", getProduit, (req, res) => {
  res.send(res.nom);
});
router.post("/", async (req, res) => {
  const produit = new Produit({
    nom: req.body.nom,
    prix: req.body.prix,
    categorie: req.body.categorie,
    sousCateg: req.body.sousCateg,
    status: req.body.status,
  });
  try {
    let newProduit = await produit.save();
    res.status(201).json(newProduit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/update/:id", getProduit, async (req, res) => {
  try {
    let newProduit = await Produit.updateOne(
      { _id: res.produit._id },
      {
        nom: req.body.nom,
        prix: req.body.prix,
        categorie: req.body.categorie,
        sousCateg: req.body.sousCateg,
        status: req.body.status,
      }
    );
    res.status(201).json({
      nom: req.body.nom,
      prix: req.body.prix,
      categorie: req.body.categorie,
      sousCateg: req.body.sousCateg,
      status: req.body.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getProduit, async (req, res) => {
  try {
    await res.produit.remove();
    res
      .status(200)
      .json({ message: res.produit.nom + " Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function getProduit(req, res, next) {
  let produit;
  try {
    produit = await Produit.findById(req.params.id);
    if (produit == null)
      return res.status(404).json({ message: "Can't get produit" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.produit = produit;
  next();
}

module.exports = router;
