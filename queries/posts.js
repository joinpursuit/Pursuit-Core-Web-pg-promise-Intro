const db = require("../db/index.js");

const getallposts = async (req, res, next) => {
  try {
    let posts = await db.any("SELECT * FROM posts");
    res.status(200).json({
      posts,
      status: "success",
      message: "all posts"
    });
  } catch (err) {
    next(err);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    let post = await db.any("SELECT * FROM posts WHERE poster_id = $1", [
      req.params.user_id
    ]);
    res.status(200).json({
      post,
      status: "success",
      message: "all posts"
    });
  } catch (err) {
    next(err);
  }
};

const registerPost = async (req, res, next) => {
  try {
    let newPost = await db.any(
      "INSERT INTO posts (poster_id, body) VALUES (${poster_id},${body}) RETURNING *",
      req.body
    );
    res.status(200).json({
      newPost,
      status: "success",
      message: "all posts"
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { getallposts, getUserPosts, registerPost };
