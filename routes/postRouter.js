const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)

router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)
    .get(auth, postCtrl.getPost)
    .delete(auth, postCtrl.deletePost)

router.patch('/post/:id/like', auth, postCtrl.likePost)
router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)
router.get('/user_posts/:id', auth, postCtrl.getUserPosts)
router.get('/post_discover', auth, postCtrl.getPostsDiscover)
router.patch('/savedPost/:id', auth, postCtrl.savedPost)
router.patch('/unSavedPost/:id', auth, postCtrl.unSavedPost)
router.get('/getSavedPosts', auth, postCtrl.getSavedPosts)

module.exports = router