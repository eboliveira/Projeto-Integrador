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
								<b-button variant="primary" @click="filter=''">Limpar</b-button>
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
	import axios from 'axios';
	methods: {
	}
	
	let items = [];
	for (var i = 0; i < 100; i++) {
		const room = "room" + i;
		const data = moment()
			.add(i, "day")
			.utc()
			.format();
		items.push({ room: room, date: data });
	}
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
				isDesc: true,
				sortBy: "date"
			};
		}
	};
</script>
