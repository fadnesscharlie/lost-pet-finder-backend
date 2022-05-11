'use strict';

module.exports = (err, res) => {
  res.status(500).send({
    error: 500,
    message: `Server error: ${err.message}`
  })
}