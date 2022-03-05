const express = require('express');
const router = express.Router();

const { comments } = require('../models/index') 

router.post('/comment-creation', createComment)

router.get('/comment-info', getCommentData)

async function getCommentData (req, res) {
  let allComments = await comments.findAll()
  console.log('allComments', allComments)
  res.status(200).json(allComments)
}

async function createComment(req, res) {
  let commentData = req.body
  console.log('commentData:', commentData);
  let postComment = await comments.create(commentData)
  res.status(200).json(postComment)
}

module.exports = router
