const express = require('express');
const router = express.Router();

const { markers } = require('../models/index')

router.post('/markers', createMarkers)
router.get('/markers', getMarkers)
router.delete('/markers/:id', deleteMarkers)

async function createMarkers(req, res) {
  try {
    let markerData = req.body
    let postMarker = await markers.create(markerData)
    res.status(200).json(postMarker)
  } catch (e) {
    res.status(500).send('Create Marker Error')
  }
}

async function getMarkers(req, res) {
  try {
    let allMarkers = await markers.findAll()
    res.status(200).json(allMarkers)
  } catch (e) {
    res.status(500).send('Get Marker Error')
  }
}

async function deleteMarkers(req, res) {
  try {
    let id = req.params.id;
    await markers.destroy({ where: { id } });
    res.status(200).send('Marker Deleted');
  } catch (e) {
    console.log(e)
    res.status(500).send('Err Deleting Marker')
  }
}

module.exports = router
