<template>
	<b-container fluid style="margin-top: 10px; margin-bottom: 10px">
        <b-row>
            <b-col md="7">
                <card>
                    <h4 slot="header" class="card-title">Complete o registro do evento</h4>
					<b-row>
						<b-col md="12">
							<b-form-group vertical :steptwo="result">
								<b-form-input v-validate="'required|alpha'" placeholder="Título do evento" class="mb-2" v-model='title' name="title"></b-form-input>
                  <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>

                <b-input v-validate="'required|alpha'" placeholder="Nome do responsável" class="mb-2" v-model='responsable' name="responsable"></b-input>
                  <span v-show="errors.has('responsable')" class="help is-danger">{{ errors.first('responsable') }}</span>

                <b-textarea v-validate="'required'" placeholder="Digite o motivo" class="mb-2" v-model='description' name="description" :rows=3></b-textarea>
                  <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
							</b-form-group>
							<b-form-group label="Escolha a repetição" style='margin-left:20px;margin-top:15px;'>
								<b-form-radio-group id="radios1" v-model="selected" :options="options" name="radio"/>
							</b-form-group>
						</b-col>
					</b-row>
                </card>
            </b-col>
            <b-col md="5">
                <card>
                    <h4 slot="header" class="card-title" style='margin-left:80px'>Horários Selecionados</h4>
                    <v-layout justify-center>
                        <light-timeline :items="timeline"></light-timeline>
                    </v-layout>
                </card>
            </b-col>
        </b-row>
	</b-container>
</template>

<style>
.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.15rem;
}

.help.is-danger {
  color: #ff3860;
}
</style>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import Multiselect from "vue-multiselect";
import * as utils from "../../services/utils.js";
import moment from "moment";
const theme = "red";

export default {
  components: {
    Card,
    Multiselect
  },
  props: {
    stepone: Array
  },
  data: () => {
    return {
      locale: "ar",
      selected: "",
      title: "",
      description: "",
      responsable: "",
      steptwo:{
        selected: null,
        title: null,
        description: null,
        responsable: null
      },
      options: [
        { text: "Sem repetição", value: "" },
        { text: "Diariamente", value: "daily" },
        { text: "Semanalmente", value: "weekly" },
        { text: "Mensalmente", value: "monthly" }
      ]
    };
  },
  methods: {
    validate: function() {
     this.$validator.validateAll().then((result) => {
        if(result){
          console.log('ta certo')
        }
        console.log('ta errado')
     });
    }
  },
  watch: {
    steptwo: function() {
      this.$emit("passThree", this.steptwo);
    },
    selected: function() {
      this.steptwo.selected = this.selected
    },
    title: function() {
      this.steptwo.title = this.title
    },
    description: function() {
      this.steptwo.description = this.description
    },
    responsable: function() {
      this.steptwo.responsable = this.responsable
    },
  },
  computed: {
    timeline() {
      if (this.stepone == null) {
        var nul = [];
        return nul;
      } else {
        var lightTimeLine = [];
        var timeLine = this.stepone.sort(function(a, b) {
          if (a.start > b.start) {
            return 1;
          }
          if (a.start < b.start) {
            return -1;
          }

          return 0;
        });

        for (var item of timeLine) {
            item.start = item.start.split('/')
            item.end = item.end.split('/')
        var itemStart = item.start[1] + '/' + item.start[0] + '/' + item.start[2]
        var itemEnd = item.end[1] + '/' + item.end[0] + '/' + item.end[2]
          var start = moment(itemStart)
            .utc()
            .format();
          var end = moment(itemEnd)
            .utc()
            .format();
          var schedule = utils.parseHourToSchedule(start, end);
          var timeRoom = {
            tag: String(
              moment(itemStart)
                .utc()
                .format("DD/MM/YYYY ")
            ).concat(schedule[0]),
            color: "#dcdcdc",
            type: "circle",
            content: item.roomCode
          };
          lightTimeLine.push(timeRoom);
        }
        return lightTimeLine;
      }
    },
    result() {
      var steptwo = {
        selected: this.selected,
        title: this.title,
        description: this.description,
        responsable: this.responsable
      }
      return steptwo
    }
  }
};
</script>
