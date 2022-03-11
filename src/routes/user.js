const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { users } = require('../models/index')

// all of this came from jsonwebtoken docs
// ---------------------------------------
// var jwksClient = require('jwks-rsa');
// const { response } = require('express');
// const bearer = require('../auth/middleware/bearer');
// var client = jwksClient({
//   // EXCEPTION!  jwksUri comes from your single page application -> settings -> advanced settings -> endpoint -> the jwks one
//   jwksUri: 'https://dev-h-7-74qs.us.auth0.com/.well-known/jwks.json'
// });

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }
// ---------------------------------------

router.post('/user-creation', createUser)

router.get('/user-info', getUserData)

// router.get('landing', sendUserData)

// function sendUserData (req, res) {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, getKey, {}, function (err, user) {
//       if (err) {
//         res.status(500).send('invlaid token');
//       }
//       res.send(user);
//     });
//   } catch (err) {
//     res.status(500).send('Auth0 Error')
//   }
// }

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
    // console.log('User Data', userData)
    let postUser = await users.create(userData)
    // console.log('User Dataed', postUser)
    res.status(201).send(postUser)
  } catch (e) {
    res.status(500);
  }
}

module.exports = router
