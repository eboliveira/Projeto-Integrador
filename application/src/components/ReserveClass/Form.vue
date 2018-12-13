<template>
    <b-container fluid style="margin-top: 10px; margin-bottom: 10px">
        <b-row>
            <b-col md="12">
                <form>
                    <v-stepper v-model="nstep">
                        <v-stepper-header style="margin-bottom: 15px;">
                            <v-stepper-step :complete-icon="'fa fa-check'" :complete="nstep > 1" step="1">Selecionar Horários Livres</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete-icon="'fa fa-check'" :complete="nstep > 2" step="2">Registrar Responsável </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="3">Confirmação</v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                            <v-stepper-content step="1" style="padding: 0px;">
                                <step-one @passTwo="passStepTwo"></step-one>
                            </v-stepper-content>
                            <v-stepper-content step="2" style="padding: 0px;">
                                <step-two @passThree="passStepThree" :stepone="steptwo"></step-two>
                            </v-stepper-content>
                            <v-stepper-content step="3" style="padding: 0px;">
                                <step-three :result="finish" :room="steptwo"></step-three>
                            </v-stepper-content>
                        </v-stepper-items>
                        
                        <b-modal v-model="confirm" header-bg-variant="success" header-text-variant="light" title="Deseja Confirmar o Evento?" :no-close-on-backdrop="false" :hide-header-close="false">
                            <b-container fluid>
                                <b-row>
                                    <b-col md=10>
                                        <v-card-text rows="1"><h4 class="text">As informações preenchidas serão registradas!</h4></v-card-text>
                                    </b-col>
                                </b-row>
                            </b-container>
                            <div slot="modal-footer" class="w-100">
                                <b-btn class="float-right" variant="danger" @click="confirm=false">Cancelar</b-btn>
                                <b-btn style="margin-right: 10px" class="float-right" variant="success" @click="sendEvent" to="/admin/overview">Confirmar</b-btn>
                            </div>
                        </b-modal>

                        <v-layout justify-center style="margin-bottom: 10px;">
                            <v-dialog v-model="confirm" persistent>
                                <v-card>
                                    <v-card-title class="headline">Deseja Confirmar o Evento?</v-card-title>
                                    <v-card-text>As informações preenchidas serão registradas!</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat v-on:click.native="dialog = false">Cancelar</v-btn>
                                        <v-btn color="green darken-1" flat v-on:click.native="sendEvent">Confimar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>

                        <v-layout justify-center style="margin-bottom: 10px;">
                            <v-dialog v-model="dialog" persistent>
                                <v-card>
                                    <v-card-title class="headline">Deseja Cancelar a Reserva de Horarios?</v-card-title>
                                    <v-card-text>As informações preenchidas no cadastro até o momento serão perdidas caso deseja sair!</v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat v-on:click.native="dialog = false">Cancelar</v-btn>
                                        <v-btn color="green darken-1" flat v-on:click.native="dialog = false" to="/admin/overview">Confimar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-layout>

                        <b-modal v-model="dialog" header-bg-variant="danger" header-text-variant="light" title="Deseja Cancelar a Reserva de Horarios?" :no-close-on-backdrop="false" :hide-header-close="false">
                            <b-container fluid>
                                <b-row>
                                    <b-col md=12>
                                        <v-card-text rows="2"><h4 class="text">As informações preenchidas no cadastro até o momento serão perdidas caso deseja sair!</h4></v-card-text>
                                    </b-col>
                                </b-row>
                            </b-container>
                            <div slot="modal-footer" class="w-100">
                                <b-btn class="float-right" variant="danger" @click="dialog=false">Cancelar</b-btn>
                                <b-btn style="margin-right: 10px" class="float-right" variant="success" @click="dialog=false" to="/admin/overview">Confirmar</b-btn>
                            </div>
                        </b-modal>
                        
                        <b-container fluid style="margin-bottom: 10px">
                            <b-row>
                                <b-col md="3">
                                    <b-btn v-if="nstep > '1'" variant="warning" v-on:click="nstep --">Voltar</b-btn>
                                </b-col>
                                <b-col md="6">
                                    <v-layout justify-center>
                                        <b-btn :disabled = disabled v-if="nstep < '3'" variant="primary" v-on:click="nstep ++" name="positive">Proximo</b-btn>
                                        <b-btn v-if="nstep == '3'" variant="success" v-on:click="confirm = true" >Confirmar</b-btn>
                                    </v-layout>
                                </b-col>
                                <b-col md="3">
                                    <b-btn slot="activator" class="float-right" variant="danger" v-on:click="dialog = true">Cancelar</b-btn>
                                </b-col>
                            </b-row>
                        </b-container>
                    </v-stepper>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
    .btn:disabled, .btn[disabled], .btn.disabled{
        background-color: #c9d0ff;
        color: black;
    }
</style>

<script>
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import { rooms } from '../../services/Api';
import {postEvent} from '../../services/PostsService.js'

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree
  },
  data() {
    return {
      nstep: 0,
      dialog: false,
      confirm: false,
      cancel: false,
      isValid:false,
      steptwo: null,
      finish: null,
      disabled: true,
      header : false,
    };
  },
  methods:{
      passStepTwo(payload){
          this.steptwo = payload
      },
      passStepThree(payload){
          this.finish = payload
      },
        // finish(){
        //     $.notify({
        //         icon:"nc-check-2",
        //         message: "Cadastro Finalizado!"
        //     },{
        //         type: type["info"],
        //         timer: 4000,
        //         placement: {
        //             from: "top",
        //             align: "center"
        //         }
        //     }
        //     )
        // },
      sendEvent(){
          for(var events of this.steptwo){
              var event = {
                  "title": this.finish.title,
                  "uid": "standard",
                  "description": this.finish.description,
                  "room": events.roomCode,
                  "startDate": events.isoStart,
                  "finalDate": events.isoEnd,
                  "responsable": this.finish.responsable,
                  "repeat": this.finish.repeat,
                  "status":"pendent"
              }
              postEvent(event)
      }
      finish()
        this.confirm = false
      },
  },
  watch: {
    "nstep": function() {
        this.disabled = true

    },
    "steptwo": function(){
        if(this.steptwo){
             this.disabled = false
        }
    },
    "finish": function(){
        if(this.finish){
             this.disabled = false
        }
    }
  }
};
</script>
