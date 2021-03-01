const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route GET api/users/
// @desc Get All Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ role: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/users/
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { email, password, role } = req.body;

  // Simple validation
  if (!email || !password || !role) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User alredy exist" });

    const newUser = new User({
      email,
      password,
      role,
    });

    newUser.save().then((user) => {
      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    });
    // Create salt $ hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route POST api/users/cambiarrol
// @desc Cambiar Rol Usuario
// @access Public
router.post("/cambiarrol", (req, res) => {
  const { _id, rol } = req.body;

  // Simple validation
  User.findOne({ _id }).exec((err, user) => {
    if (err) console.log("Cambiar Rol  ", err);

    user.role = rol;
    user.save();
    res.json(user);
  });
});

// @route DELETE api/users/:id
// @desc Delte A User
// @access Private
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;
