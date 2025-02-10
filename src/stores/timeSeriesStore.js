import { defineStore } from 'pinia'
import timeSeriesData from '../assets/timeSeriesData.json'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const useTimeSeriesStore = defineStore('timeseries', {
  state: () => ({
    data: [],
    editableData: {},
    selectedRangeDate: null,
    visibleSeries: {
      ENTSOE_DE_DAM_Price: true,
      ENTSOE_GR_DAM_Price: true,
      ENTSOE_FR_DAM_Price: true,
    },
    currentPage: 1,
    totalData: null,
  }),

  getters: {
    filteredData(state) {
      const { currentPage, data, selectedRangeDate } = state
      let results = []

      if (!selectedRangeDate || selectedRangeDate.length !== 2) {
        results = data.map((item) => this.filterColumns(item))
        state.totalData = results.length
      } else {
        const [start, end] = selectedRangeDate.map((date, index) =>
          dayjs(date, 'DD-MM-YYYY HH:mm')[index === 0 ? 'startOf' : 'endOf']('day'),
        )

        results = data
          .filter((item) => {
            const itemDate = dayjs(item.dateTime, 'DD-MM-YYYY HH:mm')
            return itemDate.isBetween(start, end, null, '[]')
          })
          .map((item) => this.filterColumns(item))
        state.totalData = results.length
      }

      const startIndex = (currentPage - 1) * 24
      const endIndex = startIndex + 24
      return results.slice(startIndex, endIndex)
    },
  },

  actions: {
    fetchData() {
      const updatedData = timeSeriesData.map((item, index) => ({
        id: index + 1,
        dateTime: dayjs(item.DateTime).format('DD-MM-YYYY HH:mm'),
        ENTSOE_DE_DAM_Price: item.ENTSOE_DE_DAM_Price,
        ENTSOE_GR_DAM_Price: item.ENTSOE_GR_DAM_Price,
        ENTSOE_FR_DAM_Price: item.ENTSOE_FR_DAM_Price,
      }))
      this.data = updatedData
    },

    edit(id) {
      const record = this.data.find((item) => item.id === id)
      if (record) {
        this.editableData[id] = { ...record }
      }
    },

    save(id) {
      const index = this.data.findIndex((item) => item.id === id)
      if (index !== -1) {
        Object.assign(this.data[index], this.editableData[id])
        delete this.editableData[id]
      }
    },

    cancel(id) {
      delete this.editableData[id]
    },

    setSelectedRangeDate(dates) {
      this.selectedRangeDate = dates
    },

    filterColumns(item) {
      const filteredItem = { id: item.id, dateTime: item.dateTime }
      if (this.visibleSeries.ENTSOE_DE_DAM_Price)
        filteredItem.ENTSOE_DE_DAM_Price = item.ENTSOE_DE_DAM_Price
      if (this.visibleSeries.ENTSOE_GR_DAM_Price)
        filteredItem.ENTSOE_GR_DAM_Price = item.ENTSOE_GR_DAM_Price
      if (this.visibleSeries.ENTSOE_FR_DAM_Price)
        filteredItem.ENTSOE_FR_DAM_Price = item.ENTSOE_FR_DAM_Price
      return filteredItem
    },
  },
})
