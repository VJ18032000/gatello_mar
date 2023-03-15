const express = require('express')
const router = express.Router()
const followController = require('../controllers/followController')

router.post('/follow/user',followController.followUser);
router.post('/unfollow/user',followController.unfollowUser);
router.post('/list/followings',followController.followingList);
router.post('/list/followers',followController.followerList);
router.post('/follow/check',followController.checkList);



module.exports = router;
