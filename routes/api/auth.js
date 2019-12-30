const router = require("express").Router();
const User = require("../../models/User");
const { registerValidation, loginValidation } = require("../../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifytoken = require("./verifytoken");

// POST - Register new user
// api/user/register
router.post("/register", async (req, res) => {
  //Validation the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  //Save the user in the DB
  try {
    const savedUser = await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(401).send(err);
  }
});

// POST - Login
// api/user/login
router.post("/login", async (req, res) => {
  //Validation the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email in not exists");

  //Check if the password match
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) return res.status(401).send("Password is worng");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

router.get("/", verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
