<template>
    <div class="row">
        <card>
              <h4 slot="header" 
                    class="card-title">Reservar Horários</h4>
        <b-table responsive hover 
                :items="dia"
                :bordered="true">
                 <b-form-checkbox slot="Segunda" slot-scope="row" value="orange"></b-form-checkbox>
        </b-table>
        </card>
    </div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
    components: {
      Card,
    },
    data () {
        return {
            dia: [
                 { Segunda:   '2',
                    Terça:   '',
                    Quarta:   '',
                    Quinta:   '',
                    Sexta:   '',
                    Sábado: '',
                    Domingo: '',
                    _cellVariants: { Segunda: '', Terça: '', Quarta: '',Quinta: '', Sexta: '', Sabado: '', Domingo: ''} 
                  },
                   { Segunda:   '2',
                    Terça:   '',
                    Quarta:   '',
                    Quinta:   '',
                    Sexta:   '',
                    Sábado: '',
                    Domingo: '',
                    _cellVariants: { Segunda: '', Terça: '', Quarta: '',Quinta: '', Sexta: '', Sabado: '', Domingo: ''} 
                  },
                   { Segunda:   '2',
                    Terça:   '',
                    Quarta:   '',
                    Quinta:   '',
                    Sexta:   '',
                    Sábado: '',
                    Domingo: '',
                    _cellVariants: { Segunda: '', Terça: '', Quarta: '',Quinta: '', Sexta: '', Sabado: '', Domingo: ''} 
                  },
                   { Segunda:   '2',
                    Terça:   '',
                    Quarta:   '',
                    Quinta:   '',
                    Sexta:   '',
                    Sábado: '',
                    Domingo: '',
                    _cellVariants: { Segunda: '', Terça: '', Quarta: '',Quinta: '', Sexta: '', Sabado: '', Domingo: ''} 
                  },
  
            ],
            horario: [
                {
                    m1: '',
                    m2: '',
                    m3: '',
                    m4: '',
                    m5: '',
                    m6: '',
                    t1: '',
                    t2: '',
                    t3: '',
                    t4: '',
                    t5: '',
                    t6: '',
                    n1: '',
                    n2: '',
                    n3: '',
                    n4: '',
                    n5: '',
                }
            ]
        }
    },
    methods: {
       
    }
}


</script>

<style>
    .btn-next {
        margin-top: 1rem;
        left: 50%;
        margin-right: -50%;
    }

    .box {
        border: 1px solid red; 
        margin: 35px;
    }

    .card_form {
        height: 450px;
        margin-top:10%;
    }

</style>
