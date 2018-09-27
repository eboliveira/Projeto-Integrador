<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">Reservas</h4>
                    <div class="container-fluid">
                        <div class="row">
                            <v-layout justify-center>
                                <div class="col-3">
                                    <g-button-ujarak color="success" size="button--size-m">Reserva Salas</g-button-ujarak>
                                </div>
                                <div class="col-1"></div>
                                <div class="col-3">
                                    <g-button-ujarak color="primary" size="button--size-m">Reserva Equipamentos</g-button-ujarak>
                                </div>
                            </v-layout>
                        </div>
                    </div>
                </card>
            </div>
        </div>
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