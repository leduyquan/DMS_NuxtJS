<template>
  <div class="page-side">
    <h1 class="page-title">
      Role Management
    </h1>
    <div class="page-content">
      <div class="page-filter">
        <h3>Filter Option</h3>
        <RoleFilter @filter="onFilter" />
      </div>
      <div class="p-top-40 p-bottom-20">
        <nuxt-link :to="{name: 'role-id', params: {id: 'create'}}">
          <a-button type="primary">
            Add new role
          </a-button>
        </nuxt-link>
      </div>
      <div class="page-table">
        <RoleTable :data="data" />
      </div>
      <app-pagination
        :current-page="currentPage"
        :limit="limit"
        :total="pagination.total"
        @onChangePage="onChangePage"
      />
    </div>
  </div>
</template>
<script>
  import list from '@/mixins/list'
  import RoleFilter from '@/components/pages/role/Filter'
  import RoleTable from '@/components/pages/role/Table'
  export default {
    name: 'Role',
    components: {
      RoleFilter,
      RoleTable
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
        loading: false
      }
    },
    methods: {
      async getDataFromApi(params = {}) {
        return await this.$axios.$get('/account/roles', {
          params: {
            ...params
          }
        })
      },
      getOptions() {},
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
