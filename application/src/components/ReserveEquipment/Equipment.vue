<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Equipamentos
                        <b-btn class="float-right" v-on:click="toggleCadastro()" variant="primary">Cadastrar</b-btn>
                    </h4>
                    <b-collapse id="cadastroEquipamento" accordion="collapse" role="tabpanel">
                        <b-form inline v-on:submit.prevent="onSubmit">
                            <b-input type="number" class="mr-sm-2 mb-sm-0" id="patrimonio" placeholder="Patrimônio" v-model="equipment.patrimonio" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="tipoEquipamento" placeholder="Tipo Equipamento" v-model="equipment.nome" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="marca" placeholder="Marca" v-model="equipment.marca" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="modelo" placeholder="Modelo" v-model="equipment.modelo" required/>
                            <b-button type="submit" variant="success">Save</b-button>
                        </b-form>
                    </b-collapse>
                    <b-container fluid>
                        <b-row>
                            <b-table striped hover stacked="md" :items="items" :fields="fields">
                                <template slot="settings" slot-scope="row">
                                    <button type="button" class="btn-simple btn btn-xs btn-warning" v-on:click="onEdit(row.item)">
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
    import * as equipments from '../../services/equipmentsQuery.js'

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

                equipment: {
                    patrimonio: '',
                    nome: '',
                    marca: '',
                    modelo: '',
                },

                equipFormToggled : true
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                equipments.set({"equipment":this.equipment}).then(res =>{
                    this.getAllEquipments()
                    this.onReset();
                })
            },
            onReset () {
                this.equipment.patrimonio = '';
                this.equipment.nome = '';
                this.equipment.marca = '';
                this.equipment.modelo = '';
            },
            onEdit(item){
                if (this.equipFormToggled) {
                    this.toggleCadastro()
                }
                this.equipment.patrimonio = item.codigo;
                this.equipment.nome = item.tipo_equipamento;
                this.equipment.marca = item.marca;
                this.equipment.modelo = item.modelo;
            },
            toggleCadastro(){
                this.$root.$emit('bv::toggle::collapse', 'cadastroEquipamento')
                this.equipFormToggled = !this.equipFormToggled
            },
            getAllEquipments(){
                equipments.all().then(res =>{
                    this.items = []
                    res.forEach(element => {
                        this.items.push({ codigo: element.patrimonio, tipo_equipamento: element.nome, marca: element.marca, modelo: element.modelo})
                    });
                })
            }
        },
        mounted(){
           this.getAllEquipments()
        }
    }
</script>