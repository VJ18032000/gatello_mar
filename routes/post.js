const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const upload = require('../middleware/postUpload')

router.post('/create/post/',upload.array('posts',20),postController.createPost)
router.delete('/delete/post',postController.deletePost)
router.post('/edit/post',postController.editPost)
router.post('/details/post/',postController.details)
router.post('/list/myfeeds',postController.listMyfeed)
router.post('/list/home_feeds',postController.listHomefeed)

module.exports = router;
