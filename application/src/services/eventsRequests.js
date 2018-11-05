import {events} from './Api'

export function changeStatus(eventId,status){
    events.put('status/'+eventId,{status: status})
}
