<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <h4 slot="header" class="card-title">Reservas Feitas</h4>
                <b-row>
                    <b-input-group @keydown.enter="onSubmit(inputVal)">
                        <b-form-input placeholder="Digite o código da sala" v-model="inputVal" maxlength=4 :state=this.isValid aria-describedby="inputError"></b-form-input>
                        <b-input-group-append>
                            <b-btn variant="success" v-on:click="onSubmit(inputVal)" style="border: 1px solid #17a2b8" >
                                <i class = "fa fa-search"></i>
                            </b-btn>
                        </b-input-group-append>
                        <b-form-invalid-feedback id = "formError">Escreva um formato válido de código de sala</b-form-invalid-feedback>
                    </b-input-group>
                </b-row>
                <h1><b-badge variant="info">{{this.badgeText}}</b-badge></h1>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import fgInput from 'src/components/UIComponents/Inputs/formGroupInput.vue'
  import {findRoom} from 'src/services/GetsServices.js'
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    data() {
      return {
        inputVal: '',
        isValid: null,
        badgeText: ''
      };
    },
    components:{
        fgInput,
        Card
    },
    methods: {
        onSubmit:function(inputVal){
            if (this.inputVal.length < 4 || !isNaN(parseInt(inputVal[0])) || isNaN(parseInt(inputVal[1])) || isNaN(parseInt(inputVal[2])) || isNaN(parseInt(inputVal[3]))){
                this.isValid = false
                return
            }
            this.isValid = true
            inputVal = inputVal.toUpperCase()
            findRoom(inputVal).then(res =>{
                if (this.$parent.refreshEvents(res)){
                    this.badgeText=res[0]['room']
                }
            })
        },
    },
  };
</script>
