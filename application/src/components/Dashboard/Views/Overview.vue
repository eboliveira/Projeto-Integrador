<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-3 col-md-6" v-on:click.stop="goTo('pendentsReserves')">
                    <stats-card >
                        <div slot="header" class="icon-warning">
                            <i class="nc-icon nc-bullet-list-67 text-warning"></i>
                        </div>
                        <div slot="content">
                            <p class="card-category">Reservas Pendentes</p>
                            <h4 class="card-title">{{ NumPendents }}</h4>
                        </div>
                    </stats-card>
                </div>

                <div class="col-xl-3 col-md-6">
                    <stats-card>
                        <div slot="header" class="icon-success">
                            <i class="nc-icon nc-simple-remove text-danger"></i>
                        </div>
                        <div slot="content">
                            <p class="card-category">Eventos de hoje</p>
                            <h4 class="card-title">{{ eventsToday }}</h4>
                        </div>
                    </stats-card>
                </div>
            </div>

            <!-- <div class="row">
            <div class="col-md-12">
            <card>
            <template slot="header">
            <h5 class="title">Tasks</h5>
            <p class="category">Backend development</p>
        </template>
        <l-table :data="tableData.data"
        :columns="tableData.columns">
        <template slot="columns"></template>

        <template slot-scope="{row}">
        <td>
        <Checkbox v-model="row.checked"></Checkbox>
    </td>
    <td>{{row.title}}</td>
    <td class="td-actions text-right">
    <button type="button" class="btn-simple btn btn-xs btn-info">
    <i class="fa fa-edit"></i>
</button>
<button type="button" class="btn-simple btn btn-xs btn-danger">
<i class="fa fa-times"></i>
</button>
</td>
</template>
</l-table>
<div class="footer">
<hr>
<div class="stats">
<i class="fa fa-history"></i> Updated 3 minutes ago
</div>
</div>
</card>

</div>
</div> -->
</div>
</div>
</template>
<script>
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import LTable from 'src/components/UIComponents/Table.vue'
import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
import {freeRooms} from '../../../services/GetsServices'
import {byStatus} from './../../../services/eventQuerys'

export default {
    components: {
        Checkbox,
        Card,
        LTable,
        ChartCard,
        StatsCard
    },
    data () {
        return {
            NumPendents: null,
            eventsToday: 0
        }
    },
    mounted: function () {
        byStatus('undefined').then(res =>{
            this.NumPendents = res.length
        })
    },
    methods: {
        goTo(name_route) {
            this.$router.push({name: name_route})
        }
    }
}
</script>
<style>

</style>
