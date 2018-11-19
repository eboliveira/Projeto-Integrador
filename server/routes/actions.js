const express = require('express')
const dateTime = require('../utils/dateTime')

const router = express.Router()

router.get('/getConflicts/:startDate/:endDate', (req, res) => {
  if (dateTime.checkValid(req.params.startDate,req.params.endDate)) {
    dateTime.getConflicts(req.params.startDate,req.params.endDate, function (err, conflicts) {
      if (err) res.status(500).send(err)
      else res.status(200).send(conflicts)
    })
  } else {
    res.status(400).send('"Invalid reservation interval"')
  }
})

router.get('/checkConflicts/p1/:reservationStart/:reservationEnd/p2/:periodStart/:periodEnd', (req, res) => {
  if (dateTime.checkConflicts(req.params.reservationStart, req.params.reservationEnd, req.params.periodStart, req.params.periodEnd)) {
    res.status(200).send("true")
  } else {
    res.status(200).send("false")
  }
})

module.exports = {
  path: '/actions',
  router: router
}
