<template>
<div class="container">
    <div class="col-md-4">
        <label for="title">Código da sala</label>
        <div @keydown.enter="handleSubmit">
            <div class="input-group">
                <input class="form-control" placeholder="Digite o código da sala aqui"
                v-model="inputVal"
                type = "text">
                <span class="input-group-btn">
                    <button @click="find(inputVal)" class="btn btn-success btn-fill" type="submit">Buscar</button>
                </span>
                </div>
            </div>
        </div>
</div>
</template>

<style>
</style>

<script>
  import fgInput from 'src/components/UIComponents/Inputs/formGroupInput.vue'
  import {findRoom} from 'src/services/GetsServices.js'
  export default {
    name: 'app',
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
                // this.$parent.refreshEvents(res)
            })
        }
    },
  };
</script>
