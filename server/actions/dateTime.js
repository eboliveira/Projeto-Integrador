const express = require('express')
const mongoose = require('mongoose');
const EventCalendar = require('../models/events')
const moment = require('moment');

function checkValid(reservationStart, reservationEnd) {
  var reservation_start = moment(new Date(reservationStart))
  var reservation_end = moment(new Date(reservationEnd))

  if (reservation_start.isSameOrAfter(reservation_end)) {
    return false // Invalid interval
  }

  return true
}

function checkConflicts(reservationStart, reservationEnd, periodStart, periodEnd) {
  var reservation_start = moment(new Date(reservationStart))
  var reservation_end = moment(new Date(reservationEnd))
  var checkingStart = moment(new Date(periodStart))
  var checkingEnd = moment(new Date(periodEnd))

  if (checkingStart.isBetween(reservation_start, reservation_end) || checkingEnd.isBetween(reservation_start, reservation_end)) {
    return 1 // There is a reservation whose start and / or end is within the selected period.
  }

  if (reservation_start.isBetween(checkingStart, checkingEnd) || reservation_end.isBetween(checkingStart, checkingEnd)) {
    return 2 // The start and / or end is within the period of an existing reservation.
  }

  if (reservation_start.isSame(checkingStart) || reservation_end.isSame(checkingEnd)) {
    return 3
  }

  return 0
}

function getConflicts(reservationStart, reservationEnd, callback) {
  let conflicts = []
  EventCalendar.getEventsAtInterval(req.params.startDate, req.params.finalDate, function (err, evnt){
    if(err){
      console.log(err)
      callback('Error retrieving data from database', null)
    }
    else{
      for (var i = 0; i < evnt.length; i++) {
        if (checkConflicts(reservationStart, reservationEnd, evnt[i].startDate, evnt[i].finalDate)) {
          conflicts.push(evnt[i])
        }
      }
      callback(null, conflicts)
    }
  })
}

module.exports = {checkValid, getConflicts}
