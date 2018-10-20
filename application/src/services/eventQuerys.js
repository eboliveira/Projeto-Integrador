import {DB} from './Api'

export async function all(){
  return await DB.get('events/all').then((res) => {
    return res.data
  })
}

export async function byResponsable(responsable){
  return await DB.get('events/responsable/' + responsable).then((res) => {
    return res.data
  })
}

export async function byResponsableAtInterval(responsable, startDate, finalDate){
  return await DB.get('events/responsable/' + responsable + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atRoom(room){
  return await DB.get('events/room/' + room).then((res) => {
    return res.data
  })
}

export async function atRoomAtSchedule(room, schedule){
  return await DB.post('events/room/' + room, schedule).then((res) => {
    return res.data
  })
}

export async function atRoomAtInterval(room, startDate, finalDate){
  return await DB.get('events/room/' + room + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atRoomAtScheduleAtInterval(room, schedule, startDate, finalDate){
  return await DB.post('events/room/' + room + '/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function atInterval(startDate, finalDate){
  return await DB.get('events/atInterval/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atScheduleAtInterval(schedule, startDate, finalDate){
  return await DB.post('events/atScheduleAtIntertal/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function byId(id){
  return await DB.get('events/' + id).then((res) => {
    return res.data
  })
}
