<template>
  <div class="page-side">
    <h1 class="page-title">
      Customer Management
    </h1>
    <div class="page-content">
      <div class="page-filter">
        <h3>Filter Option</h3>
        <CustomerFilter :options="options" @filter="onFilter" />
      </div>
      <div class="p-top-40 p-bottom-20">
        <a-button type="primary" @click="openCreateModal">
          Add new customer
        </a-button>
      </div>
      <div class="page-table">
        <CustomerTable :data="data" :options="options" />
      </div>
      <app-pagination
        :current-page="currentPage"
        :limit="limit"
        :total="pagination.total"
        @onChangePage="onChangePage"
      />
    </div>
    <Item ref="plateModal" :options="options" />
  </div>
</template>
<script>
  import list from '@/mixins/list'
  import CustomerFilter from '@/components/pages/customer/Filter'
  import CustomerTable from '@/components/pages/customer/Table'
  import Item from '@/components/pages/customer/modal/Item'
  export default {
    name: 'Customer',
    components: {
      CustomerFilter,
      CustomerTable,
      Item
    },
    mixins: [
      list
    ],
    async fetch() {
      await this.getData()
    },
    data() {
      return {
        keyword: '',
        currentPage: 1,
        limit: 12,
        requestParams: {},
        loading: false,
        options: {
          region: [],
          zone: [],
          province: [],
          role: [],
          warehouse: []
        }
      }
    },
    methods: {
      async getDataFromApi(params = {}) {
        return await {
          data: [
            {
              id: '1',
              customer_name: 'Quan',
              phone_number: 'name',
              shop_name: 'name',
              address: 'name',
              region: 'name',
              zone: 'name',
              province: 'name',
              is_active: '1'
            }
          ],
          message: 'OK',
          pagination: {page: 1, limit: 12, total_pages: 1, total_items: 12},
          status_code: 200,
          success: true,
          validation_errors: {}
        }
        // return await this.$axios.$get('/account/customers', {
        //   params: {
        //     ...params
        //   }
        // })
      },
      async getOptions() {
        const formatFilter = array => array.map(item => ({...item, label: item.name, value: item.id}))
        const regionData = await this.$axios.$get('master-data/location/regions/auto-complete')
        this.options.region = formatFilter(regionData.data)
        const zoneData = await this.$axios.$get('master-data/location/zones/auto-complete')
        this.options.zone = formatFilter(zoneData.data)
        const provinceData = await this.$axios.$get('master-data/location/provinces/auto-complete')
        this.options.province = formatFilter(provinceData.data)
        const roleData = await this.$axios.$get('account/roles/auto-complete')
        this.options.role = formatFilter(roleData.data)
        const warehouseData = await this.$axios.$get('warehouse/warehouses/auto-complete')
        this.options.warehouse = formatFilter(warehouseData.data)
      },
      onFilter(val) {
        console.log('params', val)
      },
      onChangePage({currentPage, pageSize}) {
        this.currentPage = currentPage
        this.limit = pageSize
        const params = {
          ...this.requestParams,
          page: currentPage,
          limit: pageSize
        }
        this.getData(params)
      },
      openCreateModal() {
        const modalRef = this.$refs.plateModal
        modalRef.visible = true
      }
    }
  }
</script>
