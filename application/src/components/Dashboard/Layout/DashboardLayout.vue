<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/general/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/usersManager">
        <i class="nc-icon nc-circle-09"></i>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/new_reserve">
        <i class="nc-icon nc-notes"></i>
        <p>Salas</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'standard'" to="/general/reserveclass">
        <i class="nc-icon nc-notes"></i>
        <p>Reservar Salas</p>
      </sidebar-link>
      <sidebar-link to="/general/reserves">
        <i class="nc-icon nc-check-2"></i>
        <p>Reservas feitas</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/equipment">
        <i class="nc-icon nc-camera-20"></i>
        <p>Equipamentos</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'standard'" to="/general/reserveEquipment">
        <i class="nc-icon nc-camera-20"></i>
        <p>Reservar Equipamentos</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/pendents">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Reservas pendentes</p>
      </sidebar-link>
      <sidebar-link
        v-if="$user.get().role == 'standard'"
        :to="'/general/pendents/' + $user.get().uid"
      >
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Reservas pendentes</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/reports">
        <i class="nc-icon nc-paper-2"></i>
        <p>Relatórios</p>
      </sidebar-link>
      <sidebar-link v-if="$user.get().role == 'admin'" to="/admin/configurations">
        <i class="nc-icon nc-settings-gear-64"></i>
        <p>Configurações</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content v-on:click="toggleSidebar"></dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu.vue";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  created() {
    let loader = null;
    this.$router.beforeEach((to, from, next) => {
      loader = this.$loading.show();
      next();
    });
    this.$router.afterEach((to, from) => {
      loader.hide();
    });
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
