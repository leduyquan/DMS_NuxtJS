<template>
  <div class="page-side">
    <h1 class="page-title">
      Customer details
    </h1>
    <div class="page-content">
      <div class="page-description">
        Customer information
      </div>
      <div class="page-information">
        <div class="ant-row customer-form">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="ant-col ant-col-xs-24 ant-col-md-12 ant-col-xl-8 customer-field"
          >
            <div class="customer-field__title">
              {{ item.label }}
            </div>
            <div class="customer-field__input">
              <template v-if="item.type === 'input'">
                <a-input v-model="params[item.value]" disabled />
              </template>
              <template v-if="item.type === 'textarea'">
                <a-textarea v-model="params[item.value]" disabled />
              </template>
              <template v-if="item.type === 'select'">
                <a-select v-model="params[item.value]" disabled>
                  <a-select-option v-for="(op,idx) in item.options" :key="idx" :value="op.value">
                    <span>{{ op.label }}</span>
                  </a-select-option>
                </a-select>
              </template>
              <template v-if="item.type === 'radio'">
                <a-radio-group v-model="params[item.value]" disabled>
                  <a-radio v-for="(op,idx) in item.options" :key="idx" :value="!!op.value">
                    {{ op.label }}
                  </a-radio>
                </a-radio-group>
              </template>
            </div>
          </div>
        </div>
        <div class="customer-action">
          <a-button type="primary" @click="handleOk">
            Edit
          </a-button>
        </div>
        <div class="customer-tab">
          <a-tabs type="card" @change="setTabActive">
            <a-tab-pane key="order" tab="Order History">
              <div class="tab-content">
                <div class="tab-filter m-bottom-20">
                  <OrderFilter :options="options" @filter="onFilter" />
                </div>
                <div class="page-table">
                  <OrderTable :data="data" />
                </div>
                <app-pagination
                  :current-page="currentPage"
                  :limit="limit"
                  :total="pagination.total"
                  @onChangePage="onChangePage"
                />
              </div>
            </a-tab-pane>
            <a-tab-pane key="financial" tab="Financial History">
              <div class="tab-content">
                <div class="tab-filter m-bottom-20">
                  <FinancialInfo />
                </div>
                <div class="tab-filter m-bottom-20">
                  <FinancialFilter :options="options" @filter="onFilter" />
                </div>
                <div class="page-table">
                  <FinancialTable :data="data" />
                </div>
                <app-pagination
                  :current-page="currentPage"
                  :limit="limit"
                  :total="pagination.total"
                  @onChangePage="onChangePage"
                />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from '@/mixins/list'
  import OrderFilter from '@/components/pages/customer/detail/order-history/Filter'
  import OrderTable from '@/components/pages/customer/detail/order-history/Table'
  import FinancialInfo from '@/components/pages/customer/detail/financial-history/Information'
  import FinancialFilter from '@/components/pages/customer/detail/financial-history/Filter'
  import FinancialTable from '@/components/pages/customer/detail/financial-history/Table'
  import {isActive} from '@/constants/common'
  export default {
    components: {
      OrderFilter,
      OrderTable,
      FinancialInfo,
      FinancialFilter,
      FinancialTable
    },
    mixins: [
      list
    ],
    async fetch() {
      await this.getData()
    },
    data() {
      return {
        id: this.$route.params.id,
        items: [
          {value: 'customer_name', label: 'Customer name', type: 'input'},
          {value: 'district', label: 'District', type: 'select', options: []},
          {value: 'shop_name', label: 'Shop name', type: 'input'},
          {value: 'word', label: 'Word', type: 'select', options: []},
          {value: 'phone_number', label: 'Phone number', type: 'input'},
          {value: 'address', label: 'Address', type: 'textarea'},
          {value: 'region', label: 'Region', type: 'select', options: []},
          {value: 'warehouse', label: 'Warehouse', type: 'select', options: []},
          {value: 'zone', label: 'Zone', type: 'select', options: []},
          {value: 'route', label: 'Route', type: 'select', options: []},
          {value: 'province', label: 'Province', type: 'select', options: []},
          {value: 'is_active', label: 'Status', type: 'radio', options: isActive}
        ],
        params: {
          customer_name: 'quan',
          district: '',
          shop_name: '',
          word: '',
          phone_number: '',
          address: 'hahah',
          region: 'lauy ho',
          warehouse: '',
          zone: '',
          route: '',
          province: '',
          is_active: true
        },
        keyTab: 'order',
        currentPage: 1,
        limit: 12,
        requestParams: {},
        options: {
          warehouse: [],
          payment_type: [],
          financial_type: []
        }
      }
    },
    methods: {
      handleOk() {
      },
      setTabActive(key) {
        this.keyTab = key
        this.getData()
      },
      // For Order history tab
      async getDataFromApi(params = {}) {
        if (this.keyTab === 'order') {
          return await {
            data: [
              {
                id: '1',
                order_no: 'Quan',
                order_from: 'name',
                sales: 'name',
                order_to: 'name',
                warehouse: 'name',
                amount_from: 'name',
                payment_type: 'name',
                amount_to: '1'
              }
            ],
            message: 'OK',
            pagination: {page: 1, limit: 12, total_pages: 1, total_items: 12},
            status_code: 200,
            success: true,
            validation_errors: {}
          }
        } else {
          return await {
            data: [
              {
                id: '1',
                financial_no: 'Quan',
                created_date: 'name',
                financial_type: 'name',
                amount: 'name',
                related_order: 'name'
              }
            ],
            message: 'OK',
            pagination: {page: 1, limit: 12, total_pages: 1, total_items: 12},
            status_code: 200,
            success: true,
            validation_errors: {}
          }
        }
        // return await this.$axios.$get('/account/customers', {
        //   params: {
        //     ...params
        //   }
        // })
      },
      async getOptions() {
        const formatFilter = array => array.map(item => ({...item, label: item.name, value: item.id}))
        if (this.keyTab === 'order') {
          const warehouseData = await this.$axios.$get('warehouse/warehouses/auto-complete')
          this.options.warehouse = formatFilter(warehouseData.data)
          const paymentTypeData = await this.$axios.$get('master-data/location/regions/auto-complete')
          this.options.payment_type = formatFilter(paymentTypeData.data)
        } else {
          const financialType = await this.$axios.$get('master-data/location/regions/auto-complete')
          this.options.financial_type = formatFilter(financialType.data)
        }
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
      }
    }
  }
</script>
