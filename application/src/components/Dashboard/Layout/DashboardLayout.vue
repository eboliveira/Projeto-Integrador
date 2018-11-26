<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/usersManager">
        <i class="nc-icon nc-circle-09"></i>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/admin/new_reserve">
        <i class="nc-icon nc-notes"></i>
        <p>Fazer reserva</p>
      </sidebar-link>
      <sidebar-link to="/admin/reserves">
        <i class="nc-icon nc-check-2 "></i>
        <p>Reservas feitas</p>
      </sidebar-link>
      <sidebar-link to="/admin/equipment">
        <i class="nc-icon nc-camera-20"></i>
        <p>Equipamentos</p>
      </sidebar-link>
      <sidebar-link to="/admin/pendents">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>Reservas pendentes</p>
      </sidebar-link>
      <sidebar-link to="/admin/reports">
        <i class="nc-icon nc-paper-2"></i>
        <p>Relatórios</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content v-on:click="toggleSidebar">

      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
