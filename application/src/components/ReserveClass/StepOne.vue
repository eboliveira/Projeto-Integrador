<template>
    <div class="row">
        <div class="col-md-4">
            <card>
                <h4 slot="header" 
                    class="card-title">Reservar Horário</h4>
                <div class="row">
                    <p class="card-category">Dia</p>
                    <v-select
                        :items="dia"
                    ></v-select>
                    </br>
                    <p class="card-category">Horário</p>
                    <v-select
                        :items="horario"
                        multiple
                    ></v-select>
                </div>
            </card>
        </div>
        <div class="col-md-8">
        </div>
    </div>
</template>

<script>
import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
    components: {
      Card
    },
    data: () => ({
        dia: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        horario: ['M1', 'M2', 'M3', 'M4', 'M5','M6','T1', 'T2', 'T3', 'T4', 'T5','T6','N1', 'N2', 'N3', 'N4', 'N5']
    })
}


</script>