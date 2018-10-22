import {lessons} from './Api'

export async function all(){
  return await lessons.get('all').then((res) => {
    return res.data
  })
}

export async function byDisciplineCod(cod){
  return await lessons.get('discipline/code/' + cod).then((res) => {
    return res.data
  })
}

export async function byDisciplineCodAtClass(cod, classroom){
  return await lessons.get('discipline/code/' + cod + '/class' + classroom).then((res) => {
    return res.data
  })
}

export async function byDisciplineName(disciplineName){
  return await lessons.get('discipline/name/' + disciplineName).then((res) => {
    return res.data
  })
}

export async function byDisciplineNameAtClass(disciplineName, classroom){
  return await lessons.get('discipline/name/' + disciplineName + '/class' + classroom).then((res) => {
    return res.data
  })
}

export async function atRoom(room){
  return await lessons.get('room/' + room).then((res) => {
    return res.data
  })
}

export async function atRoomAtSchedule(room, schedule){
  return await lessons.post('room/' + room, schedule).then((res) => {
    return res.data
  })
}

export async function bySchedule(schedule){
  return await lessons.post('schedule', schedule).then((res) => {
    return res.data
  })
}

export async function byResponsable(responsable){
  return await lessons.get('responsable/' + responsable).then((res) => {
    return res.data
  })
}

export async function byId(id){
  return await lessons.get(id).then((res) => {
    return res.data
  })
}
