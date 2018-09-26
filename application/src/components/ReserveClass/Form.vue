<template>
    <div class="content">
      <form>
         <v-btn icon="false" 
               class="back" 
               to="/admin/overview">
          <font-awesome-icon icon="chevron-left"/>
         </v-btn>
        <v-stepper v-model="nstep">
            <v-stepper-header>
                <v-stepper-step :complete="nstep > 1" step="1">Selecionar Horários Livres</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="nstep > 2" step="2">Registrar Responsável </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Confirmação</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <step-one></step-one>
                </v-stepper-content>
                 <v-stepper-content step="2">
                    <step-two></step-two>
                </v-stepper-content>
                 <v-stepper-content step="3">
                    <step-three></step-three>
                </v-stepper-content>
            </v-stepper-items>
            <v-layout row justify-center>
                 <v-dialog v-model="dialog" persistent max-width="400">
                    <v-btn slot="activator" color="deep-orange darken-2" >
                                Cancelar
                    </v-btn>
                     <v-card>
                        <v-card-title class="headline">Deseja Cancelar a Reserva de Horarios?</v-card-title>
                            <v-card-text>As informações preenchidas no cadastro até o momento serão perdidas caso deseja sair!</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                        <v-btn color="green darken-1" flat @click.native="dialog = false" to="/admin/overview">Confimar</v-btn>
                        </v-card-actions>
                    </v-card>
                     </v-dialog>
                       <v-btn v-if="nstep > '1'" color="blue-grey lighten-3" 
                        @click="nstep --">
                            Voltar
                    </v-btn>
                    <v-btn v-if="nstep < '3'" color="green lighten-1" 
                        @click="nstep ++">
                        Proximo
                    </v-btn>
                    <v-btn v-if="nstep == '3'" color="green lighten-1" 
                        >
                        Confirmar
                    </v-btn>
            </v-layout>
        </v-stepper>
      </form>
    </div>
</template>

<script>
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'

export default {
    components: {
      StepOne,
      StepTwo,
      StepThree
    },
    data () {
      return {
        nstep: 0,
        dialog: false,
        cancel: false
      }
    }
}

</script>

<style>

.back {
  position: relative;
  top: -15px;
  color: #bdbdbd;
}

.center {
    margin : 0 auto;
    width: 100%;
    text-align: center;
    display: flex;
}

.prox {
    right: 0;
}
</style>
