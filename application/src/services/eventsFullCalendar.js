import moment from 'moment'
import {intToRGB, hashCode, toHSL} from './utils'

function repeat(item, flag){
    let events_list = []
    let startDate = moment(item['startDate'])
    let finalDate = moment(item['finalDate'])
    let finalTime = moment(item['finalDate']).utc().format("HH:mm:ss")
    while(startDate <= finalDate){
        let finalDateTemp = moment(startDate).format("YYYY-MM-DD")+ "T" + finalTime+"Z"
        let new_event = {
            title: item['title'],
            start:startDate.utc().format(),
            end:finalDateTemp,
            color: '#fffc77',
            borderColor: '#000000',
            editable: false
        }
        startDate.add(1,flag)
        events_list.push(new_event)
    }
    return events_list
}

function createEvent(item){
    let new_event = {
        title: item['title'],
        start: item['startDate'],
        end: item['finalDate'],
        color: '#fffc77',
        borderColor: '#000000',
        editable: false
    }
    return new_event
}

function createLesson(item, schedule){
    const eventColor = '#' + intToRGB(hashCode((item['discipline_cod']+'_'+item['class_cod'])))
    const textColor = toHSL(eventColor)[2] >= 40 ? '#000000' : '#F5F5F5'
    let new_event = {
        title:item['discipline_cod'] + ' - ' + item['class_cod'],
        start: schedule['start'],
        end: schedule['end'],
        dow: [(parseInt(item['schedule'][0][0]))-1],
        color: eventColor,
        textColor: textColor,
        borderColor: eventColor,
        editable: false
    }
    return new_event
}

export default {
    repeat,
    createEvent,
    createLesson
}
