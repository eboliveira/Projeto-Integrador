const classSchedules = {
  M1 = {
    start = '07:30',
    end = '08:20'
  },
  M2 = {
    start = '08:20',
    end = '09:10'
  },
  M3 = {
    start = '09:10',
    end = '10:00'
  },
  M4 = {
    start = '10:20',
    end = '11:10'
  },
  M5 = {
    start = '11:10',
    end = '12:00'
  },
  M6 = {
    start = '12:00',
    end = '12:50'
  },
  T1 = {
    start = '13:00',
    end = '13:50'
  },
  T2 = {
    start = '13:50',
    end = '14:40'
  },
  T3 = {
    start = '14:40',
    end = '15:30'
  },
  T4 = {
    start = '15:50',
    end = '16:40'
  },
  T5 = {
    start = '16:40',
    end = '17:30'
  },
  T6 = {
    start = '17:30',
    end = '18:20'
  },
  N1 = {
    start = '18:40',
    end = '19:30'
  },
  N2 = {
    start = '19:30',
    end = '20:20'
  },
  N3 = {
    start = '20:20',
    end = '21:10'
  },
  N4 = {
    start = '21:20',
    end = '22:10'
  },
  N5 = {
    start = '22:10',
    end = '23:00'
  }
}

function checkValid(reservationStart, reservationEnd) {
  var reservation_start = this.$moment(new Date(reservationStart))
  var reservation_end = this.$moment(new Date(reservationEnd))

  if (reservation_start.isSameOrAfter(reservation_end)) {
    return false // Invalid interval
  }

  return true
}

function checkConflicts(reservationStart, reservationEnd, periodStart, periodEnd) {
  var reservation_start = this.$moment(new Date(reservationStart))
  var reservation_end = this.$moment(new Date(reservationEnd))
  var checkingStart = this.$moment(new Date(periodStart))
  var checkingEnd = this.$moment(new Date(periodEnd))

  if (checkingStart.isBetween(reservation_start, reservation_end) || checkingEnd.isBetween(reservation_start, reservation_end)) {
    return 1 // There is a reservation whose start and / or end is within the selected period.
  }

  if (reservation_start.isBetween(checkingStart, checkingEnd) || reservation_end.isBetween(checkingStart, checkingEnd)) {
    return 2 // The start and / or end is within the period of an existing reservation.
  }

  return 0
}

export default {classSchedules, checkValid}
