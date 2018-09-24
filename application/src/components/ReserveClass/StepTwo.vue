<template>
    <div class="row">
        <div class="col-md-6">
            <card>
                <h4 slot="header" 
                    class="card-title">Registrar Responsavel</h4>
                <div class="row">
                    <div class="col-md-6">
                        <fg-input type="text"
                                  label="Nome">
                        </fg-input>
                    </div>
                     <div class="col-md-6">
                        <label>Motivo</label>
                        <textarea class="form-control border-input">
                        </textarea>
                    </div>
                </div>
                <div>
                 <button type="submit" class="btn btn-info btn-fill btn-next" @click.prevent="updateProfile">
          Próximo
        </button>
            </div>
            </card>
        </div>
        <div class="col-md-6">
             <card>
                <h4 slot="header" 
                    class="card-title">Horários Selecionados</h4>
            </card>      
        </div>
    </div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'
import Multiselect from 'vue-multiselect'

export default {
    components: {
      Card,
      Multiselect
    },
    data () {
        return {
            value_day: [],
            value_time: [],
                day: [
                    { day: 'Segunda'},
                    { day: 'Terça'},
                    { day: 'Quarta'},
                    { day: 'Quinta'},
                    { day: 'Sexta'},
                ],
                time: [
                    { time: 'M1'},
                    { time: 'M2'},
                    { time: 'M3'},
                    { time: 'M4'},
                    { time: 'M5'},
                    { time: 'M6'},
                    { time: 'T1'},
                    { time: 'T2'},
                    { time: 'T3'},
                    { time: 'T4'},
                    { time: 'T5'},
                    { time: 'T6'},
                    { time: 'N1'},
                    { time: 'N2'},
                    { time: 'N3'},
                    { time: 'N4'},
                    { time: 'N5'},
                ]
        }
  }
}


</script>

<style>
    .btn-next {
        margin-top: 1rem;
        left: 50%;
    margin-right: -50%;
    }

</style>
