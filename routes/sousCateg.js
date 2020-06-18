const express = require("express");
const router = express.Router();
const SousCateg = require("../models/sousCateg");

var Request = require("request");

router.get("/", async (req, res) => {
  try {
    const sousCateg = await SousCateg.find();
    res.json(sousCateg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", getSousCateg, (req, res) => {
  res.send(res.nom);
});
router.post("/", async (req, res) => {
  const sousCateg = new SousCateg({
    nom: req.body.nom,
    categorie: req.body.categorie,
    status: req.body.status,
  });
  try {
    let newSousCateg = await sousCateg.save();
    res.status(201).json(newSousCateg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/update/:id", getSousCateg, async (req, res) => {
  try {
    let newSousCateg = await SousCateg.updateOne(
      { _id: res.sousCateg._id },
      {
        nom: req.body.nom,
        categorie: req.body.categorie,
        status: req.body.status,
      }
    );
    res.status(201).json({
      nom: req.body.nom,
      categorie: req.body.categorie,
      status: req.body.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getSousCateg, async (req, res) => {
  try {
    await res.sousCateg.remove();
    res
      .status(200)
      .json({ message: res.sousCateg.nom + " Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function getSousCateg(req, res, next) {
  let sousCateg;
  try {
    sousCateg = await SousCateg.findById(req.params.id);
    if (sousCateg == null)
      return res.status(404).json({ message: "Can't get sousCateg" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.sousCateg = sousCateg;
  next();
}

module.exports = router;
