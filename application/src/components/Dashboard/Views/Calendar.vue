<template>
	<div id="app">
    <card style="padding: 10px">
      <router-view/><router-view name = "calendarView"/>
      <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
    </card>
	</div>
</template>

<style>
  @import "~fullcalendar/dist/fullcalendar.css";
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>

<script>
import {parseScheduleToDate} from "./../../../services/utils"
import controllers from "./../../../services/eventsFullCalendar"
import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
  name: "app",
  data() {
    return {
      events: [
      ],
      config: {
        eventClick: event => {
          this.selected = event;
        }
      },
      selected: {}
    };
  },
  components:{
    Card
  },
  methods: {
    refreshEvents(res) {
      if(res.length == 0){
        alert("Sala não encontrada")
        return false
      }
      this.events = []
      res.forEach(item => {
        let new_event = {};
        if (item['description']){       //se é um evento
            if(item['status'] == 'confirmed'){
                if(item['repeat']){         //se tem repetição
                    let events_list = []
                    if(item['repeat'] == "daily"){ //se é diariamente
                        events_list = controllers.repeat(item, 'day')
                    }
                    else if(item['repeat'] == "weekly"){ //se é semanalmente
                        events_list = controllers.repeat(item, 'week')
                    }
                    else if(item['repeat'] == "monthly"){ //se é semanalmente
                        events_list = controllers.repeat(item, 'month')
                    }
                    events_list.forEach(item =>{
                        this.events.push(item)
                    })
                }
                else{
                    new_event = controllers.createEvent(item)
                    this.events.push(new_event)
                }
            }
        }
        else{
            const schedule = parseScheduleToDate(item['schedule'][0])
            new_event = controllers.createLesson(item, schedule)
            this.events.push(new_event)
        }
        return true
      });
    },
    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },
    eventSelected(event) {
      this.selected = event;
    },
    eventCreated(...test) {

    }
  },
  mounted: function() {
  }
};
</script>
