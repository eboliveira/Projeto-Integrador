import moment from 'moment'

import * as utils from './utils';
import * as rooms from './roomQuerys'
import * as events from './eventQuerys'
import * as lessons from './lessonQuerys'
import * as equipments from './equipmentsQuery'
import * as actions from './actionsRequests'

export async function findRoom(room){
    const events_list = await events.atRoom(room)
    const lessons_list = await lessons.atRoom(room)
    events_list.forEach(item => {
        lessons_list.push(item)
    });
    return lessons_list;
}

export async function freeRooms(schedule, startDate, finalDate){
  var freeRooms = await rooms.getFree(schedule, startDate, finalDate)

  for (var i = 0; i < freeRooms.length; i++) {
    let hasConflicts = false
    if (freeRooms[i].Events.length > 0) {
      for (var k = 0; k < freeRooms[i].Events.length; k++) {
        for (var j = 0; j < schedule.schedule.length; j++) {
          const timeInterval = utils.parseScheduleToDate(schedule.schedule[j])
          let startClass = moment(moment(freeRooms[i].Events[k].startDate).utc().format("YYYY-MM-DD") + "T" + timeInterval['start'] + ":00.000Z")
          let endClass = moment(moment(freeRooms[i].Events[k].startDate).utc().format("YYYY-MM-DD") + "T" + timeInterval['end'] + ":00.000Z")
          while (moment(startClass).isSameOrBefore(freeRooms[i].Events[k].finalDate)) {
            hasConflicts = utils.checkConflicts(startClass.utc().format(), endClass.utc().format(), freeRooms[i].Events[k].startDate, freeRooms[i].Events[k].finalDate)
            startClass = moment(startClass).add(1, 'd')
            endClass = moment(endClass).add(1, 'd')
            if (hasConflicts) {
              freeRooms.splice(i, 1)
              break
            }
          }
          if (hasConflicts) {
            break
          }
        }
        if (hasConflicts) {
          break
        }
      }
    }
  }

  return freeRooms
}

export async function allEquipments(){
    return await equipments.all()
}
