import {DB} from './Api'

export async function all(){
  return await DB.get('room/all').then((res) => {
    return res.data
  })
}

export async function getFree(schedule, startDate, finalDate){
  return await DB.post('room/free/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function getFreeByType(schedule, roomType, startDate, finalDate){
  return await DB.post('room/' + roomType + '/free/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function getById(room){
  return await DB.get('room/' + room).then((res) => {
    return res.data
  })
}

export async function getSchedule(room, startDate, finalDate){
  return await DB.get('room/schedule/' + room + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function getScheduleByRoomType(roomType, startDate, finalDate){
  return await DB.get('room/schedule/type/' + roomType + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function set(room){
  return await DB.put('room/set', room).then((res) => {
    return res.data
  })
}
