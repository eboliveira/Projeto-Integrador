<template>
  <div id="app">
    <router-view/><router-view name = "calendarView"/>
    <button @click="refreshEvents" class="btn btn-primary">Refresh</button>
    <button v-if="selected._id" @click="removeEvent" class="btn">Remove</button>
    <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
    <div style="margin-top: 10px;">
      <button @click="runScript()" class="btn btn-primary btn-fill">Gerar horários</button>
       <v-btn to="/admin/reserveclass"
            color="teal lighten-2"
            class="btn btn-simple">
            Reservar horário
        </v-btn>
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
    color: #2c3e50;
    margin: 20px;
  }
</style>

<script>
  import moment from 'moment';
  export default {
    name: 'app',
    data() {
      return {
        events: [
          {
              title: 'test',
            allDay: true,
            start: '2018-09-25T00:00:00',
            end: '2018-09-25T12:00:00'
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
          },
        ],
        config: {
          eventClick: (event) => {
            this.selected = event;
          },
        },
        selected: {},
      };
    },
    methods: {
      refreshEvents(res) {
        this.$refs.calendar.$emit('refetch-events');
      },
      removeEvent() {
        this.$refs.calendar.$emit('remove-event', this.selected);
        this.selected = {};
      },
      eventSelected(event) {
        this.selected = event;
      },
      eventCreated(...test) {
        console.log(test);
      },
    },
    mounted:function(){
      console.log(moment())
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
            },
          },
        ];
      },
    },
  };
</script>
