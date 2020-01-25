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

router.get('/:user_id', async(req, res, next) => {
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

router.post('/register', async(req, res, next) => {
  // res.send('Creating new post!');
  try {
    let post =await db.one("INSERT INTO posts (poster_id, body) VALUES($1,$2) RETURNING *", [req.body.poster_id,req.body.bodyText])
    res.status(200).json({
        post,
        status:"success",
        message:"create the new post"
    })
} catch (error) {
    next(error)
}
});

module.exports = router;
