<template>
    <card>
        <form>
            <div class="col-md-6">
                <h4 slot="header" class="card-title">Reserva de Horário</h4>
                <label>Código da sala</label>
                <input 
                    type="text"
                    class="form-control">
                <label>Tipo da Sala</label>
                    <input 
                        type="text" 
                        class="form-control">
                <label>Capacidade</label>
                    <input 
                        type="text" 
                        class="form-control">
                <label>Turno</label>
                    <input 
                        type="text" 
                        class="form-control">
                <label>Código da Disciplina</label>
                    <input 
                        type="text" 
                        class="form-control">
                <label>Código da Turma</label>
                    <input type="text" 
                        class="form-control">
                <label>Código da Disciplina</label>
                    <input 
                        type="text" 
                        class="form-control">
                <v-btn
                    slot = "activator"
                    color ="light-blue lighten-1r"
                    dark>
                        Cancelar
                </v-btn>
                <v-btn
                    slot = "activator"
                    color ="light-blue lighten-1r"
                    dark>
                        Registrar
                </v-btn>
            </div>
        </form>
    </card>
</template>

<script>
import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
    components: {
      Card
    }
}


</script>