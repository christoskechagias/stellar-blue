<script setup>
import { useTimeSeriesStore } from '@/stores/timeSeriesStore'
import TimeSeriesTable from './components/TimeSeriesTable.vue'
import TimeSeriesChart from './components/TimeSeriesChart.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { ref, onMounted } from 'vue'

const store = useTimeSeriesStore()
const isLoading = ref(true)

onMounted(() => {
  store.fetchData()
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<template>
  <div class="relative min-h-screen">
    <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-white z-50">
      <LoadingSpinner />
    </div>
    <template v-else>
      <header
        class="bg-white border-b border-[#3D87D3] p-4 shadow-[0_-10px_30px_rgba(61,135,211,0.5)]"
      >
        <img src="@/assets/logo.png" alt="Header Image" class="w-[200px] h-auto" />
      </header>

      <main class="grid grid-cols-1 lg:grid-cols-2 py-10 px-2 lg:p-10 gap-5">
        <div class="col-span-1 lg:col-span-1 sticky top-0 bg-white z-99">
          <div class="sticky top-0 lg:pt-[60px] h-auto">
            <TimeSeriesChart />
          </div>
        </div>

        <div class="col-span-1 lg:col-span-1">
          <TimeSeriesTable />
        </div>
      </main>

      <footer class="absolute bg-white bottom-0 w-full p-2 text-center">
        <p class="text-xs">© {{ new Date().getFullYear() }} All rights reserved.</p>
      </footer>
    </template>
  </div>
</template>
