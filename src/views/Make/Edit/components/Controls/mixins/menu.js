/**
 * @file 右上、左下菜单的增、删、改、排序mixin
 * @summary 增、改操作只是做弹窗打开，和前置数据处理
 *
 * @author huojinzhao
 */

import { EDIT } from '@/store/mutationTypes'
import deleteItem from '@/mixins/deleteItem'

const { MENU } = EDIT

export default {
  mixins: [deleteItem],

  data: () => ({
    menuLocation: '',
  }),

  computed: {
    menulist() {
      return this.$store.state
        .edit.menu[this.menuLocation]
    },
  },

  methods: {
    // 重定位 menu.state.position
    locateMenuPosition() {
      this.$store.commit(MENU.LOCATE, this.menuLocation)
    },

    openMenuEdition(editionInfo) {
      this.locateMenuPosition()

      if (editionInfo) {
        this.$store.commit(MENU.PREPARE_EDITION, {
          editionInfo,
          editionType: 'patch',
        })
      } else {
        this.$store.commit(MENU.PREPARE_EDITION, {
          editionInfo: {},
          editionType: 'create',
        })
      }
      this.openModal('menu')
    },

    onDeleteMenu(id) {
      this.locateMenuPosition()

      this.onDeleteItem({
        title: '删除菜单',
        message: '此操作将永久删除该分类，是否继续？',
        itemId: id,
        ajax: this.deleteMenu,
      })
    },

    deleteMenu(id) {
      return this.$store.dispatch(MENU.DELETE, id)
    },

    // 这里需要注意，drag操作会直接修改store数据
    onResortMenulist() {
      this.$store.dispatch(MENU.REPLACE_LIST, this.menulist)
    },
  },
}
