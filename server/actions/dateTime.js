const express = require('express')
const mongoose = require('mongoose');
const EventCalendar = require('../models/events')
const moment = require('moment');

const classSchedules = {
  M1: {
    start: '07:30:00.000Z',
    end: '08:20:00.000Z'
  },
  M2: {
    start: '08:20:00.000Z',
    end: '09:10:00.000Z'
  },
  M3: {
    start: '09:10:00.000Z',
    end: '10:00:00.000Z'
  },
  M4: {
    start: '10:20:00.000Z',
    end: '11:10:00.000Z'
  },
  M5: {
    start: '11:10:00.000Z',
    end: '12:00:00.000Z'
  },
  M6: {
    start: '12:00:00.000Z',
    end: '12:50:00.000Z'
  },
  T1: {
    start: '13:00:00.000Z',
    end: '13:50:00.000Z'
  },
  T2: {
    start: '13:50:00.000Z',
    end: '14:40:00.000Z'
  },
  T3: {
    start: '14:40:00.000Z',
    end: '15:30:00.000Z'
  },
  T4: {
    start: '15:50:00.000Z',
    end: '16:40:00.000Z'
  },
  T5: {
    start: '16:40:00.000Z',
    end: '17:30:00.000Z'
  },
  T6: {
    start: '17:30:00.000Z',
    end: '18:20:00.000Z'
  },
  N1: {
    start: '18:40:00.000Z',
    end: '19:30:00.000Z'
  },
  N2: {
    start: '19:30:00.000Z',
    end: '20:20:00.000Z'
  },
  N3: {
    start: '20:20:00.000Z',
    end: '21:10:00.000Z'
  },
  N4: {
    start: '21:20:00.000Z',
    end: '22:10:00.000Z'
  },
  N5: {
    start: '22:10:00.000Z',
    end: '23:00:00.000Z'
  }
}

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
