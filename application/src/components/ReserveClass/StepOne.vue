<template>
    <b-container fluid>
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">Selecionando Horário de Evento</v-card-title>
              <v-card-text>Tem certeza que deseja confirmar a seleção?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click.native="dialog = false">Cancelar</v-btn>
                <v-btn color="green lighten-1" @click.native="search">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="info" width="500" backdrop='static'>
           
      <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Selecionando Horário</v-card-title>
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
              <v-spacer></v-spacer>
              <v-layout justify-center>
                <v-btn color="green lighten-1" v-on:click="info=false">OK</v-btn>
              </v-layout>
          </v-card>
    </v-dialog>
        </v-layout>
        <b-row>
          <b-col md="12">
				  <card style="padding: 15px;">
              <h4 slot="header" class="card-title">Reservar Horários</h4>
              <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" :config="config"></full-calendar>
             
          </card>
        <v-layout justify-center style="margin-top: 20px; margin-bottom: 20px">
                  <b-btn variant="success" style="margin-left: 10px;" v-on:click="dialog = true">Procurar Salas<i class="fa fa-search"></i></b-btn>
                  <b-btn variant="primary" style="margin-left: 10px;" v-on:click="cleanCalendar"><i class="nc-icon nc-refresh-02"></i></b-btn>
                  <b-btn variant="info" style="width: 48px; height: 39px; margin-left: 10px;" v-on:click="info=true, editable = false"><v-icon style="position: center">mdi-information-variant</v-icon></b-btn>
              </v-layout>
                <card style="padding: 15px;">
                  <h4 slot="header" class="card-title">Selecionar Salas</h4>
					        <b-row>
                    <b-col md="3">
                      <b-form-select v-model="selected" :options="bloco"/>
                    </b-col>
                    <b-col md="3">
                      <b-form-select v-model="selected" :options="tipoSala"/>
                    </b-col>
                    <b-col md="5">
                      <b-form-select v-model="selected" :options="sala"/>
                    </b-col>
                    <b-col md="1">
                      <button class="btn btn-success font-icon-detail" v-on:click="refreshTable">
                        <i class="nc-icon nc-refresh-02"></i>
                      </button>
                    </b-col>
                  </b-row>
                   	<b-table striped hover :items="rooms">
					          </b-table>
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
  .table {
    margin-top: 26px;
    margin-left: 0px;
  }

  .table-head {
    margin-top: 20px;
  }
</style>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import {freeRooms} from '../../services/GetsServices.js'
import * as utils from '../../services/utils.js'
import moment from "moment";


export default {
  components: {
    Card
  },
  data() {
    return {
      selected_down: null,
      dialog: false,
      info: false,
      id: 0,
      start: null,
      end: null,
      eventsData:[
      ],
      events: [
      ],
      rooms: [],
      config: {
          eventClick: event => {
            $('#calendar').fullCalendar('removeEvents',[event._id]);
            this.eventsData.splice(this.eventsData.findIndex(x => x.id === event.id), 1)
          },
          select: (start, end) => {
              var eventData = {
                title: 'Selecionado',
                start: moment(start._d).utc().format(),
                end: moment(end._d).utc().format(),
                id: this.id,
              }
              $('#calendar').fullCalendar('renderEvent', eventData, true)
              this.eventsData.push(eventData)
              this.id++;
              $('#calendar').fullCalendar('unselect');
          },
          eventResize: (delta) => {
            this.edit(delta)
          },
          eventDrop: (delta) => {
            this.edit(delta)
          },

          editable:true,
          slotDuration: '00:10:00'
      },
      selected: {},
      bloco: [
        { value: null, text: 'Bloco', disabled: true },
        { value: 'A', text: 'A' },
        { value: 'B', text: 'B' },
        { value: 'C', text: 'C' },
        { value: 'D', text: 'D' },
        { value: 'E', text: 'E' },
        { value: 'F', text: 'F' },
        { value: 'G', text: 'G' },
        { value: 'H', text: 'H' }
      ],
      tipoSala: [
        { value: null, text: 'Tipo da Sala', disabled: true },
        { value: 'Laboratório', text: 'Laboratório' },
        { value: 'Teórica', text: 'Teórica' },
        { value: 'Desenho', text: 'Desenho' }
      ],
      sala: [
        { value: null, text: 'Código Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      
      fields: [ 'first_name', 'last_name', 'show_details' ],
    };
  },
  methods: {
     eventSelected(event) {
      this.selected = event;
    },
    edit(newEvent){
      var index = this.eventsData.findIndex(x => x.id === newEvent.id)
      this.eventsData[index].start = moment(newEvent.start._d).utc().format()
      this.eventsData[index].end = moment(newEvent.end._d).utc().format()
    },
    refreshTable() {
      this.rooms = []
    },
    renderEvent(dataEnv, stick){
      stick = true;
    },
    cleanCalendar(){
      $('#calendar').fullCalendar('removeEvents');
    },
    search() {
      var start = moment(this.eventsData[0].start).utc().format('YYYY-MM-DDTHH:mm:ss.sss')
      var end = moment(this.eventsData[0].end).utc().format('YYYY-MM-DDTHH:mm:ss.sss')
      var schedule = utils.parseHourToSchedule(start, end)

      freeRooms({"schedule": schedule}, start, end).then((res)=>{
        for(var room of res){
          var searchRoom = {
            bloco: room._id.substr(0,1),
            tipo_Sala: room.type_room ,
            codigo_sala: room._id,
          }
            this.rooms.push(searchRoom)
        }
        this.rooms = this.rooms.sort(function (a, b) {
          if (a.bloco > b.bloco) {
            return 1;
          }
          if (a.bloco < b.bloco) {
            return -1;
          }
          return 0;
          })
      })

      this.dialog = false
    }
  }
};

</script>
