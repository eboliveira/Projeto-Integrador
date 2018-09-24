<template>
    <div class="row">
        <card>
              <h4 slot="header" 
                    class="card-title">Reservar Horários</h4>
        <b-table responsive hover 
                :items="items"
                :bordered="true">
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
            items: [
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
