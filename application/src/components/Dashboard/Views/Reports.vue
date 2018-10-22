<template>
  <b-container fluid>
    <b-row>
      <b-col md="3" class="my-1">
        <label for="stardDate"><strong>Escolha uma data inicial</strong></label><br>
        <date-picker id="stardDate" v-model="searchData.datetimeInterval.start" :config="startDatetimeOptions"></date-picker>
      </b-col>
      <b-col md="3" class="my-1">
        <label for="endDate"><strong>Escolha uma data final</strong></label><br>
        <date-picker id="endDate" v-model="searchData.datetimeInterval.end" :config="startDatetimeOptions"></date-picker>
      </b-col>
      <b-col md="6" class="my-1">
        <b-row>
          <b-col md="12" class="my-1">
            <b-form-group horizontal label="Buscar por:" class="mb-0">
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
            <b-form-group horizontal label="Aplicar filtro:" class="mb-0">
              <b-input-group>
                <b-form-select v-model="searchData.filter.type" :options="searchData.filter.options" slot="prepend">
                  <option :value="null" >Filtro desativado</option>
                  <option value="room" >Sala</option>
                  <option v-if="searchData.objectOfSearch !== 'free'" value="responsable">Responsável</option>
                  <option v-if="searchData.objectOfSearch === 'lessons'" value="discipline_cod">Código da disciplina</option>
                </b-form-select>
                <b-form-input v-if="searchData.filter.type" v-model="searchData.filter.value" :placeholder="filterPlaceholder"/>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Buscar" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" :placeholder="'Realizar uma busca por ' + fields[0].label" />
            <b-input-group-append>
              <b-btn :disabled="!filter" v-on:click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Por página:" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
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

  </b-container>
</template>

<script>
const items = [
  { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
  {
    isActive: false,
    age: 9,
    name: { first: 'Mini', last: 'Navarro' },
    _rowVariant: 'success'
  },
  { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
  { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
  { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
  {
    isActive: true,
    age: 87,
    name: { first: 'Larsen', last: 'Shaw' },
    _cellVariants: { age: 'danger', isActive: 'warning' }
  },
  { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
  { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
  { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
]

export default {
  data () {
    return {
      items: items,
      fields: [
        { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
        { key: 'age', label: 'Person age', sortable: true, 'class': 'text-center' },
        { key: 'isActive', label: 'is Active' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: items.length,
      pageOptions: [10, 25, 50, 100],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
      filterPlaceholder: null,
      searchData: {
        objectOfSearch: null,
        filter:{
          value: null,
          type: null,
          options: []
        },
        datetimeInterval:{
          start: null,
          end: null
        }
      },
      startDatetimeOptions: {
        format: 'MM/DD/YYYY HH:mm',
        disabledHours: [0, 1, 2, 3, 4, 5, 6, 23],
        stepping: 10,
        disabledTimeIntervals: [],
        useCurrent: true,
        sideBySide: false,
        defaultDate: null,
        locale: 'pt-br',
        inline: true
      }
    }
  },
  computed: {

  },
  watch: {
    'searchData.filter.type': function() {
      if(this.searchData.filter.type == 'room') {
        this.filterPlaceholder = 'Ex: F101'
        return
      }
      if(this.searchData.filter.type == 'responsable') {
        this.filterPlaceholder = 'Ex: Igor'
        return
      }
    }
  },
  created: function() {
    console.log('teste')
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
}
</script>
