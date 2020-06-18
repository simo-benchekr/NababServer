const express = require("express");
const router = express.Router();
const User = require("../models/user");

var Request = require("request");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", getUser, (req, res) => {
  res.send(res.photo);
});
router.post("/", async (req, res) => {
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    tel: req.body.tel,
    adr: req.body.adr,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    photo: req.body.photo,
    status: req.body.status,
    dateIns: req.body.dateIns,
  });
  try {
    let newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/update/:id", getUser, async (req, res) => {
  // user = new User();
  try {
    let newUser = await User.updateOne(
      { _id: res.user._id },
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        sexe: req.body.sexe,
        tel: req.body.tel,
        adr: req.body.adr,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        photo: req.body.photo,
        status: req.body.status,
        dateIns: req.body.dateIns,
      }
    );
    res.status(201).json({
      nom: req.body.nom,
      prenom: req.body.prenom,
      sexe: req.body.sexe,
      tel: req.body.tel,
      adr: req.body.adr,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      photo: req.body.photo,
      status: req.body.status,
      dateIns: req.body.dateIns,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).json({ message: res.user.nom + " Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/check", function (req, res) {
  var password = req.body.password;
  var email = req.body.email;
  var data;
  if (email.length > 0 && password.length > 0) {
    data = {
      email: email,
      password: password,
    };
  } else {
    res.json({
      status: 0,
      message: err,
    });
  }
  User.findOne(data, function (err, user) {
    console.log(user);
    if (err) {
      res.json({
        status: 500,
        message: err,
      });
    } else if (!user) {
      res.json({
        status: 500,
        message: "not found",
      });
    } else {
      user.photo = "";
      res.json({
        status: 201,
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        sexe: user.sexe,
        tel: user.tel,
        adr: user.adr,
        email: user.email,
        password: user.password,
        role: user.role,
        photo: user.photo,
        status: user.status,
        dateIns: user.dateIns,
        message: " success",
      });
    }
  });
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "Can't get user" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
