<template>
  <div class="edit-functions__material__wrap">
    <el-row :gutter="10" class="edit-functions__material__data"  v-loading="loading">
        <el-col :span="4" v-for="(item, index) in dataList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="$url.static(item.file_path)" class="edit-functions__material__image"/>
            <div>
              <div class="bottom clearfix">
                 <h6>{{ item.title }}</h6>
                <el-button
                  type="text" class="button"
                  v-show="selectStatus"
                  @click="selectMater(item.id, item.file_path)">
                  选择
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
     </el-row>
    <el-button type="primary" size="small" @click="$emit('on-manage', true)">管理3D物品</el-button>
  </div>
</template>

<script>
/**
 * 高级编辑 - author
 * @version 2017-08-25
 */
import { mapState } from 'vuex'
import { EDIT } from '@/store/mutationTypes'

export default {
  name: 'edit-functions__material--object3d',

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      type: state => state.edit.material.type,
      selectStatus: state => state.edit.material.selectStatus,
    }),

    dataList() {
      return this.$store.state.edit.material.materialData[this.type].data
    },

    params() {
      // 这里需要加其他参数???
      return '?'
    },

  },

  methods: {
    initMaterial(page) {
      this.loading = true
      const params = page ? `${this.params}&page=${page}` : this.params
      this.$store.dispatch(EDIT.MATERIAL.INIT.NORMALS, { type: 'objects', params })
        .then(() => {
          this.loading = false
        })
    },
  },

  created() {
    this.initMaterial(1)
  },

}
</script>

<style lang="postcss">

</style>
