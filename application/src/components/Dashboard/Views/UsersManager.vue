<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <card style="padding: 15px;">
          <h4 slot="header" class="card-title">Usuários do sistema</h4>
          <div class="card-body">
            <b-input-group style="margin-bottom:15px;">
              <b-form-input placeholder="Digite o filtro da busca" v-model="filter"></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" v-on:click="filter=''">Limpar</b-button>
              </b-input-group-append>
            </b-input-group>
            <b-table
              hover
              fixed
              responsive
              :filter="filter"
              :items="items"
              :fields="fields"
              @filtered="onFiltered"
              :current-page="currentPage"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="isDesc"
            >
              <template slot="role" slot-scope="row">
                <span v-if="row.item.role == 'admin'">Administrador</span>
                <span v-else-if="row.item.role == 'standard'">Servidor</span>
                <span v-else-if="row.item.role == 'student'">Estudante</span>
                <span v-else>Indefinido</span>
              </template>
              <template slot="enabled" slot-scope="row">
                <switches
                  v-model="row.item.enabled"
                  :emit-on-mount="false"
                  text-enabled="Habilitado"
                  text-disabled="Desabilitado"
                  :type-bold="true"
                  theme="bulma"
                  color="blue"
                  @input="disableUser(!row.item.enabled, row.item.uid)"
                ></switches>
              </template>
              <template slot="options" slot-scope="row">
                <button
                  type="button"
                  class="btn-simple btn btn-sm btn-info"
                  v-b-tooltip.hover
                  title="Visualizar mais informações"
                  v-on:click.stop
                >
                  <i class="fa fa-eye"></i>
                </button>
              </template>
            </b-table>
            <b-row>
              <b-col md="6" class="my-1">
                <b-pagination
                  :total-rows="totalRows"
                  :per-page="perPage"
                  v-model="currentPage"
                  class="my-0"
                />
              </b-col>
            </b-row>
          </div>
        </card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import moment from "moment";
import Switches from "vue-switches";
import auth from "../../../services/firebase-controller";
import * as users from "../../../services/userManager";
export default {
  data() {
    return {
      user: auth.currentUser,
      filter: "",
      items: [],
      fields: [
        { key: "uid", label: "Registro Institucional", sortable: true },
        { key: "displayName", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "role", label: "Cargo", sortable: true },
        { key: "enabled", label: "Status", sortable: false },
        { key: "options", label: "Ações", sortable: false }
      ],
      perPage: 100,
      currentPage: 1,
      totalRows: null,
      isDesc: false,
      sortBy: "uid"
    };
  },
  components: {
    Card,
    Switches
  },
  created: function() {
    this.getUsers();
  },
  methods: {
    disableUser(disable, uid) {
        users.update(uid,{'disabled':disable}).then(() => {
            this.getUsers()
        })
    },
    getUsers() {
      users.all(this.user.uid).then(usersList => {
        this.items = []
        usersList.forEach(user => {
          this.items.push({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            role: user.customClaims.role,
            enabled: !user.disabled
          });
        });
      });
      this.totalRows = this.items.length;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>