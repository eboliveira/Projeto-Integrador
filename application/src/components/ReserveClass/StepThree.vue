<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <b-col md="5">
                <card>
                    <h4 slot="header" class="card-title">Confirmação</h4>
                    <h5 slot="header" class="card-title">Titulo do Evento<p>{{result.title}}</p></h5>
                    <h5 slot="header" class="card-title">Descrição<p>{{result.description}}</p></h5>
                    <h5 slot="header" class="card-title">Responsabilidade<p>{{result.responsable}}</p></h5>
                    <h5 slot="header" class="card-title">Frequência do Evento<p>{{frequence}}</p></h5>
                </card>
            </b-col>
            <b-col md="7">
                <card>
                    <h4 slot="header" class="card-title">Salas Selecionadas</h4>
                   <b-table show-empty striped hover :items="room" :fields="field" :current-page="currentPage" :per-page="perPage">
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
				    </b-table>
                    <v-layout justify-center>
                     <b-row>
                        <b-col md="2" >
                            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                        </b-col>
                    </b-row>
                  </v-layout>
                </card>
            </b-col>
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
        result: Object,
        room : Array
    },
    data () {
        return {
            currentPage: 1,
            perPage: 5,
            totalRows: null
        }
    },
    computed: {
    field() {
      var fields = []
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
        )
        return fields
    },
        frequence(){
            if(this.result.selected == ""){
                return "Unica"
            }
            else if(this.result.selected == "daily"){
                return "Diariamente"
            }
            else if(this.result.selected == "weekly"){
                return "Semanalmente"
            }
            else{
                return "Mensalmente"
            }
        },
    }  
}


</script>

<style>

</style>
