const express = require('express')
const dateTime = require('../actions/dateTime')
const saltRounds = 10

const router = express.Router()

router.get('/:startDate/:endDate', (req, res) => {
  if (dateTime.checkValid(req.params.startDate,req.params.endDate)) {
    dateTime.getConflicts(req.params.startDate,req.params.endDate, function (err, conflicts) {
      if (err) res.status(500).send(err)
      else res.status(200).send(conflicts)
    })
  } else {
    res.status(400).send('"Invalid reservation interval"')
  }
})

module.exports = {
    path: '/actions',
    router: router
}
