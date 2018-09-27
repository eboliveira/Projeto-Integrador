<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <div class="col-6">
                <card>
                    <h4 slot="header" class="card-title">Registrar Responsável</h4>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <fg-input type="text" label="Nome"></fg-input>
                            </div>
                            <div class="col-12">
                                <label>Motivo</label>
                                <textarea class="form-control border-input"></textarea>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <div class="col-6">
                <card>
                    <h4 slot="header" class="card-title">Horários Selecionados</h4>
                    <v-layout justify-center>
                        <light-timeline :items='items'></light-timeline>
                    </v-layout>
                </card>      
            </div>
        </div>
    </div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'
import Multiselect from 'vue-multiselect'
const theme = 'red';

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
                ],
            
            items: [                
                {
                    tag: '27/09/2018 M1, M2, M3',
                    color: '#dcdcdc',
                    type: 'circle',
                    content: 'E001'
                },
                {
                    tag: '27/09/2018 T1, T2',
                    color: '#dcdcdc',
                    type: 'circle',
                    content: 'F100'
                },
                {
                    tag: '27/09/2018 N2, N3',
                    color: '#dcdcdc',
                    type: 'circle',
                    content: 'H004'
                },
                {
                    tag: '27/09/2018 M1, M2, M3',
                    color: '#dcdcdc',
                    type: 'circle',
                    content: 'C104'
                }
            ]
        }
  }
}


</script>