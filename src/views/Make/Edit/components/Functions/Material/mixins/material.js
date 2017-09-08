import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  data() {
    return {
      item: {}, // 当前活动item（被编辑、被试听）

      dialog: {
        edit: false,
        play: false,
      },

      options: [
        { id: 1, name: 'LOGO' },
        { id: 2, name: '平面地图' },
        { id: 7, name: '热点图标' },
        { id: 3, name: '朋友圈小图标' },
        { id: 4, name: '天空/地面广告' },
      ],

      form: {
        title: '',
        tag_id: 1,
      },
      rules: {
        title: [
          { required: true, trigger: 'blur', message: '素材名称不能为空' },
        ],
      },

    }
  },

  computed: {
    ...mapState({
      invoked: state => state.edit.material.invoked,
    }),

    list() {
      return this.$store.state.edit.material.materialData[this.activeType]
    },

    isEmpty() {
      return !this.loading && (!this.list.data || !this.list.data.length)
    },

    // 判断被编辑的素材能够移动到其它类型，只有this.options中的类型才可以互相移动
    canMove() {
      return this.options.some(option => option.id === this.form.tag_id)
    },
  },

  methods: {
    editItem(item) {
      this.item = item
      this.form = {
        title: item.title,
        tag_id: item.tag_id,
      }
      this.dialog.edit = true
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch(EDIT.MATERIAL.UPDATE, {
            id: this.item.id,
            data: this.form,
            isMove: this.item.tag_id !== this.form.tag_id,
          })
            .then(() => {
              this.dialog.edit = false
              this.$message.success('操作成功')
            })
        }
      })
    },
  },
}
