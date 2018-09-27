<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <div class="col-6" style="padding-left: 5px; padding-right: 5px;">
              <card>
                  <h4 slot="header" class="card-title">Reservar Horários</h4>
                  <b-table responsive hover :items="dia" :bordered="true">
                      <b-form-checkbox slot="Segunda" slot-scope="row" value="orange"></b-form-checkbox>
                  </b-table>
              </card>
            </div>
            <div class="col-6" style="padding-left: 5px; padding-right: 5px;">
              <card>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-3">
                      <b-form-select v-model="selected" :options="bloco"/>
                    </div>
                    <div class="col-4">
                      <b-form-select v-model="selected" :options="tipoSala"/>
                    </div>
                    <div class="col-3">
                      <b-form-select v-model="selected" :options="sala"/>
                    </div>
                      <button class="btn btn-success font-icon-detail">
                        <i class="nc-icon nc-refresh-02"></i>
                      </button>
                  </div>
                  <b-table striped hover :items="items">
                    <b-form-checkbox></b-form-checkbox>
                  </b-table>
                </div>
              </card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";

const items = [
  { bloco: 'H', tipo_Sala: 'Teórica', codigo_sala: 'H102'},
  { bloco: 'B', tipo_Sala: 'Teórica', codigo_sala: 'B005' },
  { bloco: 'E', tipo_Sala: 'Lab. Informática', codigo_sala: 'E105' },
  { bloco: 'C', tipo_Sala: 'Lab. Alimentos', codigo_sala: 'C001' }
]

export default {
  components: {
    Card
  },
  data() {
    return {
      selected: null,
      bloco: [
        { value: null, text: 'Bloco', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      tipoSala: [
        { value: null, text: 'Tipo da Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      sala: [
        { value: null, text: 'Código Sala', disabled: true },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: 'c', text: 'Third Option' }
      ],
      
      fields: [ 'first_name', 'last_name', 'show_details' ],
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
