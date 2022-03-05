const express = require('express');
const router = express.Router();

const { users } = require('../models/index')

router.post('/user-creation', createUser)

router.get('/user-info', getUserData)

async function getUserData (req, res) {
  let allUsers = await users.findAll()
  res.status(200).json(allUsers)
}

async function createUser(req, res) {
  let userData = req.body
  let postUser = await users.create(userData)
  res.status(200).json(postUser)
}

module.exports = router
