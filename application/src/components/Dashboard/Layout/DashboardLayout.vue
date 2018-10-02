<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/admin/reserve">
        <i class="fa fa-calendar-o"></i>
        <p>Fazer reserva</p>
      </sidebar-link>
      <sidebar-link to="/admin/classes">
        <i class="fa fa-calendar-o"></i>
        <p>Reservas feitas</p>
      </sidebar-link>
      <sidebar-link to="/admin/equipment">
        <i class="nc-icon nc-camera-20"></i>
        <p>Equipamentos</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

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
