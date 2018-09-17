<template>
  <div id="app">
    <button @click="refreshEvents" class="btn btn-primary">Refresh</button>
    <button v-if="selected._id" @click="removeEvent" class="btn">Remove</button>
    <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
    <div style="margin-top: 10px;">
      <button @click="runScript()" class="btn btn-primary btn-fill">Gerar horários</button>
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
            id: 1,
            title: 'event1',
            start: moment().hours(12).minutes(0),
          },
          {
            id: 2,
            title: 'event2',
            start: moment().add(-1, 'days'),
            end: moment().add(1, 'days'),
            allDay: true,
          },
          {
            id: 3,
            title: 'event3',
            start: moment().add(2, 'days'),
            end: moment().add(2, 'days').add(6, 'hours'),
            allDay: false,
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
      refreshEvents() {
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
