<template>
    <div class="container-fluid">
        <div class="row">
            <card class="col-6" style="padding: 5px;">
                <h4 slot="header" class="card-title">Reservar Horários</h4>
                <b-table responsive hover :items="dia" :bordered="true">
                    <b-form-checkbox slot="Segunda" slot-scope="row" value="orange"></b-form-checkbox>
                </b-table>
            </card>
            <card class="col-5" style="padding: 5px;">
              <div class="row">
                <b-form-select v-model="selected" :options="bloco" class="col-4" />
                <b-form-select v-model="selected" :options="tipoSala" class="col-4" />
                <b-form-select v-model="selected" :options="sala" class="col-4" />
              </div>
              <b-table striped hover :items="items"></b-table>
            </card>
        </div>
    </div>
</template>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";

const items = [
  { bloco: 'H', tipoSala: 'Teórica', codigosala: 'H102' },
  { bloco: 'B', tipoSala: 'Teórica', codigosala: 'B005' },
  { bloco: 'E', tipoSala: 'Lab. Informática', codigosala: 'E105' },
  { bloco: 'C', tipoSala: 'Lab. Alimentos', codigosala: 'C001' }
]

export default {
  components: {
    Card
  },
  data() {
    return {
      selected: null,
      bloco: [
        { value: null, text: 'Selecione o Bloco', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      tipoSala: [
        { value: null, text: 'Selecione o tipo da Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      sala: [
        { value: null, text: 'Selecione a Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      items: items,
      dia: [
        {
          Segunda: "2",
          Terça: "",
          Quarta: "",
          Quinta: "",
          Sexta: "",
          Sábado: "",
          Domingo: "",
          _cellVariants: {
            Segunda: "",
            Terça: "",
            Quarta: "",
            Quinta: "",
            Sexta: "",
            Sabado: "",
            Domingo: ""
          }
        },
        {
          Segunda: "2",
          Terça: "",
          Quarta: "",
          Quinta: "",
          Sexta: "",
          Sábado: "",
          Domingo: "",
          _cellVariants: {
            Segunda: "",
            Terça: "",
            Quarta: "",
            Quinta: "",
            Sexta: "",
            Sabado: "",
            Domingo: ""
          }
        },
        {
          Segunda: "2",
          Terça: "",
          Quarta: "",
          Quinta: "",
          Sexta: "",
          Sábado: "",
          Domingo: "",
          _cellVariants: {
            Segunda: "",
            Terça: "",
            Quarta: "",
            Quinta: "",
            Sexta: "",
            Sabado: "",
            Domingo: ""
          }
        },
        {
          Segunda: "2",
          Terça: "",
          Quarta: "",
          Quinta: "",
          Sexta: "",
          Sábado: "",
          Domingo: "",
          _cellVariants: {
            Segunda: "",
            Terça: "",
            Quarta: "",
            Quinta: "",
            Sexta: "",
            Sabado: "",
            Domingo: ""
          }
        }
      ],
      horario: [
        {
          m1: "",
          m2: "",
          m3: "",
          m4: "",
          m5: "",
          m6: "",
          t1: "",
          t2: "",
          t3: "",
          t4: "",
          t5: "",
          t6: "",
          n1: "",
          n2: "",
          n3: "",
          n4: "",
          n5: ""
        }
      ]
    };
  },
  methods: {}
};

</script>
