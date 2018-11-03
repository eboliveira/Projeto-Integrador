<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <card style="padding: 15px;">
                    <h4 slot="header" class="card-title">Nome da Página(que ainda não sei)</h4>
                    <b-row>
                        <b-col md="4" class="my-1">
                            <card>
                                <b-row>
                                    <b-col md="12">
                                        <h5 slot="header" class="card-title text-center">Escolha uma data inicial</h5>
                                        <date-picker id="stardDate" v-model="searchData.datetimeInterval.start" :config="startDatetimeOptions"></date-picker>
                                    </b-col>
                                </b-row>
                            </card>
                        </b-col>
                        <b-col md="4" class="my-1">
                            <card>
                                <b-row>
                                    <b-col md="12">
                                        <h5 slot="header" class="card-title text-center">Escolha uma data final</h5>
                                        <date-picker id="endDate" v-model="searchData.datetimeInterval.end" :config="startDatetimeOptions"></date-picker>
                                    </b-col>
                                </b-row>
                            </card>
                        </b-col>
                        <b-col md="4" class="my-1">
                            <b-row>
                                <b-col md="12" class="my-1">
                                    <b-form-group horizontal label="Buscar por:" label-text-align="right" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="searchData.objectOfSearch">
                                                <option :value="null">Aulas e Eventos</option>
                                                <option value="lessons">Apenas Aulas</option>
                                                <option value="events">Apenas Eventos</option>
                                                <option value="free">Salas livres</option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col md="12" class="my-1">
                                    <b-form-group v-if="searchData.objectOfSearch !== 'free'" horizontal label="Aplicar filtro:" label-text-align="right" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="searchData.filter.type" :options="searchData.filter.options" slot="prepend">
                                                <option :value="null" >Filtro desativado</option>
                                                <option value="room" >Sala</option>
                                                <option value="responsable">Responsável</option>
                                                <option v-if="searchData.objectOfSearch === 'lessons'" value="discipline_cod">Código da disciplina</option>
                                            </b-form-select>
                                            <b-form-input v-if="searchData.filter.type" v-model="searchData.filter.value" :placeholder="filterPlaceholder"/>
                                        </b-input-group>
                                    </b-form-group>
                                    <b-form-group v-if="searchData.objectOfSearch === 'free'" horizontal label="Aplicar filtro:" label-text-align="right" class="mb-0">
                                        <b-input-group>
                                            <b-form-select v-model="searchData.filter.type" :options="searchData.filter.options">
                                                <option :value="null">Todas as salas livres</option>
                                                <option value="morning">Salas livres durante a manhã</option>
                                                <option value="evening">Salas livres durante a tarde</option>
                                                <option value="night">Salas livres durante a noite</option>
                                                <option value="custom">Selecionar horários</option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>
                                    <br>
                                    <b-form-group v-if="searchData.filter.type === 'custom'" label="[ Ctrl + Click ] para selecionar multiplos valores">
                                        <b-input-group>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.monday" class="mb-3">
                                                <option value="2m1">2 M1</option>
                                                <option value="2m2">2 M2</option>
                                                <option value="2m3">2 M3</option>
                                                <option value="2m4">2 M4</option>
                                                <option value="2m5">2 M5</option>
                                                <option value="2m6">2 M6</option>
                                                <option value="2t1">2 T1</option>
                                                <option value="2t2">2 T2</option>
                                                <option value="2t3">2 T3</option>
                                                <option value="2t4">2 T4</option>
                                                <option value="2t5">2 T5</option>
                                                <option value="2t6">2 T6</option>
                                                <option value="2n1">2 N1</option>
                                                <option value="2n2">2 N2</option>
                                                <option value="2n3">2 N3</option>
                                                <option value="2n4">2 N4</option>
                                                <option value="2n5">2 N5</option>
                                            </b-form-select>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.tuesday" class="mb-3">
                                                <option value="3m1">3 M1</option>
                                                <option value="3m2">3 M2</option>
                                                <option value="3m3">3 M3</option>
                                                <option value="3m4">3 M4</option>
                                                <option value="3m5">3 M5</option>
                                                <option value="3m6">3 M6</option>
                                                <option value="3t1">3 T1</option>
                                                <option value="3t2">3 T2</option>
                                                <option value="3t3">3 T3</option>
                                                <option value="3t4">3 T4</option>
                                                <option value="3t5">3 T5</option>
                                                <option value="3t6">3 T6</option>
                                                <option value="3n1">3 N1</option>
                                                <option value="3n2">3 N2</option>
                                                <option value="3n3">3 N3</option>
                                                <option value="3n4">3 N4</option>
                                                <option value="3n5">3 N5</option>
                                            </b-form-select>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.wednesday" class="mb-3">
                                                <option value="4m1">4 M1</option>
                                                <option value="4m2">4 M2</option>
                                                <option value="4m3">4 M3</option>
                                                <option value="4m4">4 M4</option>
                                                <option value="4m5">4 M5</option>
                                                <option value="4m6">4 M6</option>
                                                <option value="4t1">4 T1</option>
                                                <option value="4t2">4 T2</option>
                                                <option value="4t3">4 T3</option>
                                                <option value="4t4">4 T4</option>
                                                <option value="4t5">4 T5</option>
                                                <option value="4t6">4 T6</option>
                                                <option value="4n1">4 N1</option>
                                                <option value="4n2">4 N2</option>
                                                <option value="4n3">4 N3</option>
                                                <option value="4n4">4 N4</option>
                                                <option value="4n5">4 N5</option>
                                            </b-form-select>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.thursday" class="mb-3">
                                                <option value="5m1">5 M1</option>
                                                <option value="5m2">5 M2</option>
                                                <option value="5m3">5 M3</option>
                                                <option value="5m4">5 M4</option>
                                                <option value="5m5">5 M5</option>
                                                <option value="5m6">5 M6</option>
                                                <option value="5t1">5 T1</option>
                                                <option value="5t2">5 T2</option>
                                                <option value="5t3">5 T3</option>
                                                <option value="5t4">5 T4</option>
                                                <option value="5t5">5 T5</option>
                                                <option value="5t6">5 T6</option>
                                                <option value="5n1">5 N1</option>
                                                <option value="5n2">5 N2</option>
                                                <option value="5n3">5 N3</option>
                                                <option value="5n4">5 N4</option>
                                                <option value="5n5">5 N5</option>
                                            </b-form-select>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.friday" class="mb-3">
                                                <option value="6m1">6 M1</option>
                                                <option value="6m2">6 M2</option>
                                                <option value="6m3">6 M3</option>
                                                <option value="6m4">6 M4</option>
                                                <option value="6m5">6 M5</option>
                                                <option value="6m6">6 M6</option>
                                                <option value="6t1">6 T1</option>
                                                <option value="6t2">6 T2</option>
                                                <option value="6t3">6 T3</option>
                                                <option value="6t4">6 T4</option>
                                                <option value="6t5">6 T5</option>
                                                <option value="6t6">6 T6</option>
                                                <option value="6n1">6 N1</option>
                                                <option value="6n2">6 N2</option>
                                                <option value="6n3">6 N3</option>
                                                <option value="6n4">6 N4</option>
                                                <option value="6n5">6 N5</option>
                                            </b-form-select>
                                            <b-form-select multiple :select-size="17" v-model="searchData.filter.schedules.saturday" class="mb-3">
                                                <option value="7m1">7 M1</option>
                                                <option value="7m2">7 M2</option>
                                                <option value="7m3">7 M3</option>
                                                <option value="7m4">7 M4</option>
                                                <option value="7m5">7 M5</option>
                                                <option value="7m6">7 M6</option>
                                                <option value="7t1">7 T1</option>
                                                <option value="7t2">7 T2</option>
                                                <option value="7t3">7 T3</option>
                                                <option value="7t4">7 T4</option>
                                                <option value="7t5">7 T5</option>
                                                <option value="7t6">7 T6</option>
                                                <option value="7n1">7 N1</option>
                                                <option value="7n2">7 N2</option>
                                                <option value="7n3">7 N3</option>
                                                <option value="7n4">7 N4</option>
                                                <option value="7n5">7 N5</option>
                                            </b-form-select>
                                        </b-input-group>
                                    </b-form-group>

                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <hr />
                    <b-row>
                        <b-col md="6" class="my-1">
                            <b-form-group horizontal label="Buscar" label-text-align="right" class="mb-0">
                                <b-input-group>
                                    <b-form-input v-model="filter" :placeholder="'Realize uma busca por ' + fields[0].label" />
                                    <b-input-group-append>
                                        <b-btn :disabled="!filter" v-on:click="filter = ''">Clear</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col md="6" class="my-1">
                            <b-form-group horizontal label="Itens por página:" label-text-align="right" class="mb-0">
                                <b-form-select :options="pageOptions" v-model="perPage" />
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- Main table element -->
                    <b-table show-empty stacked="md" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" @filtered="onFiltered">
                        <template slot="title" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
                        <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
                        <template slot="actions" slot-scope="row">
                            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                            <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">Info modal</b-button>
                            <b-button size="sm" @click.stop="row.toggleDetails">{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
                        </template>
                        <template slot="row-details" slot-scope="row">
                            <b-card>
                                <ul>
                                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                                </ul>
                            </b-card>
                        </template>
                    </b-table>

                    <b-row>
                        <b-col md="6" class="my-1">
                            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                        </b-col>
                    </b-row>

                    <!-- Info modal -->
                    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
                        <pre>{{ modalInfo.content }}</pre>
                    </b-modal>
                </card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Card from 'src/components/UIComponents/Cards/Card.vue'

const items = [
    { isActive: true,  age: 40, title: { first: "Dickerson", last: "Macdonald" } },
    { isActive: false, age: 21, title: { first: "Larsen",    last: "Shaw" } },
    { isActive: false, age: 9,  title: { first: "Mini",      last: "Navarro" }, _rowVariant: "success"},
    { isActive: false, age: 89, title: { first: "Geneva",    last: "Wilson" } },
    { isActive: true,  age: 38, title: { first: "Jami",      last: "Carney" } },
    { isActive: false, age: 27, title: { first: "Essie",     last: "Dunlap" } },
    { isActive: true,  age: 40, title: { first: "Thor",      last: "Macdonald" } },
    { isActive: true,  age: 87, title: { first: "Larsen",    last: "Shaw" }, _cellVariants: { age: "danger", isActive: "warning" } },
    { isActive: false, age: 26, title: { first: "Mitzi",     last: "Navarro" } },
    { isActive: false, age: 22, title: { first: "Genevieve", last: "Wilson" } },
    { isActive: true,  age: 38, title: { first: "John",      last: "Carney" } },
    { isActive: false, age: 29, title: { first: "Dick",      last: "Dunlap" } }
];

export default {
    components:{
        Card
    },
    data() {
        return {
            items: items,
            fields: [
                {
                    key: "title",
                    label: "Título",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "responsable",
                    label: "Resposável",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "interval",
                    label: "Período",
                    sortable: true,
                    sortDirection: "asc"
                },
                {
                    key: "actions",
                    label: "Ações"
                }
            ],
            currentPage: 1,
            perPage: 10,
            totalRows: items.length,
            pageOptions: [10, 25, 50, 100],
            sortBy: null,
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            modalInfo: { title: "", content: "" },
            filterPlaceholder: null,
            searchData: {
                objectOfSearch: null,
                filter: {
                    value: null,
                    type: null,
                    options: [],
                    schedules: {
                        monday: [],
                        tuesday: [],
                        wednesday: [],
                        thursday: [],
                        friday: [],
                        saturday: [],
                    }
                },
                datetimeInterval: {
                    start: null,
                    end: null
                }
            },
            startDatetimeOptions: {
                format: "MM/DD/YYYY HH:mm",
                disabledHours: [0, 1, 2, 3, 4, 5, 6, 23],
                stepping: 10,
                disabledTimeIntervals: [],
                useCurrent: true,
                sideBySide: false,
                defaultDate: null,
                locale: "pt-br",
                inline: true
            }
        };
    },
    computed: {},
    watch: {
        "searchData.filter.type": function() {
            if (this.searchData.filter.type == "room") {
                this.filterPlaceholder = "Ex: F101";
                return;
            }
            if (this.searchData.filter.type == "responsable") {
                this.filterPlaceholder = "Ex: Igor";
                return;
            }
        }
    },
    created: function() {
        console.log("teste");
    },
    methods: {
        info(item, index, button) {
            this.modalInfo.title = `Row index: ${index}`;
            this.modalInfo.content = JSON.stringify(item, null, 2);
            this.$root.$emit("bv::show::modal", "modalInfo", button);
        },
        resetModal() {
            this.modalInfo.title = "";
            this.modalInfo.content = "";
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        setPlaceholder() {
            // if(this.searchData.filter.type == 'room') {
            //   this.filterPlaceholder = 'Ex: F101'
            //   console.log('kkkkk');
            //   return
            // }
            // if(this.searchData.filter.type == 'responsable') {
            //   this.filterPlaceholder = 'Ex: Igor'
            //   return
            // }
        }
    }
};
</script>
