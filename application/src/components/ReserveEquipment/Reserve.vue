<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card>
                    <h4 slot="header" class="card-title">Reservar Equipamentos</h4>
                    <b-container fluid>
                        <b-row>
                            <b-col md="12">
                                <b-form inline>
                                    <b-input class="mr-sm-1 mb-sm-0" placeholder="Data Início" />
                                    <b-input class="mr-sm-1 mb-sm-0" placeholder="Hora Início" />
                                    <b-input class="mr-sm-1 mb-sm-0" placeholder="Data Fim" />
                                    <b-input class="mr-sm-1 mb-sm-0" placeholder="Hora Início" />
                                    <b-button type="submit" variant="primary">
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                    <b-button type="reset" variant="warning">
                                        <i class="fa fa-times"></i>
                                    </b-button>
                                </b-form>
                            </b-col>
                        </b-row>
                        <b-row style="margin-top: 10px;">
                            <b-col md="6">
                                <b-table striped hover :items="items" :fields="fields"></b-table>
                            </b-col>
                            <b-col md="6" style="margin-top: 10px;">
                                <b-form>
                                    <b-form-group>
                                        <b-form-input type="number" class="mr-sm-2 mb-sm-0" id="patrimonio" placeholder="Patrimônio" required/>
                                    </b-form-group>
                                    <b-form-group>
                                        <b-form-input class="mr-sm-2 mb-sm-0" id="tipoEquipamento" placeholder="Tipo Equipamento" required/>
                                    </b-form-group>
                                    <b-form-group>
                                        <b-form-input class="mr-sm-2 mb-sm-0" id="marca" placeholder="Marca" required/>
                                    </b-form-group>
                                    <b-form-group>
                                        <b-form-input class="mr-sm-2 mb-sm-0" id="modelo" placeholder="Modelo" required/>
                                    </b-form-group>
                                    <b-button type="submit" variant="success">Salvar</b-button>
                                </b-form>
                            </b-col>
                        </b-row>
                    </b-container>
                </card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Card from 'src/components/UIComponents/Cards/Card.vue'
    import * as equipments from '../../services/equipmentsQuery.js'

    export default {
        components: {
            Card
        },

        data () {
            return {
                // Note 'isActive' is left out and will not appear in the rendered table
                fields: [ 'first_name', 'last_name', 'age' ],
                items: [
                    {isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
                    {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw'},
                    {isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                    {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
                ]
            }
        }
    }
</script>