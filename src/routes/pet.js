const express = require('express');
const router = express.Router();

const { pets } = require('../models/index')

router.post('/pet-creation', createPet)

router.get('/pet-info', getPetData)

router.put('/pet-update', updatePet)

async function getPetData(req, res) {
  try {
    let allPets = await pets.findAll()
    console.log('allPets', allPets)
    res.status(200).json(allPets)
  } catch (e) {
    res.status(500).send('Get Pet Error')
  }
}

async function createPet(req, res) {
  try {
    let petData = req.body
    let postPet = await pets.create(petData)
    res.status(200).json(postPet)
  } catch (e) {
    res.status(500).send('Create Pet Error')
  }
}

async function updatePet(req, res) {
  try {
    let id = req.params.id
    let {
      petName, description, age, breed, medicalCondition, trackerChip, reward
    } = req.body
    const updatedPet = await pets.findByIdAndUpdate(
      id, {
        petName, description, age, breed, medicalCondition, trackerChip, reward
      }, { new: true, overwrite: true}
    )
    res.status(200).send(updatedPet)
  } catch (e) {
    res.status(500).send('Update Error')
  }
}

module.exports = router
