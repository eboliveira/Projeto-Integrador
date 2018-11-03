<template>
	<b-container fluid>
        <b-row>
            <b-col md="12">
				<card style="padding: 15px;">
					<h4 slot="header" class="card-title">Reservar Horários</h4>
					<full-calendar ref="calendar" :events="events" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
				</card>
				<card style="padding: 15px;">
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
							<button class="btn btn-success font-icon-detail">
								<i class="nc-icon nc-refresh-02"></i>
							</button>
						</b-col>
					</b-row>
					<b-table striped hover :items="items">
						<b-form-checkbox></b-form-checkbox>
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
      selected: null,
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
  methods: {}
};

</script>
