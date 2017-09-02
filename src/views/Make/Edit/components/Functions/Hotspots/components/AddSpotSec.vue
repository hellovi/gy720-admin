<template>
  <div class="addspots-sec">

    <el-form ref="spotForm" :rules="rules" :model="form" label-width="80px">
      <!--名称图标固定显示-->
      <el-form-item label="热点名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入热点名称"></el-input>
      </el-form-item>

      <!-- <el-form-item label="热点图标" prop="icon.id"
       :rules="[ { required: true, message: '请输入热点名称', trigger: 'blur' }]"> -->
      <el-form-item label="热点图标" prop="icon">
        <el-button type="primary" size="small" @click="openIconModal">选择</el-button>
        <img v-if = "activeIcon.thumb"
          class="addspots-sec__icon"
          :src="activeIcon.thumb"
          alt="activeIcon.icon_id"/>
      </el-form-item>

      <el-form-item :label="typeSec" v-if="type === 1" prop="scene">
        <el-button type="primary" size="small">选择</el-button>
        <!--下面区域-->
      </el-form-item>

      <el-form-item :label="typeSec" v-if="type === 3">
        <el-input v-model="form.url" placeholder="http://"></el-input>
      </el-form-item>

      <el-form-item :label="typeSec" v-if="[6, 5, 8].indexOf(type) >= 0">
        <el-button type="primary" size="small">选择</el-button>
      </el-form-item>

      <el-form-item>
        <el-button  @click="switchStep(1)">上一步</el-button>
        <el-button type="primary" @click="submitForm('spotForm')">确定</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj
 * @version 2017-08-14
 */
import { mapState } from 'vuex'
// import { EDIT } from '@/store/mutationTypes'
import modal from '../../../../mixins/modal'

export default {
  name: 'edit-functions__addSpotSec',

  mixins: [modal],

  props: {
    type: {
      type: Number,
      default: 1,
    },
    typeSec: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      form: {
        name: '',
        url: '',
        icon: { id: '', name: '', url: '' },
        scene: {},
      },

      rules: {
        name: [
          { required: true, message: '请输入热点名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
        ],
        // icon: [
        //   {
        //     type: 'object',
        //     required: true,
        //     fields: {
        //       id: { required: true, message: '请选择热点图标', trigger: 'blur' },
        //     },
        //   },
        // ],
        scene: [
          { type: 'object', required: true, message: '请选择链接场景', trigger: 'blur' },
        ],
      },

      hotSpots: {},
    }
  },

  computed: {
    ...mapState({
      activeIcon: state => state.edit.hotspots.activeIcon,
      panoId: state => state.edit.panoInfo.hash_pano_id,
    }),
  },

  methods: {
    openIconModal() {
      this.$emit('open-modal', 'icon')
    },

    switchStep(step) {
      this.$emit('switchStep', step)
    },

    prepareSpotsData() {
      // eslint-disable-next-line
      const krpanoWin = window.__krpano
      const screenX = document.documentElement.clientWidth / 2
      const screenY = document.documentElement.clientHeight / 2
      // 转换屏幕坐标为球面坐标
      krpanoWin.set('atx', screenX)
      krpanoWin.set('aty', screenY)
      krpanoWin.call('screentosphere(atx, aty, ath, atv)')
      const sphereX = krpanoWin.get('ath')
      const sphereY = krpanoWin.get('atv')
      // edit 需要 hot_id
      const postSpotsData = {
        pano_id: this.panoId,
        scene_id: this.$store.getters.activeScene.id,
        hot_name: this.form.name,
        ath: sphereY,
        atv: sphereX,
        icon_id: this.activeIcon.icon_id,
        type_id: this.type, // 热点类型
        v: this.form.url, // 为超链接和多媒体时必填?
        // data_id: 19, //type_id为1,5,6时必填 //全部写在data_id里面
        // 1，5，6，8 时，data_id字段为它们对应的ID；当热点类型为：3时，data_id 为链接地址
        // diy_src: '', //自定义热点图标url
      }
      return postSpotsData
    },

    submitHotSpots() {
      const data = this.prepareSpotsData()
      this.$http.post('/user/scenehotspot', data)
        .then(({ result }) => {
          this.closeModal('hotspots')
          this.hotSpots = result

          // 这里接口返回的字段没有相应的图片??
          // this.hotSpots.url = 'http://img-qiniu.gy720.com//statics/krpano/hoticon/g-3-2.png'
          // 图片比例的问题（线上图片好了就可以用了）
          // this.hotSpots.scale = '0.5'

          // eslint-disable-next-line
          const krpanoWin = window.__krpano
          krpanoWin.removehotspot(`hotspot_${this.hotSpots.id}`)
          krpanoWin.hotspots[this.hotSpots.id] = null
          // 接口格式有变
          // this.hotSpots.hot_id = this.hotSpots.id
          this.hotSpots.pano_id = this.panoId
          krpanoWin.adddesignhotspot(this.hotSpots)
        })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitHotSpots()
        } else {
          // console.log('error submit!!')
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.addspots-sec {
  &__icon {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: rgb(99, 99, 99);
  }

  /*调整对齐，这个要看下有没有更好的方法可以float，基线对齐*/
  .el-form-item__content {
    & .el-button,
    & img {
      vertical-align: middle;
    }
  }
}

</style>
