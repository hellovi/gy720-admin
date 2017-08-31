<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="colSpan" v-for="(list, index) in tree" :key="index">
      <el-select v-model="areaData[index]"
                 :filterable="filterable"
                 @change="getAreaData(areaType[index], areaData[index])"
                 :loading="areaLoading[areaType[index]]"
                 placeholder="请选择">
        <el-option
          v-for="item in positionData[areaType[index]]"
          :key="item.area_id"
          :label="item.area_name"
          :value="item.area_id">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
  /**
   * 地区选择器
   * @author  chenliangshan
   * @version 2017/08/10
   */

  import { strToArr } from '../utils'

  const isEmpty = obj => Object.keys(obj).length

  export default {
    name: 'address-select',
    props: {
      value: {
        type: String,
        default: null,
      },
      tree: {
        type: Number,
        default: 3,
      },
      optionItem: {
        type: Object,
        default() {
          return {}
        },
      },
      filterable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      const areaType = ['region', 'city', 'area', 'town']
      const areaLoading = {}
      let positionData = {}

      if (isEmpty(this.optionItem)) {
        areaType.forEach((val) => {
          positionData[val] = []
          areaLoading[val] = false
        })
      } else {
        positionData = { ...this.optionItem }
      }

      areaType.forEach((val) => {
        areaLoading[val] = false
      })

      return {
        // 地区类型：省，市，区，乡镇
        areaType,
        areaLoading,
        positionData,
        areaData: strToArr(this.value),
        autoLoading: isEmpty(this.optionItem),
        colSpan: parseInt((24 - this.tree) / this.tree, 10),
      }
    },
    watch: {
      value(val) {
        this.areaData = strToArr(val)
      },
      areaData(val) {
        let areaData = val
        const idx = val.findIndex((v, i) => strToArr(this.value)[i] !== v)
        const areaType = this.areaType.filter((v, i) => i > idx)

        if (idx !== -1) {
          areaData = this.areaData.filter((v, i) => i <= idx)
          // 清除子级数据
          areaType.forEach((v) => {
            this.positionData[v] = []
          })
        }

        const value = areaData.length ? areaData.join(',') : ''

        this.$emit('input', value)
      },
    },
    methods: {
      // 初始化
      init() {
        // 判断是否初始加载省级数据
        if (this.autoLoading) {
          this.getAreaData('region', 0, true)
        }
      },
      // 获取地区数据
      getAreaData(type = 'region', id = 0, status = false) {
        const idx = this.areaType.indexOf(type)
        const nextType = this.areaType.find((val, index) => index > idx)

        if ((idx + 1) < this.tree && (id || status)) {
          // 开启加载提示
          this.areaLoading[this.areaType[idx + 1]] = true
          this.$http.post('/user/area', { parent_id: id })
            .then((res) => {
              const areas = res.result
              if (status) {
                this.positionData[type] = areas
              } else if (nextType) {
                this.positionData[nextType] = areas
              }
              // 关闭加载提示
              this.areaLoading[this.areaType[idx + 1]] = false
            })
        }
      },
    },
    created() {
      this.init()
    },
  }
</script>
