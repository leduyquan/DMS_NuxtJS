export default {
  data() {
    return {
      pagination: {
        pageSize: 12,
        total: 0
      },
      data: []
    }
  },
  methods: {
    async getData(params = {page: 1, limit: 12}, isLoadOptions) {
      const query = {
        ...params,
        ...this.$route.query
      }
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      const {data, pagination} = await this.getDataFromApi(query)
      if (isLoadOptions) {
        await this.getOptions()
      }
      this.pagination = {
        ...this.pagination,
        total: pagination.total_items
      }
      this.data = data || []
      this.$nuxt.$loading.finish()
    },
    onReset() {
      this.pagination = {
        ...this.pagination,
        current: 1
      }
    },
    cleanObject(obj) {
      const propNames = Object.getOwnPropertyNames(obj)
      for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i]
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName]
        }
      }
      return obj
    }
  }
}
