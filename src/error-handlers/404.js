'use strict';

module.exports = (err, res) => {
  res.status(404).send({
    error: 404,
    message: `Not Found: ${err.message}`
  })
}