<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <card class="card" style="padding: 15px;">
                    <h4 slot="header" class="card-title">
                        Equipamentos
                        <b-btn class="float-right" variant="success">Cadastrar</b-btn>
                    </h4>
                    <div class="container-fluid">
                        <div class="row">
                            <v-layout justify-center>
                                <b-table striped hover :items="items" :fields="fields">
                                    <template slot="settings" slot-scope="row">
                                        <v-layout justify-center>
                                            <button type="button" class="btn-simple btn btn-xs btn-warning">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" class="btn-simple btn btn-xs btn-danger" style="margin-left: 5px;">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </v-layout>
                                    </template>
                                </b-table>
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

    const items = [
        { codigo: '100', tipo_equipamento: 'Multimidia', codigo_sala: 'H102'},
        { codigo: '200', tipo_equipamento: 'Projetor', codigo_sala: 'B005' },
        { codigo: '300', tipo_equipamento: 'Notebook', codigo_sala: 'E105' },
        { codigo: '400', tipo_equipamento: 'Multimidia', codigo_sala: 'C001' }
    ]

    export default {
        components: {
            Card
        },
        data() {
            return {
                fields: [ 'codigo', 'tipo_equipamento', 'codigo_sala',  'settings'],
                items: items,
            }
        }
    }
</script>