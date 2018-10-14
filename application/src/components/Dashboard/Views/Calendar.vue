<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div id="app">
          <router-view/><router-view name = "calendarView"/>
          <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
        </div>
      </div>
    </div>
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
import moment from "moment";
import {parseScheduleToDate} from "./../../../services/utils"
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
  methods: {
    refreshEvents(res) {
      if(res.length == 0){
        alert("Sala não encontrada")
        return false
      }
      this.events = []
      res.forEach(item => {
        const schedule = parseScheduleToDate(item['schedule'][0])
        let new_event = {
          title:item['discipline_name'],
          start: schedule['start'],
          end: schedule['end'],
          dow: [(parseInt(item['schedule'][0][0]))-1]
        }
        this.events.push(new_event)
      });
        return true
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
