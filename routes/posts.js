const express = require('express')
const Posts = require('../schemas/post')
const router = express.Router()

router.post('/posts', async (req, res) => {
    const { user, password, title, content } = req.body
    const createdPosts = await Posts.create({
        user,
        password,
        title,
        content,
    })
    return res.json({
        message: 'success',
    })
})
router.post('/posts', async (req, res) => {
    const { title, user, createdAt } = req.body
    const posts = await Posts.find({}).sort({ createdAt: -1 })
    const data = []
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].title.toLowerCase().includes(title.trim().toLowerCase()) &&
            posts[i].user.toLowerCase().includes(user.trim().toLowerCase()) &&
            posts[i].createdAt.toString().toLowerCase().includes(createdAt.trim().toLowerCase())) {
            data.push({
                postId: posts[i]._id,
                user: posts[i].user,
                title: posts[i].title,
                createdAt: posts[i].createdAt.toString(),
            })
        }
    }
    res.json({
        data: data,
    })
})
router.get('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params
    const post = await Posts.findById(postsId)
    const data = {
        postId: post._id,
        user: post.user,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
    }
    res.json({
        data: data
    })
})
router.post('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params
    const { password, title, content } = req.body
    const post = await Posts.findById(postsId)
    if (post.password === password) {
        await Posts.updateOne(
            { _id: postsId },
            { $set: { title, content } },
        )
        return res.json({
            message: 'success',
        })
    } else {
        res.status(400).json({
            success: false,
            errorMessage: 'password is incorrect',
        })
    }
})
router.delete('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params
    const { password } = req.body
    const post = await Posts.findById(postsId)
    if (post.password === password) {
        await Posts.deleteOne({ _id: postsId })
        return res.json({
            message: 'success',
        })
    } else {
        res.status(400).json({
            success: false,
            errorMessage: 'password is incorrect',
        })
    }
})
module.exports = router