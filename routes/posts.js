var express = require('express');
var router = express.Router();
const db = require("../db/index");


const getAllPosts = async (req, res, next) => {
  try {
    let users = await db.any("SELECT * FROM posts");
    res.status(200).json({
      users,
      status: "Success!",
      message: "Retrieved ALL posts"
    })
  } catch (err) {
    next(err);
  }
}

const getUserPosts = async (req, res, next) => {
  try {
    let user = req.params.user_id;
    let userPosts = await db.any("SELECT * FROM posts WHERE id = $1", user);
    res.status(200).json({
      userPosts,
      status: "Success!",
      message: `Retrieved ALL POSTS from ${user}!`
    })
  } catch (err) {
    next(err);
  }
}

const createNewPost = async (req, res, next) => {
  try {
    await db.none("INSERT INTO posts (poster_id, body) VALUES (${poster_id}, ${body})", req.body);
    res.status(200).json({
      status: "Success!",
      message: "Created NEW post!"
    })
  } catch (err) {
    next(err);
  }
}

router.get('/all', getAllPosts);

router.get('/:user_id', getUserPosts);

router.post('/register', createNewPost);

module.exports = router;
