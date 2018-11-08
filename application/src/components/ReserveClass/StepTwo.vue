<template>
	<b-container fluid style="margin-top: 10px; margin-bottom: 10px">
        <b-row>
            <b-col md="7">
                <card>
                    <h4 slot="header" class="card-title">Complete o registro do evento</h4>
					<b-row>
						<b-col md="12">
							<b-form-group vertical>
								<b-form-input placeholder="Título do evento" class="mb-2" v-model='title'></b-form-input>
								<b-input placeholder="Nome do responsável" class="mb-2" v-model='responsable'></b-input>
								<b-textarea placeholder="Digite o motivo" class="mb-2" v-model='description' :rows=3 required></b-textarea>
							</b-form-group>
							<b-form-group label="Escolha a repetição" style='margin-left:20px;margin-top:15px;'>
								<b-form-radio-group id="radios1" v-model="selected" :options="options" name="radiosDefault"/>
							</b-form-group>
						</b-col>
					</b-row>
                </card>
            </b-col>
            <b-col md="5">
                <card>
                    <h4 slot="header" class="card-title" style='margin-left:80px'>Horários Selecionados</h4>
                    <v-layout justify-center>
                        <light-timeline :items='items'></light-timeline>
                    </v-layout>
                </card>
            </b-col>
        </b-row>
	</b-container>
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
