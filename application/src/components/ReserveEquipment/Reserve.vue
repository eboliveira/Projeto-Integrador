<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <card>
          <h4 slot="header" class="card-title">Reservar Equipamentos</h4>
          <b-container>
            <b-row align-h="center">
                <b-col md="3">
                  <b-card border-variant="primary" header-bg-variant="primary" header="Escolha uma data inicial" class="text-center" header-text-variant="white">
                    <datetime format="dd-MM-yyyy HH:mm" v-model="startDate" type="datetime"></datetime>
                  </b-card>
                </b-col>
                <b-col md="3">
                  <b-card border-variant="primary" header-bg-variant="primary" header="Escolha uma data final" class="text-center" header-text-variant="white">
                    <datetime format="dd-MM-yyyy HH:mm" v-model="finalDate" type="datetime"></datetime>
                  </b-card>
                </b-col>
            </b-row>
            
            <b-row class="mt-3">
              <b-col>
                <b-input-group>
                  <b-form-input readonly :value="this.selectedItem.codigo" placeholder="Patrimônio"></b-form-input>
                  <b-input-group-append>
                    <b-btn variant="primary" v-on:click="showModal()">Equipamento</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
            
            <b-row class="mt-3">
              <b-col md="12">
                <b-btn variant="success" v-on:click="reserveEquipment(selectedItem)">Reservar</b-btn>
              </b-col>
            </b-row>
          </b-container>
        </card>
      </b-col>
    </b-row>
    <b-modal v-model="isModal" header-bg-variant="primary" header-text-variant="light" id="modalInfo" ok-title="Fechar" ok-only title="Selecione um equipamento">
        <b-table hover stacked="md" :items="items" :fields="fields" v-on:row-clicked="selectItem"></b-table>
    </b-modal>
  </b-container>
</template>

<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import * as equipments from "../../services/equipmentsQuery.js";
 
export default {
  components: {
    Card
  },

  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: ["first_name", "last_name", "age"],
      startDate: "",
      finalDate: "",
      options: {
        format: "DD/MM/YYYY",
        inline: true,
        useCurrent: false
      },
      inputVal: null,
      fields: [
        {
          key: "codigo",
          label: "Patrimônio",
          sortable: true,
          sortDirection: "asc"
        },
        {
          key: "tipo_equipamento",
          label: "Tipo Equipamento",
          sortable: true,
          sortDirection: "asc"
        },
        { key: "marca", label: "Marca", sortable: true, sortDirection: "asc" },
        { key: "modelo", label: "Modelo", sortable: true, sortDirection: "asc" }
      ],
      items: [],
      selectedItem: {},
      isModal: false,
      date:new Date()
    };
  },
  methods: {
    getAllEquipments() {
      equipments.all().then(res => {
        this.items = [];
        res.forEach(element => {
          this.items.push({
            codigo: element.patrimonio,
            tipo_equipamento: element.nome,
            marca: element.marca,
            modelo: element.modelo
          });
        });
      });
    },
    showModal(button) {
      this.isModal = true;
    },
    selectItem(row, index) {
      this.isModal = false;
      this.selectedItem = row;
    },
    reserveEquipment(item) {
      if (item.codigo) {
        console.log(item);
      }
    }
  },

  mounted() {
    this.getAllEquipments();
  }
};
</script>
