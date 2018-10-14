import {DB} from './Api'
import {RoomBinarySearch} from './utils';
import * as events from './eventQuerys'
import * as lessons from './lessonQuerys'
import * as equipments from './equipmentsQuery'

export async function findRoom(room){
    const findInEvents = (room) =>{
        return DB.get('events/room/' + room)
        .then( (res) =>{
            return res.data
        });
    };
    const findInLessons = (room) =>{
        return DB.get('lesson/room/' + room)
        .then( (res) =>{
            return res.data
        });
    };
    async function do_search(){
        const events_list = await findInEvents(room)
        const lessons_list = await findInLessons(room)
        events_list.forEach(item => {
            lessons_list.push(item)
        });
        return lessons_list;
    }
    return await do_search()
}

export async function freeRooms(schedule, startDate, finalDate){
  let freeRooms = {}
  var freeLessonsRooms = await lessons.freeRooms(schedule)
  var eventsRooms = await events.atScheduleAtInterval(schedule, startDate, finalDate)

  if (eventsRooms.length > 0) {
    for (var i = 0; i < freeLessonsRooms.length; i++) {
      if (RoomBinarySearch(0, eventsRooms.length, eventsRooms, freeLessonsRooms[i].room) < 0) {
        freeLessonsRooms.splice(i, 1)
      }
    }
  }

  return freeLessonsRooms
}

export async function allEquipments(){
    return await equipments.all()
}
