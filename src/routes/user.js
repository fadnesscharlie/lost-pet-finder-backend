const express = require('express');
const router = express.Router();

const { users } = require('../models/index')

router.post('/user-creation', createUser)

router.get('/user-info', getUserData)

async function getUserData (req, res) {
  try {
    let allUsers = await users.findAll()
    res.status(200).json(allUsers)
  } catch (e) {
    res.status(500).send('Get User Error')
  }
}

async function createUser(req, res) {
  try {
    let userData = req.body
    let postUser = await users.create(userData)
    res.status(200).json(postUser)
  } catch (e) {
    res.status(500).send('Create User Error')
  }
}

module.exports = router
