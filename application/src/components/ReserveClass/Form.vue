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
                                <v-btn color="blue-grey lighten-3"
                                       to="/admin/overview">
                                    Cancelar
                                </v-btn>
                                <v-btn color="green lighten-1" 
                                    @click="nstep = 2">
                                Proximo
                                </v-btn>
                </v-stepper-content>
                 <v-stepper-content step="2">
                    <step-two></step-two>
                        <v-btn color="deep-orange darken-2" 
                               to="/admin/overview">
                               Cancelar
                        </v-btn>
                        <v-btn color="blue-grey lighten-3" 
                               @click="nstep = 1">
                               Voltar
                        </v-btn>
                        <v-btn color="green lighten-1" 
                               @click="nstep = 3">
                               Proximo
                        </v-btn>
                </v-stepper-content>
                 <v-stepper-content step="3">
                    <step-three></step-three>
                        <v-btn color="deep-orange darken-2" 
                               to="/admin/overview">
                               Cancelar
                        </v-btn>
                        <v-btn color="blue-grey lighten-3" 
                               @click="nstep = 2">
                               Voltar
                        </v-btn>
                        <v-btn color="light-blue darken-1" 
                               >
                               Concluir
                        </v-btn>
                </v-stepper-content>
            </v-stepper-items>
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
        nstep: 0
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
