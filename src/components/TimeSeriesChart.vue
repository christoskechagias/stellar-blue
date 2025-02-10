<template>
  <div class="border border-gray-200 rounded-lg p-2">
    <apexchart type="line" :options="chartOptions" :series="chartSeries" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTimeSeriesStore } from '@/stores/timeSeriesStore'
import dayjs from 'dayjs'
const store = useTimeSeriesStore()

const chartOptions = computed(() => ({
  chart: {
    id: 'line-chart',
    toolbar: {
      show: true,
    },
  },
  noData: {
    text: 'No data',
    align: 'center',
    style: {
      fontSize: '14px',
      color: '#BFBFBF',
    },
  },
  xaxis: {
    categories: store.filteredData.map((item) => item.dateTime),
    tickAmount: 6,
    labels: {
      formatter: (value) => {
        const date = dayjs(value).format('DD-MM-YY')
        const time = dayjs(value).format('HH:mm')
        return `${date} \n ${time}`
      },
    },
  },
  title: {
    text: 'Price Over Time',
    style: {
      fontWeight: 'bold',
      fontSize: '20px',
    },
  },
  stroke: {
    curve: 'smooth',
  },
  markers: {
    size: 1,
  },
  grid: {
    show: true,
  },
}))

const chartSeries = computed(() => {
  const baseColumns = []
  if (store.visibleSeries.ENTSOE_DE_DAM_Price) {
    baseColumns.push({
      name: 'ENTSOE_DE_DAM_Price',
      data: store.filteredData.map((item) => item.ENTSOE_DE_DAM_Price),
    })
  }

  if (store.visibleSeries.ENTSOE_GR_DAM_Price) {
    baseColumns.push({
      name: 'ENTSOE_GR_DAM_Price',
      data: store.filteredData.map((item) => item.ENTSOE_GR_DAM_Price),
    })
  }
  if (store.visibleSeries.ENTSOE_FR_DAM_Price) {
    baseColumns.push({
      name: 'ENTSOE_FR_DAM_Price',
      data: store.filteredData.map((item) => item.ENTSOE_FR_DAM_Price),
    })
  }
  return baseColumns
})
</script>
