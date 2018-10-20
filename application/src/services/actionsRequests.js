import {DB} from './Api'

export async function checkConflicts(reservationStart, reservationEnd, periodStart, periodEnd) {
  return await DB.get('actions/checkConflicts/p1/' + reservationStart + '/' + reservationEnd + '/p2/' + periodStart + '/' + periodEnd).then((res) => {
    return res.data
  })
}
