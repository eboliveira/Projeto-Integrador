<template>
    <div id="app">
        <card style="padding: 10px">
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
                        <h1><b-badge variant="info">{{badgeText}}</b-badge></h1>
                    </b-col>
                </b-row>
            </b-container>
            <full-calendar ref="calendar" :events="events" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
        </card>
    </div>
</template>

<style>
@import "~fullcalendar/dist/fullcalendar.css";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>

<script>
import {parseScheduleToDate} from "./../../../services/utils"
import controllers from "./../../../services/eventsFullCalendar"
import Card from 'src/components/UIComponents/Cards/Card.vue'
import fgInput from 'src/components/UIComponents/Inputs/formGroupInput.vue'
import {findRoom} from 'src/services/GetsServices.js'

export default {
    name: "app",
    data() {
        return {
            inputVal: '',
            isValid: null,
            badgeText: '',
            events: [],
            config: {
                themeSystem: 'bootstrap4',
                selectable: false,
                minTime: '07:00:00',
                maxTime: '23:00:00'
            }
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
            var t = null
            findRoom(inputVal).then(res =>{
                if(this.refreshEvents(res)){
                    this.badgeText=res[0]['room']
                }
            })
        },
        refreshEvents(res) {
            if(res.length == 0){
                alert("Sala não encontrada")
                return false
            }
            this.events = []
            res.forEach(item => {
                let new_event = {};
                if (item['description']){       //se é um evento
                    if(item['status'] == 'confirmed'){
                        if(item['repeat']){         //se tem repetição
                            let events_list = []
                            if(item['repeat'] == "daily"){ //se é diariamente
                                events_list = controllers.repeat(item, 'day')
                            }
                            else if(item['repeat'] == "weekly"){ //se é semanalmente
                                events_list = controllers.repeat(item, 'week')
                            }
                            else if(item['repeat'] == "monthly"){ //se é semanalmente
                                events_list = controllers.repeat(item, 'month')
                            }
                            events_list.forEach(item =>{
                                this.events.push(item)
                            })
                        }
                        else{
                            new_event = controllers.createEvent(item)
                            this.events.push(new_event)
                        }
                    }
                }
                else{
                    const schedule = parseScheduleToDate(item['schedule'][0])
                    new_event = controllers.createLesson(item, schedule)
                    this.events.push(new_event)
                }
            });
            return true
        },
        removeEvent() {
            this.$refs.calendar.$emit("remove-event", this.selected);
            this.selected = {};
        },
        eventSelected(event) {
            this.selected = event;
        },
        eventCreated(...test) {

        }
    },
    mounted: function() {
    }
};
</script>
