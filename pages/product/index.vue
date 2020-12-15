<template>
  <div class="page-side">
    <h1 class="page-title">
      Product Management
    </h1>
    <div class="page-content">
      <div class="page-filter">
        <h3>Filter Option</h3>
        <ProductFilter :options="options" @filter="onFilter" />
      </div>
      <div class="p-top-40 p-bottom-20">
        <a-button type="primary" @click="openCreateModal">
          Add new customer
        </a-button>
      </div>
      <div class="page-table">
        <ProductTable :data="data" :options="options" />
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
  import ProductFilter from '@/components/pages/product/Filter'
  import ProductTable from '@/components/pages/product/Table'
  import Item from '@/components/pages/product/modal/Item'
  export default {
    name: 'Product',
    components: {
      ProductFilter,
      ProductTable,
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
          product_type: []
        }
      }
    },
    methods: {
      async getDataFromApi(params = {}) {
        return await {
          data: [
            {
              id: '1',
              product_name: 'Quan',
              product_type: 'name',
              price: 'name',
              pricing_unit: 'name',
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
        const productType = await this.$axios.$get('master-data/location/regions/auto-complete')
        this.options.product_type = formatFilter(productType.data)
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
