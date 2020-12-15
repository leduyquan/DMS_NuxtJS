<template>
  <div class="page-side">
    <h1 class="page-title">
      User Management
    </h1>
    <div class="page-content">
      <div class="page-filter">
        <h3>Filter Option</h3>
        <UserFilter :options="options" @filter="onFilter" />
      </div>
      <div class="p-top-20 p-bottom-20">
        <a-button type="primary" @click="openInviteModal">
          Invite new user
        </a-button>
      </div>
      <div class="page-table">
        <UserTable :data="data" :options="options" @onUpdateStatus="onUpdateStatus" />
      </div>
      <app-pagination
        :current-page="currentPage"
        :limit="limit"
        :total="pagination.total"
        @onChangePage="onChangePage"
      />
    </div>
    <Invite ref="plateModal" :options="options" />
  </div>
</template>
<script>
  import list from '@/mixins/list'
  import UserFilter from '@/components/pages/user/Filter'
  import UserTable from '@/components/pages/user/Table'
  import Invite from '@/components/pages/user/modal/Invite'
  export default {
    name: 'User',
    components: {
      UserFilter,
      UserTable,
      Invite
    },
    mixins: [
      list
    ],
    async fetch() {
      await this.getData(null, true)
    },
    data() {
      return {
        keyword: '',
        currentPage: 1,
        limit: 12,
        loading: false,
        options: {
          region: [],
          zone: [],
          province: [],
          role: [],
          warehouse: []
        },
        paramFilters: {}
      }
    },
    methods: {
      async getDataFromApi(params = {}) {
        return await this.$axios.$get('/account/users', {
          params: {
            ...params
          }
        })
      },
      async getOptions() {
        const formatFilter = array => array.map(item => ({...item, label: item.name, value: item.id}))
        const regionData = await this.$axios.$get('master-data/location/regions/auto-complete/')
        this.options.region = formatFilter(regionData.data)
        const zoneData = await this.$axios.$get('master-data/location/zones/auto-complete/')
        this.options.zone = formatFilter(zoneData.data)
        const provinceData = await this.$axios.$get('master-data/location/provinces/auto-complete/')
        this.options.province = formatFilter(provinceData.data)
        const roleData = await this.$axios.$get('account/roles/auto-complete/')
        this.options.role = formatFilter(roleData.data)
        const warehouseData = await this.$axios.$get('warehouse/warehouses/auto-complete/')
        this.options.warehouse = formatFilter(warehouseData.data)
      },
      onFilter(val) {
        this.paramFilters = {...val, is_active: (val.is_active === 0 || val.is_active === 1) ? !!val.is_active : ''}
        this.applyFilter()
      },
      applyFilter() {
        this.getData(this.cleanObject(this.paramFilters))
      },
      onChangePage({currentPage, pageSize}) {
        this.currentPage = currentPage
        this.limit = pageSize
        const params = {
          page: currentPage,
          limit: pageSize
        }
        this.getData(params)
      },
      openInviteModal() {
        const modalRef = this.$refs.plateModal
        modalRef.visible = true
      },
      async onUpdateStatus(val) {
        try {
          this.$nuxt.$loading.start()
          await this.$axios.$post(`account/users/${val.id}/active/`, {is_active: !val.active})
          this.$notification.success({message: 'Success', class: 'toast-success'})
          const params = {page: this.currentPage, limit: this.limit}
          this.getData(params)
        } catch (error) {
          this.$notification.error({message: 'Action unsuccessfully. Please try again!', class: 'toast-error'})
        } finally {
          this.$nuxt.$loading.finish()
        }
      }
    }
  }
</script>
