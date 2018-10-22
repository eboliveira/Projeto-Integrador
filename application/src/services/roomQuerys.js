import {rooms} from './Api'

export async function all(){
  return await rooms.get('all').then((res) => {
    return res.data
  })
}

export async function getFree(schedule, startDate, finalDate){
  return await rooms.post('free/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function getFreeByType(schedule, roomType, startDate, finalDate){
  return await rooms.post(roomType + '/free/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function getById(room){
  return await rooms.get(room).then((res) => {
    return res.data
  })
}

export async function getSchedule(room, startDate, finalDate){
  return await rooms.get('schedule/' + room + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function getScheduleByRoomType(roomType, startDate, finalDate){
  return await rooms.get('schedule/type/' + roomType + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function set(room){
  return await rooms.put('set', room).then((res) => {
    return res.data
  })
}
