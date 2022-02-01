import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "cannot find the user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.messsage });
  }
  res.user = user;
  next();
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
//get all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get one
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//

//login

//create (register)
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await hashPassword(password);

    const newUser = await User.create({
      username,
      password: hash,
    });

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//update
router.patch("/:id", getUser, async (req, res) => {
  const { username, password } = req.body;
  if (username) res.user.username = username;

  if (password) res.user.password = await hashPassword(password);
  try {
    const updatedUser = await res.user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//delete
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "The user has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
