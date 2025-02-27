<template>
    <div class="container w-75">
        <DataTable class="table table-hover table-striped" width="90%" :data="data">
            <thead>
                <tr>
                <th>Medal</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="medal in data" :key="medal[0]">
                <td>{{ medal[0] }}</td>
                <td>{{ medal[1] }}</td>
            </tr>
        </tbody>
        <tfoot>
        </tfoot>
    </DataTable>
</div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>

<script>
import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-bs5';

export default {
    name: 'DataTableComponent',
    components: {
        DataTable
    },
    setup() {
        DataTable.use(DataTablesLib);
    },
    data() {
        return {
            data: [],
        };
    },
    props: {
        noc: {
            type: String,
            required: true
        },
    },
    methods: {

    },
    watch: {
        noc: function (newVal, oldVal) {
            getMedals(newVal).then((data) => {
                this.data = data;
                console.log(this.data);
            });
        }
    },
    mounted() {
        getMedals(this.noc).then((data) => {
            this.data = data;
        });
    }
};

export async function getMedals(noc) {
    const response = await axios.get('http://localhost:5000/medals/' + noc);
    return response.data;
}
</script>