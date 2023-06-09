const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')

router.post('/create/like',likeController.like);
router.delete('/unlike',likeController.unLike);
router.post('/list/liked_users',likeController.likedUser);
router.post('/list/liked_post',likeController.likedPost);


module.exports = router;
