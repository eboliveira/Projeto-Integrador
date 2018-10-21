<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Reservas pendentes</h4>
                </div>
                <div class="card-body">
                  <b-input-group style="padding-bottom:15px;">
                      <b-form-input placeholder="Digite o filtro da busca" v-model="filter">
                      </b-form-input>
                      <b-input-group-append>
                        <b-button variant="primary" v-on:click="filter=''">Limpar</b-button>
                      </b-input-group-append>
                  </b-input-group>
                  <b-table striped hover fixed responsive head-variant="dark" :filter="filter"
                   :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="isDesc">
                    <template slot="options" slot-scope="row">
                      <a class="btn btn-success btn-xs" v-b-tooltip.hover title="Aprovar reserva" href="#"><i class="fa fa-check fa-2x" style="padding-right:23px; color:black;"></i></a>
                      <a class="btn btn-danger btn-xs" v-b-tooltip.hover title="Rejeitar reserva" href="#"><i class="fa fa-times fa-2x" style="padding-right:15px; color:black;"></i></a>
                      <a class="btn btn-info btn-xs" v-b-tooltip.hover title="Visualizar mais informações" href="#"><i class="fa fa-eye fa-2x" style="padding-right:21px; color:black;"></i></a>
                    </template>
                  </b-table>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  methods:{

  }
  let items = []
  for(var i=0; i<100; i++){
    const room = "room"+i
    const data = moment().add(i,'day').utc().format()
    items.push({"room":room, "date":data})
  }
  export default {
    data(){
      return {
        filter:'',
        fields:[
          {
            key: "room",
            label:"Sala",
            sortable:true,
          },
          {
            key:"responsable",
            label:"Requisitante",
            sortable:true,
          },
          {
            key:"date",
            label:"Data",
            sortable:true,
          },
          {
            key:"options",
            label:"",
            "class":"text-center"
          }
        ],
        items: items,
        perPage: 10,
        isDesc:true,
        sortBy: "date"

      }
    }
  }
</script>
