import {DB} from './Api'

function postEvent (json) {
  let new_event = {}
  new_event.title = json.title
  new_event.description = json.description
  new_event.room = json.room
  new_event.type_room = json.type_room
  new_event.startDate = json.startDate
  new_event.finalDate = json.finalDate
  new_event.schedule = json.schedule
  new_event.responsable = json.responsable
  new_event.status = "undefined"
  DB.post('event/post', new_event).then(response =>{
    console.log(response)
    return response.status
  }).catch((err) => {
    console.log(err)
  })
}

export {postEvent}
