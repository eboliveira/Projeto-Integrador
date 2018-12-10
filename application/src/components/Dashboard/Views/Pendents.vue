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
          </div>
        </card>
      </b-col>
    </b-row>
    <b-modal header-bg-variant="primary" header-text-variant="light" id="modalInfo" ok-title="Fechar" ok-only v:title="modal_room">
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b>Descrição:</b>
            {{this.modal_description}}
          </b-col>
          <b-col md="12">
            <b>Sala:</b>
            {{this.modal_room}}
          </b-col>
          <b-col md="12">
            <b>Data inicial:</b>
            {{this.modal_startDate}}
          </b-col>
          <b-col md="12">
            <b>Data final:</b>
            {{this.modal_finalDate}}
          </b-col>
          <b-col md="12">
            <b>Hora de início:</b>
            {{this.modal_startHour}}
          </b-col>
          <b-col md="12">
            <b>Hora de fim:</b>
            {{this.modal_finalHour}}
          </b-col>
          <b-col md="12">
            <b>Responsável:</b>
            {{this.modal_responsable}}
          </b-col>
          <b-col md="12">
            <b>Estado:</b>
            {{this.modal_status}}
          </b-col>
          <b-col md="12">
            <b>Repetição:</b>
            {{this.modal_repeat}}
          </b-col>
          <b-col md="12">
            <b>Data da requisição:</b>
            {{this.modal_timestamp}}
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <b-modal header-bg-variant="danger" header-text-variant="light" ok-title="Fechar" @click="show=true" id="modalReason" title="Rejeitar reserva" @ok="handleRefuse(refuseReason)" :ok-disabled="isReasonEmpty()">
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-textarea rows="4" placeholder="Digite o motivo pelo qual está rejeitando" v-model="refuseReason"></b-textarea>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="md" class="float-right" variant="danger" @click="show=false">Cancelar</b-btn>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
    import Card from 'src/components/UIComponents/Cards/Card.vue'
    import moment from "moment"
    import {byStatus} from './../../../services/eventQuerys'
    import {changeStatus} from './../../../services/eventsRequests'
    export default {
        components: {
            Card
        },
        methods:{
            showModal(item ,button){
                this.allItems.forEach(iterator => {
                    if(item.room==iterator.room){
                        this.modal_title       = iterator.title,
                        this.modal_description = iterator.description,
                        this.modal_room        = iterator.room,
                        this.modal_startDate   = moment(iterator.startDate).format("DD/MM/YYYY"),
                        this.modal_finalDate   = moment(iterator.finalDate).format("DD/MM/YYYY"),
                        this.modal_startHour   = moment(iterator.startDate).format("HH:mm")
                        this.modal_finalHour   = moment(iterator.finalDate).format("HH:mm")
                        this.modal_responsable = iterator.responsable,
                        this.formatStatus(iterator.status),
                        this.formatRepeat(iterator.repeat),
                        this.modal_timestamp   = moment(iterator.timestamp).format("DD/MM/YYYY-HH:mm")
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
            },
        
            sendEmailRefuse(refuseReason, item){
                console.log(refuseReason)
            },
            isReasonEmpty(){
                if(this.refuseReason == ''){
                    return true
                }
                return false
            },
            formatStatus(stat){
                this.modal_status = "Esperando aprovação"
            },
            formatRepeat(repeat){
                if(repeat == "daily"){
                    this.modal_repeat = "Diariamente"
                }
                else if(repeat == "monthly"){
                    this.modal_repeat = "Mensalmente"
                }
                else if(repeat == "weekly"){
                    this.modal_repeat = "Semanalmente"
                }
                else{
                    this.modal_repeat = "Sem repetição"
                }
            }
        },
        created:function(){
            byStatus('undefined').then(res =>{
                res.forEach(item =>{
                    const room = item['room']
                    const responsable = item['responsable']
                    let formattedDate = item['timestamp']
                    formattedDate = moment(formattedDate).add(3,'h').format('DD/MM/YYYY-HH:mm')
                    const id = item['_id']
                    this.items.push({ room: room, responsable: responsable, date:formattedDate, id:id });
                    this.allItems.push(item)
                })
            })
        },
        data() {
            return {
                show: false,
                allItems:[],
                clickedItem:{},
                filter: "",
                refuseReason:"",
                modal_room:"",
                modal_title:"",
                modal_description:"",
                modal_startDate:"",
                modal_finalDate:"",
                modal_finalHour:"",
                modal_startHour:"",
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
    }
</script>
