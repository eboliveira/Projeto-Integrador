<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
              	<card style="padding: 15px;">
					<h4 slot="header" class="card-title">Reservas pendentes</h4>
					<div class="card-body">
						<b-input-group style="margin-bottom:15px;">
							<b-form-input placeholder="Digite o filtro da busca" v-model="filter"></b-form-input>
							<b-input-group-append>
								<b-button variant="primary" v-on:click="filter=''">Limpar</b-button>
							</b-input-group-append>
						</b-input-group>
						<b-table striped hover fixed responsive :filter="filter" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="isDesc">
							<template slot="options" slot-scope="row">
								<button type="button" class="btn-simple btn btn-sm btn-success" v-b-tooltip.hover title="Aprovar reserva">
									<i class="fa fa-check"></i>
								</button>
								<button type="button" class="btn-simple btn btn-sm btn-danger" v-b-tooltip.hover title="Rejeitar reserva">
									<i class="fa fa-times"></i>
								</button>
								<button type="button" class="btn-simple btn btn-sm btn-info" v-b-tooltip.hover title="Visualizar mais informações" v-on:click.stop="showModal(row.item, $event.target)">
									<i class="fa fa-eye"></i>
								</button>
							</template>
						</b-table>
            <b-modal ok-only header-bg-variant="primary" ok-title="Fechar" id="modalInfo" :title="modal_room">
              <div class="row">
                <label>Titulo: {{this.modal_title}}</label>
              </div>
              <div class="row">
                <label>Descrição: {{this.modal_description}}</label>
              </div>
              <div class="row">
                <label>Sala: {{this.modal_room}}</label>
              </div>
              <div class="row">
                <label>Data inicial: {{this.modal_startDate}}</label>
              </div>
              <div class="row">
                <label>Data final: {{this.modal_finalDate}}</label>
              </div>
              <div class="row">
                <label>Responsável: {{this.modal_responsable}}</label>
              </div>
              <div class="row">
                <label>Estado: {{this.modal_status}}</label>
              </div>
              <div class="row">
                <label>Repetição: {{this.modal_repeat}}</label>
              </div>
              <div class="row">
                <label>Data da requisição: {{this.modal_timestamp}}</label>
              </div>
            </b-modal>
					</div>
              	</card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
	import Card from 'src/components/UIComponents/Cards/Card.vue'
	import moment from "moment";
	import {pendents} from './../../../services/eventQuerys';
	methods: {
	}

	let items = [];
  let allItems=[];
	pendents().then(res =>{
    res.forEach(item =>{
      const room = item['room']
      const responsable = item['responsable']
      let formattedDate = item['timestamp']
      formattedDate = moment(formattedDate).format('DD/MM/YYYY-HH:mm:ss')
      items.push({ room: room, responsable: responsable, date:formattedDate });
      allItems.push(item)
    })
  })
	export default {
		components: {
            Card
        },
    methods:{
      showModal(item ,button){
        allItems.forEach(iterator => {
          if(item.room==iterator.room){
            this.modal_title = iterator.title,
            this.modal_description = iterator.description,
            this.modal_room = iterator.room,
            this.modal_startDate = iterator.startDate,
            this.modal_finalDate = iterator.finalDate,
            this.modal_responsable = iterator.responsable,
            this.modal_status = iterator.status,
            this.modal_repeat = iterator.repeat,
            this.modal_timestamp = iterator.timestamp
          }
        })
        this.$root.$emit('bv::show::modal','modalInfo', button)
      },
    },
		data() {
			return {
			filter: "",
      modal_room:"",
      modal_title:"",
      modal_description:"",
      modal_startDate:"",
      modal_finalDate:"",
      modal_responsable:"",
      modal_status:"",
      modal_repeat:"",
      modal_timestamp:"",
			fields: [
				{
					key: "room",
					label: "Sala",
					sortable: true
				},
				{
					key: "responsable",
					label: "Requisitante",
					sortable: true
				},
				{
					key: "date",
					label: "Data da requisição",
					sortable: true
				},
				{
					key: "options",
					label: "",
					class: "text-center"
				}
			],
				items: items,
				perPage: 10,
				isDesc: false,
				sortBy: "date"
			};
		}
	};
</script>
