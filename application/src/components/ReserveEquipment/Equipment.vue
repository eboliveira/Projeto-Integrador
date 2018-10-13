<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Equipamentos
                        <b-btn class="float-right" v-b-toggle.cadastroEquipamento href="#" variant="primary">Cadastrar</b-btn>
                    </h4>
                    <b-collapse id="cadastroEquipamento" accordion="collapse" role="tabpanel">
                        <b-form inline @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-input class="mr-sm-2 mb-sm-0" id="patrimonio" placeholder="Patrimônio" v-model="form.patrimonio" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="tipoEquipamento" placeholder="Tipo Equipamento" v-model="form.tipoEquipamento" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="marca" placeholder="Marca" v-model="form.marca" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="modelo" placeholder="Modelo" v-model="form.modelo" required/>
                            <b-button type="submit" variant="success">Save</b-button>
                        </b-form>
                    </b-collapse>
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

                form: {
                    patrimonio: '',
                    tipoEquipamento: '',
                    marca: '',
                    modelo: '',
                },

                show: true
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onReset (evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.patrimonio = '';
                this.form.tipoEquipamento = '';
                this.form.marca = '';
                this.form.modelo = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => { this.show = true });
            }
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