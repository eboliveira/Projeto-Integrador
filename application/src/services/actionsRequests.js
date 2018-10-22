import {actions} from './Api'

export async function checkConflicts(reservationStart, reservationEnd, periodStart, periodEnd) {
  return await actions.get('checkConflicts/p1/' + reservationStart + '/' + reservationEnd + '/p2/' + periodStart + '/' + periodEnd).then((res) => {
    return res.data
  })
}
