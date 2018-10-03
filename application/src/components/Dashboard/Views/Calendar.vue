<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div id="app">
          <router-view/><router-view name = "calendarView"/>
          <div class="row" style="margin-bottom: 10px;">
            <div class="col-3">
              <button v-if="selected._id" @click="removeEvent" class="btn btn-danger float-left">Remove</button>
            </div>
            <div class="col-6">
              <button @click="refreshEvents" class="btn btn-primary">Refresh</button>
            </div>
            <div class="col-3">
              <button @click="runScript()" class="btn btn-warning float-right">Gerar horários</button>
            </div>
          </div>
          <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
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
export default {
  name: "app",
  data() {
    return {
      events: [
        {
          title: "test",
          allDay: true,
          start: "2018-10-25T00:00:00",
          end: "2018-10-26T12:00:00"
        },
        {
          //   title: 'test2',
          // allDay: true,
          // start: moment().add(1, 'd'),
          // end: moment().add(2, 'd')
        },
        {
          //   title: 'test3',
          // allDay: true,
          // start: moment(),
          // end: moment().add(3, 'd')
        }
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
      this.$refs.calendar.$emit("refetch-events");
    },
    removeEvent() {
      this.$refs.calendar.$emit("remove-event", this.selected);
      this.selected = {};
    },
    eventSelected(event) {
      this.selected = event;
    },
    eventCreated(...test) {
      console.log(test);
    }
  },
  mounted: function() {
    console.log(moment());
  },
  computed: {
    eventSources() {
      const self = this;
      return [
        {
          events(start, end, timezone, callback) {
            setTimeout(() => {
              callback(self.events.filter(() => Math.random() > 0.5));
            }, 1000);
          }
        }
      ];
    }
  }
};
</script>
