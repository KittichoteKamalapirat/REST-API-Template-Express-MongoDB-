import { Router } from "express";
import Post from "../models/Post.js";

const router = Router();

//a middleware to get a post
const getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "cannot find the post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.messsage });
  }
  res.post = post;
  next();
};

//get all
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.mesage });
  }
});

//get one
router.get("/:id", getPost, (req, res, next) => {
  //   const { id } = req.params;
  //   res.send(`hello from post no.${id}`);
  res.json(res.post);
});

//create
router.post("/", async (req, res) => {
  try {
    console.log("hi");
    console.log(req.body);
    const { title, body } = req.body;
    console.log();
    const newPost = await Post.create({
      title: title,
      body: body,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//update, use patch to only update the providedfield
router.patch("/:id", getPost, async (req, res, next) => {
  const { title, body } = req.body;
  if (title) {
    res.post.title = title;
  }
  if (body) {
    res.post.body = body;

    try {
      const updatedPost = await res.post.save();
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});
//delete
router.delete("/:id", getPost, async (req, res, next) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted the post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
