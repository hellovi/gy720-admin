export default {
  data() {
    return {
      fetching: false,
    }
  },

  computed: {
    isEmpty() {
      return !this.fetching && (!this.list.data || !this.list.data.length)
    },
  },

  methods: {
    pageChange(page) {
      this.$router.push({
        query: { ...this.$route.query, page },
      })
    },

    handleGetData(route) {
      this.fetching = true
      this.getData(route)
        .then(() => {
          this.fetching = false
        })
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.handleGetData(to)
    next()
  },

  created() {
    this.handleGetData(this.$route)
  },
}
