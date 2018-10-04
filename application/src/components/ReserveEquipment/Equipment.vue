<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Equipamentos
                        <b-btn class="float-right" variant="success">Cadastrar</b-btn>
                    </h4>
                    <b-container fluid>
                        <b-row>
                            <b-table striped hover stacked="md" :items="items" :fields="fields">
                                <template slot="settings" slot-scope="row">
                                    <button type="button" class="btn-simple btn btn-xs btn-warning">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn-simple btn btn-xs btn-danger" style="margin-left: 5px;">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </template>
                            </b-table>
                        </b-row>
                    </b-container>
                </card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Card from 'src/components/UIComponents/Cards/Card.vue'
    import {allEquipments} from 'src/services/GetsServices.js'


    export default {
        components: {
            Card
        },
        data() {
            return {
                fields: [
                    {key: 'codigo',           label: 'Patrimônio',       sortable: true, sortDirection: 'asc'},
                    {key: 'tipo_equipamento', label: 'Tipo Equipamento', sortable: true, sortDirection: 'asc'},
                    {key: 'marca',            label: 'Marca',            sortable: true, sortDirection: 'asc'},
                    {key: 'modelo',           label: 'Modelo',           sortable: true, sortDirection: 'asc'},
                    {key: 'settings',         label: 'Ações',            sortable: false, 'class': 'text-center'},
                ],
                items : [],
            }
        },
        methods: {
            
        },
        mounted(){
            allEquipments().then(res =>{
                this.items = []
                res.forEach(element => {
                    this.items.push({ codigo: element.patrimonio, tipo_equipamento: element.nome, marca: element.marca, modelo: element.modelo, quantidade_total: element.quantidade_total})
                });
            })
        }
    }
</script>