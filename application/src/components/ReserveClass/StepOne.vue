<template>
    <div class="container-fluid" style="padding-left: 0px; padding-right: 0px;">
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">Selecionando Horário de Evento</v-card-title>
              <v-card-text>Tem certeza que deseja selecionar esse horário para o evento?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click.native="dialog = false">Cancelar</v-btn>
                <v-btn color="green lighten-1" @click.native="select">Confirmar</v-btn>
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
        <div class="row" style="margin-left: 0px; margin-right: 0px;">
              <h4 slot="header" class="card-title">Reservar Horários</h4>
            <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" :config="config"></full-calendar>
        <div class="col">
            <div class="row" style="margin-top: 20px">
                <div class="col">
                    <v-layout justify-center>
                      <b-btn variant="success" style="margin-left: 10px;">Procurar Salas<i class="fa fa-search"></i></b-btn>
                       <b-btn variant="primary" style="margin-left: 10px;" v-on:click="cleanCalendar"><i class="nc-icon nc-refresh-02"></i></b-btn>
                       <b-btn variant="info" style="width: 48px; height: 39px; margin-left: 10px;" v-on:click="info=true, editable = false"><v-icon style="position: center">mdi-information-variant</v-icon></b-btn>
                    </v-layout>
              </div>
            </div>
        </div>   
        </div>
             <div class="row table">
              <div class="col-12">
                <card>
                  <div class="container-fluid">
                    <div class="row table-head">
                      <div class="col-3">
                        <b-form-select v-model="selected_down" :options="bloco"/>
                      </div>
                      <div class="col-3">
                        <b-form-select v-model="selected_down" :options="tipoSala"/>
                      </div>
                      <div class="col-5" style="margin-right: 15px;">
                        <b-form-select v-model="selected_down" :options="sala"/>
                      </div>
                        <button class="btn btn-primary font-icon-detail">
                          <i class="nc-icon nc-refresh-02"></i>
                        </button>
                    </div>
                    <b-table striped hover :items="items">
                      <b-form-checkbox></b-form-checkbox>
                    </b-table>
                  </div>
                </card>
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
import moment from "moment";


const items = [
  { bloco: 'H', tipo_Sala: 'Teórica', codigo_sala: 'H102'},
  { bloco: 'B', tipo_Sala: 'Teórica', codigo_sala: 'B005' },
  { bloco: 'E', tipo_Sala: 'Lab. Informática', codigo_sala: 'E105' },
  { bloco: 'C', tipo_Sala: 'Lab. Alimentos', codigo_sala: 'C001' }
]

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
      config: {
          eventClick: event => {
            $('#calendar').fullCalendar('removeEvents',[event._id]);
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
      items: items,
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
    renderEvent(dataEnv, stick){
      stick = true;
    },
    cleanCalendar(){
      $('#calendar').fullCalendar('removeEvents');
    }
  }
};

</script>
