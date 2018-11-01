<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <div class="col-7">
                <card>
                    <h4 slot="header" class="card-title">Complete o registro do evento</h4>
                    <div class="container-fluid">
                        <div class="row">
                          <div class="col-12">
                              <b-input-group>
                                  <div class="col-12" style="padding-bottom:20px;">
                                    <b-form-input  placeholder="Título do evento" v-model='title'></b-form-input>
                                  </div>
                                    <div class="col-12" style="padding-bottom:20px;">
                                        <b-input placeholder="Nome do responsável" v-model='responsable'></b-input>
                                    </div>
                                    <div class="col-12">
                                        <b-textarea placeholder="Digite o motivo" v-model='description' :rows=3 required></b-textarea>
                                    </div>
                                    <b-form-group label="Escolha a repetição" style='margin-left:20px;margin-top:15px;'>
                                    <b-form-radio-group id="radios1"
                                                        v-model="selected"
                                                        :options="options"
                                                        name="radiosDefault" />
                                    </b-form-group>
                              </b-input-group>
                        </div>
                    </div>
                    </div>
                </card>
            </div>
            <div class="col-5">
                <card>
                    <h4 slot="header" class="card-title" style='margin-left:80px'>Horários Selecionados</h4>
                    <v-layout justify-center>
                        <light-timeline :items='items'></light-timeline>
                    </v-layout>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import Multiselect from "vue-multiselect";
const theme = "red";

export default {
  components: {
    Card,
    Multiselect
  },
  data() {
    return {
      selected: "",
      title: "",
      description: "",
      responsable: "",
      options: [
        { text: "Sem repetição", value: "" },
        { text: "Diariamente", value: "daily" },
        { text: "Semanalmente", value: "weekly" },
        { text: "Mensalmente", value: "monthly" }
      ],
      items: [
        {
          tag: "27/09/2018 M1, M2, M3",
          color: "#dcdcdc",
          type: "circle",
          content: "E001"
        },
        {
          tag: "27/09/2018 T1, T2",
          color: "#dcdcdc",
          type: "circle",
          content: "F100"
        },
        {
          tag: "27/09/2018 N2, N3",
          color: "#dcdcdc",
          type: "circle",
          content: "H004"
        },
        {
          tag: "27/09/2018 M1, M2, M3",
          color: "#dcdcdc",
          type: "circle",
          content: "C104"
        }
      ]
    };
  },
  methods: {
    validate: function() {
      if (validate && responsable && description) {
        this.$parent.isValid = true;
      }
      this.$parent.isValid = false;
    }
  }
};
</script>
