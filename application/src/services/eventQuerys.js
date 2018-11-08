import {events} from './Api'

export async function all(){
  return await events.get('all').then((res) => {
    return res.data
  })
}

export async function byResponsable(responsable){
  return await events.get('responsable/' + responsable).then((res) => {
    return res.data
  })
}

export async function byResponsableAtInterval(responsable, startDate, finalDate){
  return await events.get('responsable/' + responsable + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atRoom(room){
  return await events.get('room/' + room).then((res) => {
    return res.data
  })
}

export async function byStatus(status){
  return await events.get('status/' + status).then((res) => {
    return res.data
  })
}

export async function byStatusAtInterval(status,  startDate, finalDate){
  return await events.get('status/' + status + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atRoomAtSchedule(room, schedule){
  return await events.post('room/' + room, schedule).then((res) => {
    return res.data
  })
}

export async function atRoomAtInterval(room, startDate, finalDate){
  return await events.get('room/' + room + '/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atRoomAtScheduleAtInterval(room, schedule, startDate, finalDate){
  return await events.post('room/' + room + '/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function atInterval(startDate, finalDate){
  return await events.get('atInterval/' + startDate + '/' + finalDate).then((res) => {
    return res.data
  })
}

export async function atScheduleAtInterval(schedule, startDate, finalDate){
  return await events.post('atScheduleAtIntertal/' + startDate + '/' + finalDate, schedule).then((res) => {
    return res.data
  })
}

export async function byId(id){
  return await events.get(id).then((res) => {
    return res.data
  })
}
