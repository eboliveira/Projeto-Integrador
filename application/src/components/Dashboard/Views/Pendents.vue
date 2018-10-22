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
								<button type="button" class="btn-simple btn btn-sm btn-info" v-b-tooltip.hover title="Visualizar mais informações">
									<i class="fa fa-eye"></i>
								</button>
							</template>
						</b-table>
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
	pendents().then(res =>{
    res.forEach(item =>{
      const room = item['room']
      const responsable = item['responsable']
      let formattedDate = item['timestamp']
      formattedDate = moment(formattedDate).format('DD/MM/YYYY-HH:mm:ss')
      items.push({ room: room, responsable: responsable, date:formattedDate });
    })
  })
	export default {
		components: {
            Card
        },
		data() {
			return {
			filter: "",
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
					label: "Data",
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
