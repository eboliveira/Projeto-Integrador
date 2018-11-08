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
                  <b-btn variant="primary" style="margin-left: 10px;" v-on:click="cleanCalendar" v-b-tooltip.hover id="Refresh1"><i class="nc-icon nc-refresh-02"></i></b-btn>
                  <b-btn variant="info" style="width: 48px; height: 39px; margin-left: 10px;" v-on:click="info=true, editable = false"><v-icon style="position: center">mdi-information-variant</v-icon></b-btn>
                  <b-tooltip target="Refresh1" title="Refresh" placement="bottom"></b-tooltip>
              </v-layout>
                <card style="padding: 15px;">
                  <h4 slot="header" class="card-title">Selecionar Salas</h4>
					        <b-row>
                    <b-col md="3">
                      <b-form-select v-model="selectedBlock" :options="bloco" slot="block">
                        <option slot="bloco" :value="null">Bloco</option>
                        </b-form-select>
                    </b-col>
                    <b-col md="3">
                      <b-form-select v-model="selectedroomType" :options="tipoSala" slot="roomType"/>
                    </b-col>
                    <b-col md="4">
                      <b-form-select v-model="selectedroom" :options="sala" slot="roomCode"/>
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
                   	<b-table show-empty striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" @filtered="onFiltered" :sort-by.sync="sortBy">
                       <template slot="bloco" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="tipo_Sala" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="codigo_Sala" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                          <b-form-checkbox @click.native.stop v-model="row.detailsShowing"></b-form-checkbox>
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
import {freeRooms} from '../../services/GetsServices.js'
import * as utils from '../../services/utils.js'
import moment from "moment";


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
          slotDuration: '00:10:00',
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
      selectedBlock: null,
      selectedroomType: null,
      selectedroom: null,
      bloco: [
        { value: null, text: "Bloco", disabled: true },
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
        { value: "D", text: "D" },
        { value: "E", text: "E" },
        { value: "F", text: "F" },
        { value: "G", text: "G" },
        { value: "H", text: "H" }
      ],
      tipoSala: [
        { value: null, text: "Tipo da Sala", disabled: true },
        { value: "Laboratório", text: "Laboratório" },
        { value: "Teórica", text: "Teórica" },
        { value: "Desenho", text: "Desenho" }
      ],
      sala: [
        { value: null, text: 'Código da Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ]
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
    refreshTable() {
      this.items = this.refresh
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
            this.items.push(searchRoom)
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
      this.refresh = this.items
      this.dialog = false
    },
    onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
    },
    filterTable() {
      console.log('oi')
      var bloco = this.selectedBlock
      var tipo_Sala = this.selectedroomType
      var codigo_Sala = this.selectedroom
      //  console.log(Object.values(this.items[0]))
        var searchData = []
        if(bloco){
            if(searchData != null){
              for(var search of this.items){
                  var exist = Object.values(search)
                  if(exist.find(x => x == bloco)){
                      searchData.push(search)
                  }
              }
            }
        }
        if(tipo_Sala){
            if(searchData != null){
              for(var search of this.items){
                  var exist = Object.values(search)
                  if(exist.find(x => x == tipo_Sala)){
                      searchData.push(search)
                  }
              }
            }
            else{
              var searchDatat = []
              for(var search of searchDatat){
                  var exist = Object.values(search)
                  if(exist.find(x => x == tipo_Sala)){
                      searchDatat.push(search)
                  }
              }
              searchData = searchDatat
            }
        }
        if(codigo_sala){
            if(searchData != null){
              for(var search of this.items){
                  var exist = Object.values(search)
                  if(exist.find(x => x == codigo_sala)){
                      searchData.push(search)
                  }
              }
            }
            else{
              var searchDatat = []
              for(var search of searchDatat){
                  var exist = Object.values(search)
                  if(exist.find(x => x == codigo_sala)){
                      searchDatat.push(search)
                  }
              }
              searchData = searchDatat
            }
        }
        console.log(searchData)
        this.items = searchData
      }
  },
  computed: {
    fields() {
      var fields = []
      fields.push(
          {
              key: "bloco",
              label: "Bloco",
              sortable: true,
              sortDirection: "asc"
          },
          {
              key: "tipo_Sala",
              label: "Tipo da Sala",
              sortable: true,
              sortDirection: "asc"
          },
          {
              key: "codigo_sala",
              label: "Código da Sala",
              sortable: true,
              sortDirection: "asc"
          },
        )
        return fields
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
    
  }
};
</script>
