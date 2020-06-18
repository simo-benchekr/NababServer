const express = require("express");
const router = express.Router();
const Categorie = require("../models/categorie");

var Request = require("request");

router.get("/", async (req, res) => {
  try {
    const categorie = await Categorie.find();
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", getCategorie, (req, res) => {
  res.send(res.nom);
});
router.post("/", async (req, res) => {
  const categorie = new Categorie({
    nom: req.body.nom,
    photo: req.body.photo,
    status: req.body.status,
  });
  try {
    let newCategorie = await categorie.save();
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/update/:id", getCategorie, async (req, res) => {
  try {
    let newCategorie = await Categorie.updateOne(
      { _id: res.categorie._id },
      {
        nom: req.body.nom,
        photo: req.body.photo,
        status: req.body.status,
      }
    );
    res.status(201).json({
      nom: req.body.nom,
      photo: req.body.photo,
      status: req.body.status,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getCategorie, async (req, res) => {
  try {
    await res.categorie.remove();
    res
      .status(200)
      .json({ message: res.categorie.nom + " Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
async function getCategorie(req, res, next) {
  let categorie;
  try {
    categorie = await Categorie.findById(req.params.id);
    if (categorie == null)
      return res.status(404).json({ message: "Can't get categorie" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.categorie = categorie;
  next();
}

module.exports = router;
