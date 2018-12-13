<template>
	<b-container fluid style="margin-top: 10px; margin-bottom: 10px">
        <b-row>
            <card style="padding: 15px; width: 100%; margin-right: 15px; margin-left: 15px;">
                  <h4 slot="header" class="card-title">Selecionar Salas</h4>
					        <b-row>
                    <b-col md="3">
                      <b-form-select v-model="selectedroomType" :options="roomType"/>
                    </b-col>
                    <b-col md="4">
                      <b-form-select v-model="selectedcapacity" :options="capacity"/>
                    </b-col>
                    <b-col md="1">
                      <button id="check" class="btn btn-success font-icon-detail" v-on:click="filterTable" v-b-tooltip.hover>
                        <i class="nc-icon nc-check-2"></i>
                      </button>
                      <b-tooltip target="check" title="Aplicar Filtro" placement="bottom"></b-tooltip>
                    </b-col>
                     <b-col md="1">
                      <button id="Refresh" class="btn btn-success font-icon-detail" v-on:click="refreshTable" v-b-tooltip.hover>
                        <i class="nc-icon nc-refresh-02"></i>
                      </button>
                      <b-tooltip target="Refresh" title="Refresh" placement="bottom"></b-tooltip>
                    </b-col>
                  </b-row>
                   	<b-table show-empty striped hover :items="items" :fields="field" :current-page="currentPage" :per-page="perPage" @filtered="onFiltered" :filter="filter">
                       <template slot="roomCode" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="roomType" slot-scope="row">
                         <span v-for="item in row.value">{{item}}</span>
                       </template>
                       <template slot="capacity" slot-scope="row">
                         <span>{{row.item.capacity}}</span>
                       </template>
                       <template slot="start" slot-scope="row">
                         <span>{{row.item.start}}</span>
                       </template>
                       <template slot="end" slot-scope="row">
                         <span>{{row.item.end}}</span>
                       </template>
                       <template slot="actions" slot-scope="row">
                          <b-form-checkbox v-on:click.stop :id="String(row.item.id)" :value="row.item" v-model="selectedRoom"></b-form-checkbox>
                       </template>
					          </b-table>
                  <v-layout justify-center>
                     <b-row>
                        <b-col md="2" >
                            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                        </b-col>
                    </b-row>
                  </v-layout>
				          </card>
        </b-row>
        <b-row>
            <b-col md="7">
                <card>
                    <h4 slot="header" class="card-title">Complete o registro do evento</h4>
					<b-row>
						<b-col md="12">
							<b-form-group vertical>
								<b-form-input v-validate="'required|alpha'" placeholder="Título do evento" class="mb-2" v-model='steptwo.title' name="title"></b-form-input>
                  <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
								  
                <b-input v-validate="'required|alpha'" placeholder="Nome do responsável" class="mb-2" v-model='steptwo.responsable' name="responsable"></b-input>
                  <span v-show="errors.has('responsable')" class="help is-danger">{{ errors.first('responsable') }}</span>
								
                <b-textarea v-validate="'required'" placeholder="Digite o motivo" class="mb-2" v-model='steptwo.description' name="description" :rows=3></b-textarea>
                  <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
							</b-form-group>
							<b-form-group label="Selecione a Frequência do Evento" style='margin-left:20px;margin-top:15px;'>
								<b-form-radio-group id="radios1" v-model="steptwo.selected" :options="options" name="radio"/>
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
            {{this.steptwo}}
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
    itemTable: Array
  },
  data: () => {
    return {
      items: [],
      refresh: [],
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      selectedcapacity: [],
      selectedroomType: [],
      selectedRoom: [],
      capacity: [
        { value: 1, text: "Sem Filtro" },
        { value: 30, text: "Até 30 lugares" },
        { value: 40, text: "30 à 40" },
        { value: 50, text: "50 e superior" }
      ],
      roomType: [
        { value: 1, text: "Sem Filtro" },
        { value: "Laboratório", text: "Laboratório" },
        { value: "Teórica", text: "Teórica" },
        { value: "Desenho", text: "Desenho" }
      ],
      steptwo: {
        title: "",
        description: "",
        responsable: "",
        selected: null,
        selectedRoom: ""
        },
      locale: "ar",
      options: [
        { text: "Unica", value: null },
        { text: "Diariamente", value: "daily" },
        { text: "Semanalmente", value: "weekly" },
        { text: "Mensalmente", value: "monthly" }
      ],
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
    },
    refreshTable() {
      this.items = this.refresh;
    },
     onFiltered(filteredItems) {
      this.totalRows = this.items.length;
      this.currentPage = 1;
    },
    filterTable() {
      var roomType = this.selectedroomType;
      var capacity = this.selectedcapacity;
      var searchData = [];
      if (roomType == 1) {
        this.items_Table = this.refresh;
        return;
      } else if (roomType) {
        for (var search of this.refresh) {
          var exist = Object.values(search);
          if (exist.find(x => x == roomType)) {
            searchData.push(search);
          }
        }
      }
      // if(capacity){
      //     if(searchData != null){
      //       for(var search of this.refresh){
      //           var exist = Object.values(search)
      //           if(capacity == 30){
      //             if(exist.find(x => x <= capacity || x == null)){
      //                 searchData.push(search)
      //             }
      //           }
      //           else if(capacity == 40){
      //              if(exist.find(x => x >= capacity && capacity < 50)){
      //                 searchData.push(search)
      //             }
      //           }
      //           else{
      //              if(exist.find(x => x >= capacity)){
      //                 searchData.push(search)
      //             }
      //           }
      //       }
      //     }
      //     else{
      //       for(var search of searchData){
      //           var exist = Object.values(search)
      //           if(capacity == 30){
      //             if(exist.find(x => x <= capacity || x == null)){
      //                 searchData.push(search)
      //             }
      //           }
      //           else if(capacity == 40){
      //              if(exist.find(x => x >= capacity && capacity < 50)){
      //                 searchData.push(search)
      //             }
      //           }
      //           else{
      //              if(exist.find(x => x >= capacity)){
      //                 searchData.push(search)
      //             }
      //           }
      //       }
      //     }
      // }
      this.items_Table = searchData;
    }
  },
  watch: {
    steptwo: {
     handler(val){
      this.$emit("passThree",val);
     },
     deep: true
    },
    itemTable: function(){
      this.items = this.itemTable
      this.refresh = this.itemTable
    },
    selectedRoom: function(){
      this.steptwo.selectedRoom = this.selectedRoom
    }
  },
  computed: {
     field() {
      var fields = [];
      fields.push(
        {
          key: "roomCode",
          label: "Código da Sala",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "roomType",
          label: "Tipo da Sala",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "capacity",
          label: "Capacidade da Sala",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "start",
          label: "Inicio do Evento",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "end",
          label: "Final do Evento",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "actions",
          label: "Ações",
          sortDirection: "asc"
        }
      );
      return fields;
    },
    timeline() {
      if (this.selectedRoom == null) {
        var nul = [];
        return nul;
      } else {
        var lightTimeLine = [];
        var timeLine = this.selectedRoom.sort(function(a, b) {
          if (a.start > b.start) {
            return 1;
          }
          if (a.start < b.start) {
            return -1;
          }

          return 0;
        });

        for (var item of timeLine) {
          var timeRoom = {
            tag: String(
              moment(item.isoStart)
                .utc()
                .format("DD/MM/YYYY HH:mm -")
            ).concat(moment(item.isoEnd).utc().format("HH:mm")),
            color: "#dcdcdc",
            type: "circle",
            content: item.roomCode
          };
          lightTimeLine.push(timeRoom);
        }
        return lightTimeLine;
      }
    },
  }
};
</script>
