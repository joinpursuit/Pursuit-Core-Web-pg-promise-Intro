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
      let likes =await db.any("SELECT * FROM likes")
      res.status(200).json({
          likes,
          status:"success",
          message:"all the likes for posts"
      })
  } catch (error) {
      next(error)
  }
})

router.get('/post/:post_id', async(req, res, next) => {
    try {
      let postByLike =await db.any("SELECT * FROM likes WHERE post_id = $1",req.params.post_id)
      res.status(200).json({
          postByLike,
          status:"success",
          message:"all the likes"
      })
  } catch (error) {
      next(error)
  }
})







module.exports = router
