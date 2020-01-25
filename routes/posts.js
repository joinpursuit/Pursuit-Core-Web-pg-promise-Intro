var express = require('express');
var router = express.Router();
const {getAllPosts, getUserPosts, registerPosts} = require("../queries/posts")

router.get('/all', getAllPosts, (req, res)=>{
  res.send("Sending all post from this user!")
});

router.get('/:user_id', getUserPosts);

router.post('/register', registerPosts, (req, res) => {
  res.send('Creating new post!');
});

module.exports = router;
