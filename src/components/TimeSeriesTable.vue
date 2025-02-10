<template>
  <div class="flex flex-col gap-2 justify-center">
    <TableFilters />
    <a-table
      :columns="columns"
      :data-source="store.filteredData"
      bordered
      :sticky="true"
      :pagination="{ pageSize: 24, showSizeChanger: false, total: store.totalData }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.isEditable">
          <a-input
            v-if="store.editableData[record.id]"
            v-model:value="store.editableData[record.id][column.dataIndex]"
            @change="(e) => validateInput(e.target.value, record.id)"
          />
          <span v-else>{{ text }}</span>
        </template>

        <template v-else-if="column.dataIndex === 'actions'">
          <template v-if="store.editableData[record.id]">
            <div class="flex flex-col items-center gap-2">
              <a-button type="primary" @click="handleSave(record.id)" class="w-[70px]"
                >Save</a-button
              >
              <a-button @click="handleCancel(record.id)" class="w-[70px]">Cancel</a-button>
            </div>
          </template>
          <template v-else>
            <a @click="handleEdit(record.id)">
              <EditFilled />
            </a>
          </template>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="showValidationModal" :footer="null">
      <template #title>
        <p class="text-red-500 !font-semibold">Validation Error</p>
      </template>
      <p>Please enter a valid number between -2000 and 2000.</p>
    </a-modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTimeSeriesStore } from '@/stores/timeSeriesStore'
import { EditFilled } from '@ant-design/icons-vue'
import { debounce } from 'lodash'
import TableFilters from './TableFilters.vue'

const store = useTimeSeriesStore()
const showValidationModal = ref(false)

const columns = computed(() => {
  const baseColumns = [{ title: 'Date & Time', width: '25%', dataIndex: 'dateTime' }]

  if (store.visibleSeries.ENTSOE_DE_DAM_Price) {
    baseColumns.push({
      title: 'ENTSOE_DE_DAM_Price',
      dataIndex: 'ENTSOE_DE_DAM_Price',
      width: '25%',
      sorter: (a, b) => a.ENTSOE_DE_DAM_Price - b.ENTSOE_DE_DAM_Price,
      isEditable: true,
      ellipsis: true,
    })
  }

  if (store.visibleSeries.ENTSOE_GR_DAM_Price) {
    baseColumns.push({
      title: 'ENTSOE_GR_DAM_Price',
      dataIndex: 'ENTSOE_GR_DAM_Price',
      width: '25%',
      sorter: (a, b) => a.ENTSOE_GR_DAM_Price - b.ENTSOE_GR_DAM_Price,
      isEditable: true,
      ellipsis: true,
    })
  }

  if (store.visibleSeries.ENTSOE_FR_DAM_Price) {
    baseColumns.push({
      title: 'ENTSOE_FR_DAM_Price',
      dataIndex: 'ENTSOE_FR_DAM_Price',
      width: '25%',
      sorter: (a, b) => a.ENTSOE_FR_DAM_Price - b.ENTSOE_FR_DAM_Price,
      isEditable: true,
      ellipsis: true,
    })
  }

  baseColumns.push({ title: 'Actions', dataIndex: 'actions', width: '25%', align: 'center' })

  return baseColumns
})

const handleSave = (id) => {
  store.save(id)
}

const handleCancel = (id) => {
  store.cancel(id)
}

const handleEdit = (id) => {
  store.edit(id)
}

const handleTableChange = (pagination) => {
  store.currentPage = pagination.current
}

const validateInput = debounce((value, dataIndex) => {
  if (isNaN(value) || value < -2000 || value > 2000) {
    showValidationModal.value = true
    store.cancel(dataIndex)
  }
}, 300)
</script>
