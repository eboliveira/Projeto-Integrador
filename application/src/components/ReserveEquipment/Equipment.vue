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
                            <button type="submit" class="btn-simple btn btn-ms btn-success">Salvar</button>
                        </b-form>
                    </b-collapse>
                    <b-container fluid>
                        <b-row>
                            <b-table striped hover stacked="md" :items="items" :fields="fields">
                                <template slot="settings" slot-scope="row">
                                    <button type="button" class="btn-simple btn btn-sm btn-warning" v-on:click="onEdit(row.item)">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button type="button" class="btn-simple btn btn-sm btn-danger" style="margin-left: 5px;" v-on:click = "modal = true; selected = row.item">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </template>
                            </b-table>
                        </b-row>
                    </b-container>
                    <v-layout justify-center style="margin-bottom: 10px;">
                        <v-dialog v-model="modal" persistent>
                            <v-card>
                                <v-card-title class="headline">Deseja remover o equipamento?</v-card-title>
                                <v-card-text>As informações do equipamento serão apagadas!</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat v-on:click.native="modal=false">Cancelar</v-btn>
                                    <v-btn color="green darken-1" flat v-on:click.native="deleteEquipment()">Confimar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-layout>
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
                selected : {},
                modal:false,
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
                this.onReset();
            },
            getAllEquipments(){
                equipments.all().then(res =>{
                    this.items = []
                    res.forEach(element => {
                        this.items.push({ codigo: element.patrimonio, tipo_equipamento: element.nome, marca: element.marca, modelo: element.modelo})
                    });
                })
            },
            deleteEquipment(){
                equipments.remove(this.selected).then(res =>{
                })
                var i = this.findItem(this.selected)
                this.items.splice(i,1)
                this.modal = false
            },
            findItem(item){
                var i;
                for (i=0; i<this.items.length; i++){
                    if(this.items[i].codigo == item.codigo){
                        return i;
                    }
                }
                return false;
            }
        },
        mounted(){
           this.getAllEquipments()
        }
    }
</script>