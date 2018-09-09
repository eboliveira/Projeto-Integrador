<template>
<div>
    <button @click="runScript()" class="btn btn-primary btn-fill">Gerar horários</button>
    <modal
        v-bind:btnTitle="config.btnTitle"
        v-bind:btnColor="config.btnColor"
        v-bind:widthModal="config.widthModal"
        v-bind:headerColor="config.headerColor"
        v-bind:headerTitle="config.headerTitle"
        v-bind:componentsBody="config.componentsBody"
        ></modal>
</div>
</template>




<script>
import Modal from './Modal.vue'
export default {
    components: {
        Modal
    },
    data() {
        return {
           config: {
               widthModal: '',
               btnTitle: 'Reservar Horários',
               btnColor: 'blue-grey lighten-1',
               headerColor: 'headline'+'deep-orange lighten-1',
               headerTitle: 'Reserva de Horários',
               componentsBody:['InputTeste']
           }
        }
    }
  }
</script>
