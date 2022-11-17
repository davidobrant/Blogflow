const { db } = require('../database')

const blogController = {};

blogController.getBlogs = async (req, res) => {
    try {
        const blogs = await db.getBlogs()
        return res.status(200).json(blogs)
    }
    catch (err) {
        return res.sendStatus(400)
    }
}

blogController.getBlogsByUserId = async (req, res) => {
    try {
        const userId = Number(req.params.userId)
        const blogs = await db.getBlogsByUserId(userId)
        res.status(200).json(blogs)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.getBlogsByUser = async (req, res) => {
    try {
        const userId = Number(req.params.userId)
        const authId = req.userId
        if(userId === authId) {
            const blogs = await db.getBlogsByUserId(userId)
            res.status(200).json(blogs)
        } else {
            const blogs = await db.getBlogsByUserIdPrivate(userId)
            res.status(200).json(blogs)
        }
        
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await db.getBlogById(id)
        res.status(200).json(blog)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.createBlog = async (req, res) => {
    try {
        let { title, body, privacy } = req.body
        const userId = req.userId
        if(privacy) {
            privacy = 1
        } else {
            privacy = 0
        }
        const author = await db.getUsernameByUserId(userId)
        const createdAt = Date.now()
        const blogId = await db.createBlog(title, body, userId, author, createdAt, privacy)
        const blog = await db.getBlogById(blogId)
        res.status(200).json(blog)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.updateBlog = async (req, res) => {
    try {
        const { title, body } = req.body
        const userId = req.userId
        // const blog = await db.updateBlog(title, body, userId)
        console.log(userId, title)
        res.status(200).json(title)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.togglePrivacy = async (req, res) => {
    try {
        const { blogId } = req.body
        const authId = req.userId
        const userId = await db.getAuthorByBlogId(blogId)
        if(userId !== authId) return res.status(401).json({ message: "Denied"})
        let { privacy } = await db.getPrivacyByBlogId(blogId)
        if(privacy === 1) {
            privacy = 0
        } else {
            privacy = 1
        }
        const changedPrivacy = await db.setPrivacy(privacy, blogId)
        res.status(200).json({ message: "Privacy changed"})
    }
    catch (err) {
        res.sendStatus(400)
    }
}

blogController.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        await db.deleteBlog(id)
        res.status(200).json(id)
    }
    catch (err) {
        res.sendStatus(400)
    }
}

module.exports = blogController