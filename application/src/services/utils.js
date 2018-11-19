import moment from 'moment'

const timeAPI = 'https://script.googleusercontent.com/macros/echo?user_content_key=Z4OOvXdX0KkKqfHxaNx-MeLwgf63O5c71wwLC3m16Dz2_J2_2rwvxV_BLlI43zns_L49PiyRcIlLk-mMghzhABEfwj_Lx6d6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6bwVq0tbM60-_IQDS8gp7-wwK7XAnp4CU0ajkDCYtjwe&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk'

const classSchedules = {
    M1: {
        start: '07:30',
        end: '08:20'
    },
    M2: {
        start: '08:20',
        end: '09:10'
    },
    M3: {
        start: '09:10',
        end: '10:00'
    },
    M4: {
        start: '10:20',
        end: '11:10'
    },
    M5: {
        start: '11:10',
        end: '12:00'
    },
    M6: {
        start: '12:00',
        end: '12:50'
    },
    T1: {
        start: '13:00',
        end: '13:50'
    },
    T2: {
        start: '13:50',
        end: '14:40'
    },
    T3: {
        start: '14:40',
        end: '15:30'
    },
    T4: {
        start: '15:50',
        end: '16:40'
    },
    T5: {
        start: '16:40',
        end: '17:30'
    },
    T6: {
        start: '17:30',
        end: '18:20'
    },
    N1: {
        start: '18:40',
        end: '19:30'
    },
    N2: {
        start: '19:30',
        end: '20:20'
    },
    N3: {
        start: '20:20',
        end: '21:10'
    },
    N4: {
        start: '21:20',
        end: '22:10'
    },
    N5: {
        start: '22:10',
        end: '23:00'
    }
}

export function checkConflicts(reservationStart, reservationEnd, periodStart, periodEnd) {
    var reservation_start = moment(new Date(reservationStart))
    var reservation_end = moment(new Date(reservationEnd))
    var checkingStart = moment(new Date(periodStart))
    var checkingEnd = moment(new Date(periodEnd))

    if (checkingStart.isBetween(reservation_start, reservation_end, null, '[]') || checkingEnd.isBetween(reservation_start, reservation_end, null, '[]')) {
        return true // There is a reservation whose start and / or end is within the selected period.
    }

    if (reservation_start.isBetween(checkingStart, checkingEnd, null, '[]') || reservation_end.isBetween(checkingStart, checkingEnd, null, '[]')) {
        return true // The start and / or end is within the period of an existing reservation.
    }

    return false
}

export function parseScheduleToDate(schedule) {
    const week_day = schedule[0]
    var schedule_hour = schedule.substring(1,3)
    schedule_hour = schedule_hour.toUpperCase()
    for (const item in classSchedules) {
        if(schedule_hour == item){
            return classSchedules[item]
        }
    }
}

export function parseHourToSchedule(dateTime_1, dateTime_2) {
    var startDateTime = moment(dateTime_1).format('MM/DD/YY HH:mm').split(' ')
    var endDateTime = moment(dateTime_2).format('MM/DD/YY HH:mm').split(' ')
    var schedules = []

    for (const schedule in classSchedules) {
        if (classSchedules[schedule].start <= endDateTime[1] && classSchedules[schedule].end >= startDateTime[1]) {
            schedules.push(schedule.toLowerCase())
        }
    }

    var start = moment(new Date(startDateTime[0]))
    var end = moment(new Date(endDateTime[0]))
    var schedulesWithDays = []

    while (moment(start).isSameOrBefore(end)) {
        var weekday = start.weekday()+1
        for (var i = 0; i < schedules.length; i++) {
            schedulesWithDays.push(weekday + schedules[i])
        }
        start = moment(start).add(1, 'd')
    }

    return schedulesWithDays
}

export function sortSchedule(schedule) {
    schedule.sort(function(a, b){
        var x = a.substring(1,2)
        var y = b.substring(1,2)
        if (x == 'm' && y == 't' || x == 'm' && y == 'n' || x == 't' && y == 'n') {
            return -1
        }
        if (x == 't' && y == 'm' || x == 'n' && y == 'm' || x == 'n' && y == 't') {
            return 1
        }
        if (x == y) {
            if (a.substring(0,1) > b.substring(0,1)) {
                return 1
            }
            if (a.substring(0,1) < b.substring(0,1)) {
                return -1
            }
            if (a.substring(0,1) == b.substring(0,1)) {
                if (a.substring(2,3) > b.substring(2,3)) {
                    return 1
                }
                if (a.substring(2,3) < b.substring(2,3)) {
                    return -1
                }
                if (a.substring(2,3) == b.substring(2,3)) {
                    return 0
                }
            }
        }
    })
    return schedule
}

export async function getTime() {
    return await fetch(timeAPI).then(res => res.json()).then((out) => {
        let year = out.year
        let month = out.month
        let day = out.day
        let hours = out.hours < 7 ? 7 : (out.hours > 23 ? 22 : out.hours)
        let minutes = out.minutes % 10 ? (out.minutes + (out.minutes % 10)) : out.minutes
        minutes = minutes >= 60 ? 0 : minutes
        return moment(new Date(month + '/' + day + '/' + year + ' ' + hours + ':' + minutes))
    })
}


export function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

export function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

export function toHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(360*h);
    s = Math.round(100*s);
    l = Math.round(100*l);
    return [h, s, l]
}
