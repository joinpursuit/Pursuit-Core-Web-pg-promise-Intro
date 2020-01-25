var express = require('express');
var router = express.Router();

const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'facebook_db',
}
const db = pgp(connection);

router.get('/all', async(req, res, next) => {
  try {
    let posts =await db.any("SELECT * FROM posts")
    res.status(200).json({
        posts,
        status:"success",
        message:"all the posts"
    })
} catch (error) {
    next(error)
}

  // res.send('Sending all posts!');
});

router.get('/:user_id', async(req, res) => {
  try {
    let postsByUser =await db.any("SELECT * FROM posts WHERE poster_id = $1",[req.params.user_id])
    res.status(200).json({
        postsByUser,
        status:"success",
        message:"all the posts"
    })
} catch (error) {
    next(error)
}
  // res.send('Sending all post from this user!');
});

router.post('/register', (req, res) => {
  res.send('Creating new post!');
});

module.exports = router;
