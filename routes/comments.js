const express = require('express')
const Posts = require('../schemas/post')
const Comments = require('../schemas/comment')
const router = express.Router()

router.post('/comments/:postId', async (req, res) => {
    const { content } = req.body
    const comments = await Comments.find({}).sort({ createdAt: -1 })
    const data = []
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].content.toLowerCase().includes(content.trim().toLowerCase())) {
            data.push({
                commentId: comments[i]._id,
                user: comments[i].user,
                content: comments[i].content,
                createdAt: comments[i].createdAt,
            })
        }
    }
    res.json({
        data: data,
    })
})
router.post('/comments/:postId/create', async (req, res) => {
    const { postId } = req.params
    const { user, password, content } = req.body
    if (content.length>0) {
        await Comments.create({
            postId,
            user,
            password,
            content,
        })
        return res.json({
            message: 'success',
        })    
    } else {
        return res.json({
            message: 'Please enter the comment content',
        })
    }
})
router.delete('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params
    const { password } = req.body
    const comment = await Comments.findById(commentId)
    if (comment.password === password) {
        await Comments.deleteOne({ _id: commentId })
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
router.put('/comments/:commentId', async (req, res) => {
    const { commentId } = req.params
    const { password, content } = req.body
    const comment = await Comments.findById(commentId)
    if (comment.password === password) {
        await Comments.updateOne(
            { _id: commentId },
            { $set: { content } },
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
module.exports = router