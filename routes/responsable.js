const express = require("express");
const router = express.Router();
const Responsable = require("../models/responsable");
const Utilisateur = require("../models/utilisateur");
var Request = require("request");

router.get("/", async (req, res) => {
  try {
    await Responsable.find().then(async (responsable) => {
      let data = [];
      for (let i = 0; i < responsable.length; i++) {
        await Utilisateur.findById(responsable[i].utilisateur).then((user) => {
          data.push({
            id: responsable[i]._id,
            utilisateur: responsable[i].utilisateur,
            code: responsable[i].code,
            nom: user.nom,
            prenom: user.prenom,
            sexe: user.sexe,
            tel: user.tel,
            adr: user.adr,
            username: user.username,
            password: user.password,
            role: "Responsable",
          });
          if (i + 1 == responsable.length) res.json(data);
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, result) => {
  const utilisateur = new Utilisateur({
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    tel: req.body.tel,
    adr: req.body.adr,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    let newUtilisateur = await utilisateur.save();
    const responsable = new Responsable({
      utilisateur: newUtilisateur._id,
      code: req.body.code,
    });
    let newResponsable = await responsable.save();
    result.status(201).json(newUtilisateur+newResponsable);
  } catch (error) {
    result.status(400).json({ message: error.message });
  }
});
router.get("/:id", getResponsable, (req, res) => {
  res.send(res.responsable.country);
});
router.delete("/:id", getResponsable, async (req, res) => {
  try {
    Request.delete(
      "http://localhost:3000/utilisateur/" + res.responsable.utilisateur
    );
    await res.responsable.remove();
    res
      .status(200)
      .json({ message: res.responsable.nom + " Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/update/:id", getResponsable, async (req, res) => {
  try {
    await Utilisateur.updateOne(
      { _id: res.responsable.utilisateur },
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        sexe: req.body.sexe,
        tel: req.body.tel,
        adr: req.body.adr,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      }
    );
    await Responsable.updateOne(
      { _id: res.responsable._id },
      {
        code: req.body.code
      }
    );

    res.status(201).json({
      nom: req.body.nom,
      prenom: req.body.prenom,
      sexe: req.body.sexe,
      tel: req.body.tel,
      adr: req.body.adr,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      code: req.body.code,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
async function getResponsable(req, res, next) {
  let responsable;
  try {
    responsable = await Responsable.findById(req.params.id);
    if (responsable == null)
      return res.status(404).json({ message: "Can't get responsable" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.responsable = responsable;
  next();
}
module.exports = router;
