const express = require('express');
const router = express.Router();

const { comments } = require('../models/index') 

router.post('/comment-creation', createComment)

router.get('/comment-info', getCommentData)

async function getCommentData (req, res) {
  try {
    let allComments = await comments.findAll()
    // console.log('allComments', allComments)
    res.status(200).json(allComments)
  } catch (e) {
    res.status(500).send('Get Comment Error')
  }
}

async function createComment(req, res, next) {
  try {
    let commentData = req.body
    // console.log('commentData:', commentData);
    let postComment = await comments.create(commentData)
    res.status(200).json(postComment)
  } catch (e) {
    res.status(500).send('Create Comment Error')
  }
}

module.exports = router
