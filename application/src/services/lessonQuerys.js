import {DB} from './Api'

export async function all(){
  return await DB.get('lesson/all').then((res) => {
    return res.data
  })
}

export async function byDisciplineCod(cod){
  return await DB.get('lesson/discipline/code/' + cod).then((res) => {
    return res.data
  })
}

export async function byDisciplineCodAtClass(cod, classroom){
  return await DB.get('lesson/discipline/code/' + cod + '/class' + classroom).then((res) => {
    return res.data
  })
}

export async function byDisciplineName(disciplineName){
  return await DB.get('lesson/discipline/name/' + disciplineName).then((res) => {
    return res.data
  })
}

export async function byDisciplineNameAtClass(disciplineName, classroom){
  return await DB.get('lesson/discipline/name/' + disciplineName + '/class' + classroom).then((res) => {
    return res.data
  })
}

export async function atRoom(room){
  return await DB.get('lesson/room/' + room).then((res) => {
    return res.data
  })
}

export async function atRoomAtSchedule(room, schedule){
  return await DB.post('lesson/room/' + room, schedule).then((res) => {
    return res.data
  })
}

export async function byRoomType(roomType){
  return await DB.get('lesson/room/type/' + roomType).then((res) => {
    return res.data
  })
}

export async function byRoomTypeAtSchedule(roomType, schedule){
  return await DB.post('lesson/room/type/' + roomType, schedule).then((res) => {
    return res.data
  })
}

export async function freeRooms(schedule){
  return await DB.post('lesson/freeRooms', schedule).then((res) => {
    return res.data
  })
}

export async function freeRoomsByType(roomType, schedule){
  return await DB.post('lesson/freeRooms/' + roomType, schedule).then((res) => {
    return res.data
  })
}

export async function bySchedule(schedule){
  return await DB.post('lesson/schedule', schedule).then((res) => {
    return res.data
  })
}

export async function byResponsable(responsable){
  return await DB.get('lesson/responsable/' + responsable).then((res) => {
    return res.data
  })
}

export async function byId(id){
  return await DB.get('lesson/' + id).then((res) => {
    return res.data
  })
}
