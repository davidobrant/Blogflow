const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blogController.js')
const { auth, authEditorOrUser, authAdmin } = require('../middleware/auth')


router.get('/blogs', auth, blogController.getBlogs)

router.get('/blogs/:userId', auth, blogController.getBlogsByUser)

router.post('/blog', auth, blogController.createBlog)

router.get('/blog/:id', auth, blogController.getBlogById)

router.patch('/blog/:id', auth, blogController.updateBlog)

router.patch('/blog/privacy/:blogId', auth, blogController.togglePrivacy)

router.delete('/blog/:id', authEditorOrUser, blogController.deleteBlog)


module.exports = router