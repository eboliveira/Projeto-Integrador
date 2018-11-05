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
                                <button type="button" class="btn-simple btn btn-sm btn-success" v-on:click.stop="handleAcept(row.item)" v-b-tooltip.hover title="Aprovar reserva">
                                    <i class="fa fa-check"></i>
                                </button>
                                <button type="button" class="btn-simple btn btn-sm btn-danger" v-on:click.stop="showModalReason(row.item)" v-b-tooltip.hover title="Rejeitar reserva">
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
                        <b-modal id="modalReason" cancel-variant="danger" cancel-title="Cancelar" title="Rejeitar reserva" @ok="handleRefuse(refuseReason)" :ok-disabled="isReasonEmpty()">
                            <b-textarea rows=3 placeholder='Digite o motivo pelo qual está rejeitando' v-model='refuseReason'></b-textarea>
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
import {byStatus} from './../../../services/eventQuerys';
import {changeStatus} from './../../../services/eventsRequests'
export default {
    components: {
        Card
    },

    methods:{
        showModal(item ,button){
            this.allItems.forEach(iterator => {
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
        handleAcept(item){
            this.handleChangeStatus(item, 'confirmed');
            this.sendEmailConfirm(item)
        },
        handleRefuse(reason){
            this.handleChangeStatus(this.clickedItem, 'refused')
            this.sendEmailRefuse(reason)
        },
        handleChangeStatus(item, status){
            const i = this.findItem(item);
            this.items.splice(i,1)
            changeStatus(item.id, status)
        },
        showModalReason(item){
            this.$root.$emit('bv::show::modal','modalReason')
            this.clickedItem = item
            this.refuseReason=''
        },
        findItem(item){
            var i;
            for (i=0; i<this.items.length; i++){
                if(this.items[i].id == item.id){
                    return i;
                }
            }
            return false;
        },
        sendEmailConfirm(item){
            console.log(item)
        },
        sendEmailRefuse(refuseReason, item){
            console.log(refuseReason)
        },
        isReasonEmpty(){
            if(this.refuseReason == ''){
                return true
            }
            return false
        }
    },
    created:function(){

        byStatus('undefined').then(res =>{
            res.forEach(item =>{
                const room = item['room']
                const responsable = item['responsable']
                let formattedDate = item['timestamp']
                formattedDate = moment(formattedDate).add(3,'h').format('DD/MM/YYYY-HH:mm:ss')
                const id = item['_id']
                this.items.push({ room: room, responsable: responsable, date:formattedDate, id:id });
                this.allItems.push(item)
            })
        })
    },
    data() {
        return {
            allItems:[],
            clickedItem:{},
            filter: "",
            refuseReason:"",
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
            items: [],
            perPage: 10,
            isDesc: false,
            sortBy: "date"
        };
    }
};
</script>
