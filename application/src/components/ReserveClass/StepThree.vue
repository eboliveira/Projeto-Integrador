<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <div class="col-6">
                <card>
                    <h4 slot="header" class="card-title">Confirmação</h4>
                </card>
            </div>
        </div>
    </div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'
import Multiselect from 'vue-multiselect'

export default {
    components: {
      Card,
    },
    props:{
        steptwo: Array
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
