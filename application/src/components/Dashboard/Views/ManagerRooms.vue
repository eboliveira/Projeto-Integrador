<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Salas
                        <b-btn class="float-right" v-on:click="toggleCadastro()" variant="primary">Cadastrar</b-btn>
                    </h4>
                    <b-collapse id="cadastroEquipamento" accordion="collapse" role="tabpanel">
                        <b-form inline v-on:submit.prevent="onSubmit">
                            <b-input class="mr-sm-2 mb-sm-0" id="_id" placeholder="Código da sala" v-model="room._id" required/>
                            <b-input class="mr-sm-2 mb-sm-0" id="capacity" placeholder="Capacidade" v-model="room.capacity" required/>
                            <b-form-select v-model="room.type_room">
                                <option value="Teórica">
                                    Teórica
                                </option>
                                <option value="Laboratório">
                                    Laboratório
                                </option>
                                <option value="Desenho">
                                    Desenho
                                </option>
                            </b-form-select>
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
                                    <button type="button" class="btn-simple btn btn-sm btn-danger" style="margin-left: 5px;" v-on:click="modal = true; selected=row.item" >
                                        <i class="fa fa-times"></i>
                                    </button>
                                </template>
                            </b-table>
                        </b-row>
                    </b-container>

                    <v-layout justify-center style="margin-bottom: 10px;">
                        <v-dialog v-model="modal" persistent>
                            <v-card>
                                <v-card-title class="headline">Deseja remover a sala?</v-card-title>
                                <v-card-text>As informações da sala serão apagadas!</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat v-on:click.native="modal=false">Cancelar</v-btn>
                                    <v-btn color="green darken-1" flat v-on:click.native="deleteRoom()">Confimar</v-btn>
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
    import * as rooms from '../../../services/roomQuerys'

    export default {
        components: {
            Card
        },
        data() {
            return {
                fields: [
                    {key: '_id',              label: 'Código da sala',   sortable: true, sortDirection: 'asc'},
                    {key: 'capacity',         label: 'Capacidade',       sortable: true, sortDirection: 'asc'},
                    {key: 'type_room',        label: 'Tipo de sala',     sortable: true, sortDirection: 'asc'},
                    {key: 'settings',         label: 'Ações',            sortable: false, 'class': 'text-center'},
                ],
                items : [],

                room: {
                    _id: '',
                    capacity: '',
                    type_room: ''
                },
                modal : false,
                equipFormToggled : true,
                selected : {}
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                rooms.set({"room":this.room}).then(res =>{
                    this.getAllRooms()
                    this.onReset();
                })
            },
            onReset () {
                this.room._id = '';
                this.room.capacity = '';
                this.room.type_room = '';
            },
            onEdit(item){
                if (this.equipFormToggled) {
                    this.toggleCadastro()
                }
                this.room._id = item._id;
                this.room.capacity = item.capacity;
                this.room.type_room = item.type_room;
            },
            toggleCadastro(){
                this.$root.$emit('bv::toggle::collapse', 'cadastroEquipamento')
                this.equipFormToggled = !this.equipFormToggled
                this.onReset()
            },
            getAllRooms(){
                rooms.all().then(res =>{
                    this.items = []
                    res.forEach(element => {
                        this.items.push({ _id: element._id, type_room: element.type_room, capacity: element.capacity})
                    });
                })
            },
            deleteRoom(){
                rooms.remove(this.selected).then(res =>{
                })
                var i = this.findItem(this.selected)
                this.items.splice(i,1)
                this.modal = false
            },
            findItem(item){
                var i;
                for (i=0; i<this.items.length; i++){
                    if(this.items[i]._id == item._id){
                        return i;
                    }
                }
                return false;
            }
        },
        created:function(){
           this.getAllRooms()
        }
    }
</script>
