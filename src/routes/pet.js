const express = require('express');
const router = express.Router();

const { pets } = require('../models/index');

router.post('/pet-creation', createPet);

router.get('/pet-info', getPetData);

router.put('/pet-update/:id', updatePet);

router.put('/pet-toLost/:id', postToLostPet);

async function getPetData(req, res) {
	try {
		let allPets = await pets.findAll();
		// console.log('allPets', allPets)
		res.status(200).json(allPets);
	} catch (e) {
		res.status(500).send('Get Pet Error');
	}
}

async function createPet(req, res) {
	try {
		let petData = req.body;
		let postPet = await pets.create(petData);
		res.status(200).json(postPet);
	} catch (e) {
		res.status(500).send('Create Pet Error');
	}
}

async function updatePet(req, res) {
	try {
		let id = req.params.id;
		console.log('id in updated pets route:', id);
		let {
			petName,
			description,
			age,
			breed,
			medicalCondition,
			trackerChip,
			reward,
		} = req.body;
		console.log('req.body in updated pets route:', req.body);
		const updatedPet = await pets.findByIdAndUpdate(
			id,
			{
				petName,
				description,
				age,
				breed,
				medicalCondition,
				trackerChip,
				reward,
			},
			{ new: true, overwrite: true }
		);
		console.log('updatedPet in update:', updatedPet);
		res.status(200).json(updatedPet);
	} catch (e) {
		res.status(500).send('Update Error');
	}
}

async function postToLostPet(req, res) {
	try {
		let id = req.params.id;
		const findPet = await pets.findOne({ where: { petID: id } });
		let updatedPet = await findPet.update(req.body[0]);

		res.status(200).json(updatedPet);
	} catch (e) {
		res.status(500).send('Post to lost pets Error', e);
	}
}

module.exports = router;
