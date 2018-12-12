<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">Equipamentos</h4>
                    <div class="container-fluid">
                        <div class="row">
                            <v-layout justify-center>
                                <div class="col-3">
                                    <b-button class="btn-lg" variant="primary" to="/admin/reserveEquipment">Reservar Equipamentos</b-button>
                                </div>
                                <div class="col-1"></div>
                                <div class="col-3">
                                    <b-button class="btn-lg" variant="primary" to="/admin/managerEquipment">Gerenciar Equipamentos</b-button>
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
