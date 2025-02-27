<template>
  <select v-model="selectedRegion">
    <option v-for="region in regions" :key="region.noc" :value="region.noc">{{ region.region }}</option>
  </select>

  <div style="max-width: 50%; display: flex;">
    <VuePlotly :data="plotlyMedals" :layout="{ title: 'Medals' }"></VuePlotly>
    <VuePlotly :data="medalsGender" :layout="{ title: 'Medals per gender', barmode: 'group' }"></VuePlotly>
  </div>

  <div style="max-width: 50%; display: flex;">
    <VuePlotly :data="[pieChart_gold]" :layout="{ title: 'Gold Medals per Gender' }"></VuePlotly>
    <VuePlotly :data="[pieChart_silver]" :layout="{ title: 'Silver Medals per Gender' }"></VuePlotly>
  </div>

  <DataTableComponent :noc="selectedRegion"></DataTableComponent>


</template>

<style></style>


<script>
import axios from 'axios'
import DataTableComponent from './components/DataTableComponent.vue';
import { VuePlotly } from 'vue3-plotly';

export default {
  components:
  {
    DataTableComponent,
    VuePlotly
  },
  data() {
    return {
      regions: [],
      selectedRegion: "",
      plotlyMedals: [],
      medalsGender: [],
      pieChart_gold: [],
      pieChart_silver: [],
      pieChart_bronze: [],
    }
  },
  watch: {
    selectedRegion: [async function () {
      const response = await axios.get('http://localhost:5000/medals2/' + this.selectedRegion);
      this.plotlyMedals = await response.data;
    },
    async function () {
      const response = await axios.get('http://localhost:5000/count_by_sex2');
      let data = await response.data;
      console.log(data);
      this.medalsGender = data;
      let pie_chart_gold = {
        values: [],
        labels: [],
        type: 'pie'
      };
      let pie_chart_silver = {
        values: [],
        labels: [],
        type: 'pie'
      };
      let pie_chart_bronze = {
        values: [],
        labels: [],
        type: 'pie'
      };
      for (let i = 0; i < data.length; i++) {
        pie_chart_gold.labels = ['Male', 'Female'];
        pie_chart_silver.labels = ['Male', 'Female'];
        pie_chart_bronze.labels = ['Male', 'Female'];
        pie_chart_bronze.values.push(data[i].y[0]);
        pie_chart_gold.values.push(data[i].y[1]);
        pie_chart_silver.values.push(data[i].y[2]);
      }
      this.pieChart_gold = pie_chart_gold;
      this.pieChart_silver = pie_chart_silver;
      this.pieChart_bronze = pie_chart_bronze;
      console.log(this.pieChart_gold);
      console.log(this.pieChart_silver);
      console.log(this.pieChart_bronze);
    }
    ],
  },
  methods:
  {
    async getRegions() {
      const response = await axios.get('http://localhost:5000/regions');
      this.regions = await response.data;
      console.log(this.regions);
    },
  },
  mounted() {
    this.getRegions();
  }
}

</script>
