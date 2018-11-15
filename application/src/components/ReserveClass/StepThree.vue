<template>
    <div class="container-fluid" style="padding-left: 5px; padding-right: 5px;">
        <div class="row">
            <div class="col-6">
                <card>
                    <h4 slot="header" class="card-title">Confirmação</h4>
                    {{result}}
                </card>
            </div>
        </div>
    </div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'
import Multiselect from 'vue-multiselect'

export default {
    components: {
      Card,
    },
    props:{
        result: Array
    },
    data () {
        return {
           
        }
  }
}


</script>

<style>

</style>
