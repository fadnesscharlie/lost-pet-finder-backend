const express = require('express');
const router = express.Router();

const { pets } = require('../models/index')

router.post('/pet-creation', createPet)

router.get('/pet-info', getPetData)

async function getPetData(req, res) {
  let allPets = await pets.findAll()
  console.log('allPets', allPets)
  res.status(200).json(allPets)
}

async function createPet(req, res) {
  let petData = req.body
  let postPet = await pets.create(petData)
  res.status(200).json(postPet)
}

module.exports = router
