<template>
    <b-container fluid>
        <v-layout row justify-center>
           <b-modal v-model="dialog" header-bg-variant="success" header-text-variant="light" title="Selecionando Horário de Evento" :no-close-on-backdrop="false" :hide-header-close="false">
              <b-container fluid>
                <b-row>
                    <v-card-text rows="1" style="margin-top:-30px"><h4 class="text">Tem certeza que deseja confirmar a seleção?</h4></v-card-text>
                  <b-col md=10>
                      <span v-for="time in eventsData">
                        <v-layout>
                          <p>Inicio: {{time.startBr}}   Fim: {{time.endBr}}</p>
                        </v-layout>
                      </span>
                  </b-col>
                </b-row>
              </b-container>
              <div slot="modal-footer" class="w-100">
                  <b-btn class="float-right" variant="danger" @click="dialog=false">Cancelar</b-btn>
                  <b-btn style="margin-right: 10px" class="float-right" variant="success" @click="search">Confirmar</b-btn>
              </div>
            </b-modal>
        </v-layout>
          <b-modal style="position:relative; top:0px; margin-top: -10px" v-model="info" header-bg-variant="info" header-text-variant="light" title="Selecionando Horário" :no-close-on-backdrop="false" :hide-header-close="false">
                <b-container fluid>
                  <b-row>
                        <v-card-text rows="1" style="margin-top:-30px"><h4 class="text">Tem certeza que deseja confirmar a seleção?</h4></v-card-text>
                    <b-col md=10>
                        <v-card-text>
                            Para Selecionar um horário basta clicar no espaço vazio no calendário correspondente ao início do evento
                            e arrastar até o período final do evento.
                        </v-card-text>
                          <v-card-text>
                              Para deletar um horário marcado basta clicar no calendário no horário desejado
                          </v-card-text>
                          <v-card-text>
                              É possivel arrastar e redimensionar o tamanho dos horários.
                          </v-card-text>
                    </b-col>
                  </b-row>
                </b-container>
                <div slot="modal-footer" class="w-100">
                    <b-btn class="float-right" variant="info" @click="info=false">Ok</b-btn>
                </div>
              </b-modal>
        <b-row>
            <v-layout id="barButtonsCalendar">
              <b-btn variant="success" class="button_calendar" id="search" v-on:click="dialog = true"><i class="fa fa-search"></i></b-btn>
              <b-btn variant="primary" class="button_calendar" v-on:click="cleanCalendar" v-b-tooltip.hover id="Refresh1"><v-icon style="position: center">mdi-broom</v-icon></b-btn>
              <b-btn variant="info" id="info" class="button_calendar" v-on:click="info=true, editable = false"><v-icon style="position: center">mdi-information-variant</v-icon></b-btn>
              <b-tooltip target="Refresh1" title="Limpar" placement="bottom"></b-tooltip>
              <b-tooltip target="search" title="Pesquisar" placement="bottom"></b-tooltip>
              <b-tooltip target="info" title="Info" placement="bottom"></b-tooltip>
            </v-layout>
          <b-col md="12">
             <card style="padding: 15px; margin-top:15px;">
                <h4 slot="header" class="card-title">Reservar Horários</h4>
                <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" :config="config"></full-calendar>
              </card>
            </b-col>
        </b-row>
	</b-container>
</template>

<style>
@import "~fullcalendar/dist/fullcalendar.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.button_calendar{
  margin-left: 10px; 
  margin-bottom: 10px; 
  width: 52px; 
  height: 37px; 
  margin-left: 10px;
}
.table {
  margin-top: 26px;
  margin-left: 0px;
}
#barButtonsCalendar {
  position: fixed;
  top: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  z-index: 3;
  display: grid;
  right: 12px;
}
.table-head {
  margin-top: 20px;
}
</style>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import { freeRooms } from "../../services/GetsServices.js";
import * as utils from "../../services/utils.js";
import moment from "moment";
import { FormCheckbox } from "bootstrap-vue/es/components";
export default {
  components: {
    Card
  },
  data() {
    return {
      //Modal
      dialog: false,
      info: false,
      //FullCalendar
      id: 0,
      start: null,
      end: null,
      selected: {},
      editable: true,
      eventsData: [],
      events: [],
      config: {
        eventClick: event => {
          $("#calendar").fullCalendar("removeEvents", [event._id]);
          this.eventsData.splice(
            this.eventsData.findIndex(x => x.id === event.id),
            1
          );
        },
        select: (start, end) => {
          var eventData = {
            title: "Selecionado",
            start: moment(start._d)
              .utc()
              .format(),
            end: moment(end._d)
              .utc()
              .format(),
            id: this.id,
            startBr: moment(start._d)
              .utc()
              .format("DD/MM/YYYY HH:mm"),
            endBr: moment(start._d)
              .utc()
              .format("DD/MM/YYYY HH:mm")
          };
          $("#calendar").fullCalendar("renderEvent", eventData, true);
          this.eventsData.push(eventData);
          this.id++;
          $("#calendar").fullCalendar("unselect");
        },
        eventResize: delta => {
          this.edit(delta);
        },
        eventDrop: delta => {
          this.edit(delta);
        },
        slotDuration: "00:10:00",
        eventOverlap: false,
        minTime: "07:00:00",
        maxTime: "23:00:00",
        height: 650
      },
      item_table:[]
    };
  },
  methods: {
    eventSelected(event) {
      this.selected = event;
    },
    edit(newEvent) {
      var index = this.eventsData.findIndex(x => x.id === newEvent.id);
      this.eventsData[index].start = moment(newEvent.start._d)
        .utc()
        .format();
      this.eventsData[index].end = moment(newEvent.end._d)
        .utc()
        .format();
    },
    renderEvent(dataEnv, stick) {
      stick = true;
    },
    cleanCalendar() {
      $("#calendar").fullCalendar("removeEvents");
      this.eventsData = [];
    },
    search() {
      for (var eventData of this.eventsData) {
        var start = moment(eventData.start)
          .utc()
          .format();
        var end = moment(eventData.end)
          .utc()
          .format();
        //var end = moment(eventData.end).utc().format('YYYY-MM-DDTHH:mm:ss.sss')
        var schedule = utils.parseHourToSchedule(start, end);

        freeRooms(
          { schedule: schedule },
          moment(start)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.sss"),
          moment(end)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.sss")
        ).then(res => {
          for (var room of res) {
            var searchRoom = {
              roomCode: room._id,
              roomType: room.type_room,
              capacity: room.capacity,
              isoStart: start,
              isoEnd: end,
              id: this.id,
              start: moment(eventData.start)
                .utc()
                .format("DD/MM/YYYY HH:mm"),
              end: moment(eventData.end)
                .utc()
                .format("DD/MM/YYYY HH:mm")
            };

            if (searchRoom.capacity == null) {
              searchRoom.capacity = "Não definido";
            }
            
            this.item_table.push(searchRoom);
            this.id++;
          }
          this.item_table = this.item_table.sort(function(a, b) {
            if (a.bloco > b.bloco) {
              return 1;
            }
            if (a.bloco < b.bloco) {
              return -1;
            }
            return 0;
          });
        });
      }
      this.item_table = this.item_table.filter(function(a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null));
      console.log(this.item_table)
      this.$emit("itemsTable", this.item_table)
      this.dialog = false;
    },
  },
};
</script>
