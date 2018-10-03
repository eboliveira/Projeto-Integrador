<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Equipamentos
                        <b-btn class="float-right" variant="success">Cadastrar</b-btn>
                    </h4>
                    <div class="container-fluid">
                        <div class="row">
                            <v-layout justify-center>
                                <b-table striped hover stacked="md" :items="items" :fields="fields">
                                    <template slot="settings" slot-scope="row">
                                        <v-layout justify-center>
                                            <button type="button" class="btn-simple btn btn-xs btn-warning">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" class="btn-simple btn btn-xs btn-danger" style="margin-left: 5px;">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </v-layout>
                                    </template>
                                </b-table>
                            </v-layout>
                        </div>
                    </div>
                </card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Card from 'src/components/UIComponents/Cards/Card.vue'
    import {findEquipments} from 'src/services/GetsServices.js'

    const items = []

    export default {
        components: {
            Card
        },
        data() {
            return {
                fields: [
                    {key: 'codigo', label: 'Código', sortable: true, sortDirection: 'asc'},
                    {key: 'tipo_equipamento', label: 'Tipo Equipamento', sortable: true, sortDirection: 'asc'},
                    {key: 'marca', label: 'Marca', sortable: true, sortDirection: 'asc'},
                    {key: 'modelo', label: 'Modelo', sortable: true, sortDirection: 'asc'},
                    {key: 'quantidade_total', label: 'Quantidade Total', sortable: false, 'class': 'text-center' },
                    {key: 'quantidade_disponivel', label: 'Quantidade Disponível', sortable: false, 'class': 'text-center' },
                    {key: 'settings', label: 'Ações', sortable: false, 'class': 'text-center' },
                ],
                items: items,
            }
        },
        methods: {

        },
        mounted(){
            findEquipments().then(res =>{
                res.forEach(element => {
                    items.push({ codigo: element.patrimonio, tipo_equipamento: element.nome, marca: element.marca, modelo: element.modelo, quantidade_total: element.quantidade_total, quantidade_disponivel: element.quantidade_disponivel})
                });
            })
        }
    }
</script>