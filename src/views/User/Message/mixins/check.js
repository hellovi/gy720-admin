export default {
  data() {
    return {
      checked: [],
    }
  },

  computed: {
    allChecked() {
      return this.checked.length > 0 && this.checked.length === this.list.data.length
    },
  },

  methods: {
    check(id) {
      if (this.checked.includes(id)) {
        this.checked = this.checked.filter(item => item !== id)
      } else {
        this.checked.push(id)
      }
    },

    checkAll() {
      if (this.allChecked) {
        this.checked = []
      } else {
        this.checked = this.list.data.map(item => item.id)
      }
    },
  },
}
