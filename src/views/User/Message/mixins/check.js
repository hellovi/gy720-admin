import { MESSAGE } from '@/store/mutationTypes'

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

    /**
     * 删除单个消息或已选中的所有消息，若传入id，则为前者，否则为后者
     * 接口请求成功后，应根据id同时删去store中的对应数据
     */
    remove(type, url, removeId) {
      this.loading = removeId || 'remove-selected'

      const ids = removeId ? [removeId] : this.checked

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post(url, {
          ids: ids.map(id => ({ id })),
        })
          .then(() => {
            this.$store.commit(MESSAGE.DELETE, { type, ids })
            this.$message.success('操作成功')
          })
          .catch(() => {
            this.$message.error('操作出错')
          })
          .then(() => {
            this.loading = -1
          })
      })
        .catch(() => {
          this.loading = -1
        })
    },
  },
}
