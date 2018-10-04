<template>
    <div class="container-fluid" style="margin-top: 10px;">
        <div class="row" style="margin-bottom: 10px;">
            <b-input-group @keydown.enter="handleSubmit">
                <b-form-input placeholder="Digite o código da sala" v-model="inputVal"></b-form-input>
                <b-input-group-append>
                    <b-btn variant="info" @click="find(inputVal)" style="border: 1px solid #17a2b8">Buscar</b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
  import fgInput from 'src/components/UIComponents/Inputs/formGroupInput.vue'
  import {findRoom} from 'src/services/GetsServices.js'
  export default {
    data() {
      return {
        inputVal : '',
      };
    },
    components:{
        fgInput
    },
    methods: {
        find:function(inputVal){
            inputVal = inputVal.toUpperCase()
            findRoom(inputVal).then(res =>{
                this.$parent.refreshEvents(res)
            })
        }
    },
  };
</script>
