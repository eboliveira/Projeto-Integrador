<template>
    <div class="content">
      <form>
         <v-btn icon="false" 
               class="back" 
               to="/admin/calendar">
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
                        <div class="row">
                            <div class="col-md-6">
                                <v-btn color="blue-grey darken-1">
                                    Cancelar
                                </v-btn>
                            </div>
                            <div class="col-md-6 prox">
                                <v-btn color="green lighten-1" 
                                    @click="nstep = 2">
                                Proximo
                                </v-btn>
                            </div>
                        </div>
                </v-stepper-content>
                 <v-stepper-content step="2">
                    <step-two></step-two>
                        <v-btn color="indigo darken-3" 
                               @click="nstep = 2">
                        Proximo
                    </v-btn>
                    <v-btn color="indigo darken-3" 
                               @click="nstep = 2">
                        Cancelar
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

      </form>
    </div>
</template>

<script>
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue'

export default {
    components: {
      StepOne,
      StepTwo
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
