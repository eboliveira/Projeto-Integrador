<template>
    <div class="content">
    <card class="card">
        <h4 slot="header" class="card-title">Reservas</h4>
        <form>
            <div class="col">
                      <v-btn color="blue-grey darken-1">
                        Reserva de Horários de Salas
                    </v-btn>
                      <v-btn color="blue-grey darken-1">
                        Reserva de Horários de Equipamentos
                    </v-btn>
            </div>
        </form>
    </card>
    </div>
</template>

<script>
import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    }
  }
</script>

<style>
    .card {
        max-width: 400px;
        max-height: 200px;
    }
</style>
