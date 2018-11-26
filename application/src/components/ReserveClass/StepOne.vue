<template>
    <b-container fluid>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent width="500">
                <v-card>
                    <v-card-title class="headline">Selecionando Horário de Evento</v-card-title>
                    <v-card-text>Tem certeza que deseja confirmar a seleção?</v-card-text>
                    <span v-for="time in eventsData">
                        <v-layout>
                            <p>Inicio: {{time.startBr}}   Fim: {{time.endBr}}</p>
                        </v-layout>
                    </span>
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
                    <b-btn variant="success" style="margin-left: 10px;" v-on:click="dialog = true"><i class="fa fa-search"></i></b-btn>
                    <b-btn variant="primary" style="margin-left: 10px;" v-on:click="cleanCalendar" v-b-tooltip.hover id="Refresh1"><v-icon style="position: center">mdi-broom</v-icon></b-btn>
                    <b-btn variant="info" style="width: 58px; height: 43px; margin-left: 10px;" v-on:click="info=true, editable = false"><v-icon style="position: center">mdi-information-variant</v-icon></b-btn>
                    <b-tooltip target="Refresh1" title="Clear" placement="bottom"></b-tooltip>
                </v-layout>
                <card style="padding: 15px;">
                  <h4 slot="header" class="card-title">Selecionar Salas</h4>
					        <b-row>
                    <b-col md="3">
                      <b-form-select v-model="selectedroomType" :options="roomType"/>
                    </b-col>
                    <b-col md="4">
                      <b-form-select v-model="selectedcapacity" :options="capacity"/>
                    </b-col>
                    <b-col md="1">
                      <button id="check" class="btn btn-success font-icon-detail" v-on:click="filterTable" v-b-tooltip.hover>
                        <i class="nc-icon nc-check-2"></i>
                      </button>
                      <b-tooltip target="check" title="Aplicar Filtro" placement="bottom"></b-tooltip>
                    </b-col>
                     <b-col md="1">
                      <button id="Refresh" class="btn btn-success font-icon-detail" v-on:click="refreshTable" v-b-tooltip.hover>
                        <i class="nc-icon nc-refresh-02"></i>
                      </button>
                      <b-tooltip target="Refresh" title="Refresh" placement="bottom"></b-tooltip>
                    </b-col>
                  </b-row>
                   	<b-table show-empty striped hover :items="items" :fields="field" :current-page="currentPage" :per-page="perPage" :filter="filter" @filtered="onFiltered">
                       <template slot="roomCode" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="roomType" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="capacity" slot-scope="row">
                         <span>{{row.item.capacity}}</span>
                       </template>
                       <template slot="start" slot-scope="row">
                         <span>{{row.item.start}}</span>
                       </template>
                       <template slot="end" slot-scope="row">
                         <span>{{row.item.end}}</span>
                       </template>
                       <template slot="actions" slot-scope="row">
                          <b-form-checkbox v-on:click.stop :id="String(row.item.id)" :value="row.item" v-model="selectedRoom"></b-form-checkbox>
                       </template>
					          </b-table>
                  <v-layout justify-center>
                     <b-row>
                        <b-col md="2" >
                            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                        </b-col>
                    </b-row>
                    </v-layout>
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
import { freeRooms } from '../../services/GetsServices.js'
import * as utils from '../../services/utils.js'
import moment from "moment";
import { FormCheckbox } from 'bootstrap-vue/es/components';
export default {
    components: {
        Card,
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
            editable:true,
            eventsData:[
            ],
            events: [
            ],
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
                        startBr: moment(start._d).utc().format('DD/MM/YYYY HH:mm'),
                        endBr: moment(end._d).utc().format('DD/MM/YYYY HH:mm')
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
                themeSystem: 'bootstrap4',
                slotDuration: '00:10:00',
                eventOverlap: false,
                minTime: '07:00:00',
                maxTime: '23:00:00',
                height: 650
            },
            //Table
            items: [],
            refresh: [],
            currentPage: 1,
            perPage: 10,
            totalRows: null,
            sortBy: null,
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            selectedcapacity: null,
            selectedroomType: null,
            selectedRoom: [],
            capacity: [
                { value: null, text: "Capacidade"},
                { value: 30, text: "Até 30 lugares" },
                { value: 40, text: "30 à 40" },
                { value: 50, text: "50 e superior" },
            ],
            roomType: [
                { value: null, text: "Tipo da sala"},
                { value: "Laboratório", text: "Laboratório" },
                { value: "Teórica", text: "Teórica" },
                { value: "Desenho", text: "Desenho" }
            ]
        };
    },
    cleanCalendar(){
      $('#calendar').fullCalendar('removeEvents');
      this.eventsData = []
    },
    search() {
      for(var eventData of this.eventsData){
          var start = moment(eventData.start).utc().format()
          var end = moment(eventData.end).utc().format()
          //var end = moment(eventData.end).utc().format('YYYY-MM-DDTHH:mm:ss.sss')
          var schedule = utils.parseHourToSchedule(start, end)

          freeRooms({"schedule": schedule}, moment(start).utc().format('YYYY-MM-DDTHH:mm:ss.sss'), moment(end).utc().format('YYYY-MM-DDTHH:mm:ss.sss')).then((res)=>{
            for(var room of res){
              var searchRoom = {
                roomCode : room._id,
                roomType: room.type_room,
                capacity: room.capacity,
                isoStart: start,
                isoEnd: end,
                id: this.id,
                start: moment(eventData.start).utc().format('DD/MM/YYYY HH:mm'),
                end: moment(eventData.end).utc().format('DD/MM/YYYY HH:mm'),
              }

              if(searchRoom.capacity == null){
                searchRoom.capacity = "Não definido"
              }
                this.items.push(searchRoom)
                this.id++
            }
            this.items = this.items.sort(function (a, b) {
              if (a.bloco > b.bloco) {
                return 1;
              }
              if (a.bloco < b.bloco) {
                return -1;
              }
              return 0;
              })
          })
      }
      this.items =  this.items.filter(function (a) {
	      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
      }, Object.create(null))
      this.totalRows = this.items.length
      this.refresh = this.items
      this.dialog = false
    },
    onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        filterTable() {
            var roomType = this.selectedroomType
            var capacity = this.selectedcapacity
            var searchData = []
            if(roomType == 1){
                this.items = this.refresh
                return
            }
            else if(roomType){
                for(var search of this.refresh){
                    var exist = Object.values(search)
                    if(exist.find(x => x == roomType)){
                        searchData.push(search)
                    }
                }
            }
            // if(capacity){
            //     if(searchData != null){
            //       for(var search of this.refresh){
            //           var exist = Object.values(search)
            //           if(capacity == 30){
            //             if(exist.find(x => x <= capacity || x == null)){
            //                 searchData.push(search)
            //             }
            //           }
            //           else if(capacity == 40){
            //              if(exist.find(x => x >= capacity && capacity < 50)){
            //                 searchData.push(search)
            //             }
            //           }
            //           else{
            //              if(exist.find(x => x >= capacity)){
            //                 searchData.push(search)
            //             }
            //           }
            //       }
            //     }
            //     else{
            //       for(var search of searchData){
            //           var exist = Object.values(search)
            //           if(capacity == 30){
            //             if(exist.find(x => x <= capacity || x == null)){
            //                 searchData.push(search)
            //             }
            //           }
            //           else if(capacity == 40){
            //              if(exist.find(x => x >= capacity && capacity < 50)){
            //                 searchData.push(search)
            //             }
            //           }
            //           else{
            //              if(exist.find(x => x >= capacity)){
            //                 searchData.push(search)
            //             }
            //           }
            //       }
            //     }
            // }
            this.items = searchData
        },
    watch: {
        "selectedRoom": function() {
            if(this.selectedRoom == null){
                this.$emit('passTwo',null)
            }
            else{
                this.$emit('passTwo',this.selectedRoom)
            }
        }
    },
    computed: {
        field() {
            var fields = []
            fields.push(
                {
                    key: "roomCode",
                    label: "Código da Sala",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "roomType",
                    label: "Tipo da Sala",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "capacity",
                    label: "Capacidade da Sala",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "start",
                    label: "Inicio do Evento",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "end",
                    label: "Final do Evento",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "actions",
                    label: "Ações",
                    sortDirection: "asc"
                },
            )
            return fields
        }
    }
}
</script>
