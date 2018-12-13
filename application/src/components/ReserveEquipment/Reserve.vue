<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <card>
          <h4 slot="header" class="card-title">Reservar Equipamentos</h4>
          <b-container fluid>
              <b-row>
            <b-col md="2">
                <b-card
                        border-variant="info"
                        header-bg-variant="info"
                        header="Escolha uma data inicial"
                        class="text-center"
                        header-text-variant="white">
                        <datetime format="dd-MM-yyyy HH:mm" v-model="startDate" type="datetime" style="border:1px solid #f0f0f0;"></datetime>
                </b-card>
            </b-col>
            <b-col md="2">
                <b-card
                        border-variant="info"
                        header-bg-variant="info"
                        header="Escolha uma data final"
                        class="text-center"
                        header-text-variant="white">
                        <datetime format="dd-MM-yyyy HH:mm" v-model="finalDate" type="datetime" style="border:1px solid #f0f0f0;"></datetime>
                </b-card>
            </b-col>
              </b-row>
            <b-row style="padding-bottom:12px;">
                <b-col md="2">
                    <label for="">Selecione a data</label>
                </b-col>
                <b-col md="2">
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
                    <b-input-group prepend="Patrimônio">
                        <b-input readonly :value="this.selectedItem.codigo"></b-input>
                        <b-button variant="success" v-on:click="showModal()">Escolher equipamento</b-button>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-modal
              v-model="isModal"
              header-bg-variant="primary"
              header-text-variant="light"
              id="modalInfo"
              ok-title="Fechar"
              ok-only
              title="Selecione um equipamento"
            >
              <b-container fluid>
                <b-table
                  striped
                  hover
                  stacked="md"
                  :items="items"
                  :fields="fields"
                  v-on:row-clicked="selectItem"
                ></b-table>
              </b-container>
            </b-modal>
            <b-row style="padding-top:10px; padding-left:15px;">
              <b-button variant="info" v-on:click="reserveEquipment(selectedItem)">Reservar</b-button>
            </b-row>
          </b-container>
        </card>
      </b-col>
    </b-row>
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
