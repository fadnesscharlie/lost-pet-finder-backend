const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { users } = require('../models/index');

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

router.post('/user-creation', createUser);

router.get('/user-info', getUserData);

router.put('/user-update/:id', updateUser);

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

async function getUserData(req, res) {
	try {
		let allUsers = await users.findAll();
		res.status(200).json(allUsers);
	} catch (e) {
		res.status(404).send('Get User Error');
	}
}

async function createUser(req, res) {
	try {
		let userData = req.body;
		let currentUsers = await users.findAll();
		if (currentUsers.length) {
			currentUsers.forEach(async user => {
				if (userData.email === user.dataValues.email) {
					res.status(200).send('Prior user');
				} else {
					let postUser = await users.create(userData);
					res.status(201).send(postUser);
				}
			})
		} else {
			let postUser = await users.create(userData);
			res.status(201).send(postUser);
		}
	} catch (e) {
		console.log(e);
		res.status(500).send('Error', e);
	}
}

async function updateUser(req, res) {
	try {
		let id = req.params.id;
		const findUser = await users.findOne({ where: { userID: id } });
    
		let updatedUser = await findUser.update(req.body);

		res.status(200).json(updatedUser);
	} catch (e) {
		res.status(404).send('Update User Error', e);
	}

}

module.exports = router;
