var express = require("express");
var router = express.Router();
const { getallposts, getUserPosts, registerPost } = require("../queries/posts");

router.get("/all", getallposts, (req, res) => {
  res.send("Sending all post from this user!");
});

router.get("/:user_id", getUserPosts, (req, res) => {
  res.send("Sending all post from this user!");
});

router.post("/register", registerPost, (req, res) => {
  res.send("Creating new post!");
});

module.exports = router;
