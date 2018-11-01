<template>
    <b-container fluid>
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
                                <step-one></step-one>
                            </v-stepper-content>
                            <v-stepper-content step="2" style="padding: 0px;">
                                <step-two></step-two>
                            </v-stepper-content>
                            <v-stepper-content step="3" style="padding: 0px;">
                                <step-three></step-three>
                            </v-stepper-content>
                        </v-stepper-items>
                        
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
                        
                        <b-container fluid>
                            <b-row>
                                <b-col md="3">
                                    <b-btn v-if="nstep > '1'" variant="warning" v-on:click="nstep --">Voltar</b-btn>
                                </b-col>
                                <b-col md="6">
                                    <v-layout justify-center>
                                        <b-btn v-if="nstep < '3'" variant="primary" v-on:click="nstep ++">Proximo</b-btn>
                                        <b-btn v-if="nstep == '3'" variant="success" >Confirmar</b-btn>
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

<script>
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

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
      cancel: false,
      isValid:false
    };
  }
};
</script>
