<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="Filters">
      <div class="flex items-center justify-between gap-10">
        <a-range-picker
          v-model:value="store.selectedRangeDate"
          @change="store.setSelectedRangeDate"
        />
        <div class="flex items-center justify-between gap-2">
          <a-checkbox v-model:checked="store.visibleSeries.ENTSOE_DE_DAM_Price"
            >ENTSOE_DE_DAM_Price</a-checkbox
          >
          <a-checkbox v-model:checked="store.visibleSeries.ENTSOE_GR_DAM_Price"
            >ENTSOE_GR_DAM_Price</a-checkbox
          >
          <a-checkbox v-model:checked="store.visibleSeries.ENTSOE_FR_DAM_Price"
            >ENTSOE_FR_DAM_Price</a-checkbox
          >
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script setup>
import { ref } from 'vue'
import { useTimeSeriesStore } from '@/stores/timeSeriesStore'
const store = useTimeSeriesStore()
const activeKey = ref()
</script>
