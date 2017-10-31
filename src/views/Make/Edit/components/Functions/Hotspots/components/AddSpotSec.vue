<template>
  <div class="addspots-sec">
    <app-form-alert
      label-width="80px"
      :contents="formErrors"
    ></app-form-alert>
    <el-form ref="spotForm" :rules="rules" :model="form" label-width="80px">
      <!--名称图标固定显示-->
      <el-form-item label="热点名称" prop="hot_name">
        <el-input v-model="form.hot_name" placeholder="请输入热点名称"></el-input>
      </el-form-item>

      <!-- <el-form-item label="热点图标" prop="icon.id"
       :rules="[ { required: true, message: '请输入热点名称', trigger: 'blur' }]"> -->
      <el-form-item label="热点图标" prop="icon_info">
        <el-button type="primary" size="small" @click="openIconModal">选择</el-button>
        <img v-if="activeIcon.thumb"
          class="addspots-sec__icon"
          v-qiniu-src="activeIcon.thumb"
          alt="activeIcon.icon_id"/>
      </el-form-item>

      <!--场景漫游-->
      <el-form-item :label="secInfo" v-if="type === typeConfig.SCENE" prop="data_id">
        <el-button type="primary" size="small" @click="modal.sceneLink = true">选择</el-button>
        <!--下面区域-->
        <div v-show="scenesLink.status" class="addspots-sec__scenes-link">
          <img :src="$url.host(activeScene.thumb)" alt=""/>
          <i class="iconfont">&#xe60d;</i>
          <img :src="$url.host(scenesLink.thumb)" alt=""/>
        </div>
      </el-form-item>

      <!--超链接-->
      <el-form-item :label="secInfo" v-if="type === typeConfig.LINK" prop="data_id">
        <el-input v-model="form.data_id" placeholder="http://"></el-input>
      </el-form-item>

      <!--图文信息|物品3D|音频-->
      <el-form-item :label="secInfo" prop="data_id"
        v-if="[typeConfig.ARTICLE,typeConfig.ROTATE,typeConfig.AUDIO].includes(type)"
      >
        <el-button type="primary" size="small" @click="selectMater(type)">选择</el-button>
        <span class="addspots-sec__title">{{this.form.title}}</span>
      </el-form-item>

      <!--视频-->
      <el-form-item
        class="tip-wrapper"
        :label="secInfo"
        v-if="type === typeConfig.VIDEO"
        prop="data_id"
      >
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.data_id"
          placeholder="请输入视频通用分享地址(暂时支持优酷、腾讯视频)"
        ></el-input>
        <el-tooltip
          class="tip-mark-plus"
          popper-class="tip-mark-plus__content"
          transition="move-in-linear"
          placement="right-start"
        >
          <span>?</span>
          <a slot="content" :href="`${configHost.origin}`" target="_blank">查看详细教程>></a>
        </el-tooltip>
      </el-form-item>

      <!--相册-->
      <el-form-item
        :label="secInfo"
        v-if="type === typeConfig.PHOTO"
        prop="data_id"
      >
        <div class="addspots-sec__photo">
          <el-button type="primary" size="small" @click="selectMater(type)">选择</el-button>
          <div class="addspots-sec__photo-item" v-if="isArray(form.data_id) && form.data_id.length">
            <span class="tip-wrapper">
              <span>已选图片列表</span>
              <el-tooltip
                class="tip-mark-plus"
                popper-class="tip-mark-plus__content"
                transition="move-in-linear"
                placement="right-start"
              >
                <span>?</span>
                <div slot="content">最多支持选择20张图片<br/>拖拽图片可以排序</div>
              </el-tooltip>
            </span>
            <div>
              <draggable v-model="form.data_id">
                <transition-group tag="ul" class="addspots-photo-list list">
                  <li v-for="list in form.data_id" :key="list.id">
                    <img :src="$url.static(list.file_path)" width="80" height="50" alt="list.title">
                    <i role="button" class="iconfont hover-warning" @click.stop="removeDataId(list)">&#xe615;</i>
                  </li>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </el-form-item>

      <!--底部按钮-->
      <el-form-item>
        <el-button  @click="switchStep">上一步</el-button>
        <el-button type="primary" @click="submitForm('spotForm')">确定</el-button>
      </el-form-item>

    </el-form>

     <!--场景链接弹窗-->
    <el-dialog
      title="选择漫游场景"
      custom-class="hotspot-scene-dialog"
      :modal="false"
      :visible.sync="modal.sceneLink"
      top="0%"
    >
      <scene-link @scene-link="sceneLink"></scene-link>
    </el-dialog>

  </div>
</template>

<script>
/**
 * 高级编辑 - hotspots
 * @author yj | chenliangshan
 * @version 2017-09-08
 */
import { mapState, mapGetters } from 'vuex'
import { Url } from '@/utils'
import { EDIT } from '@/store/mutationTypes'
import Draggable from 'vuedraggable'
import modal from '../../../../mixins/modal'
import SceneLink from './SceneLink'

export default {
  name: 'edit-functions__addSpotSec',

  mixins: [modal],

  components: {
    SceneLink,
    Draggable,
  },

  props: {
    type: {
      type: Number,
      required: true,
    },
    secInfo: {
      type: String,
      required: true,
    },
    typeConfig: {
      type: Object,
      required: true,
    },
    editInfo: {
      type: Object,
    },
  },

  data() {
    return {
      configHost: Url.configHost,

      formErrors: {},

      form: {
        hot_name: null,
        data_id: '',
        title: null,
        icon_info: { thumb: null, id: null },
      },

      rules: {
        hot_name: [
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
        ],
        data_id: [
          { type: this.ruleType('data_id'), required: true, message: this.preDataRule(), trigger: 'blur' },
        ],
        icon_info: [
          {
            type: 'object',
            required: true,
            fields: {
              id: { required: true, type: 'string', message: '请选择热点图标', trigger: 'change' },
            },
          },
        ],
      },

      hotSpots: {},

      modal: {
        sceneLink: false,
      },

      scenesLink: {
        status: false,
        thumb: '',
      },

      photoSort: [],
    }
  },

  computed: {
    ...mapState({
      activeIcon: state => state.edit.hotspots.activeIcon,
      panoId: state => state.edit.panoInfo.hash_pano_id,
      scenes: state => state.edit.scene.list,
    }),

    ...mapGetters(['activeScene']),

    editStatus() {
      return Object.keys(this.editInfo).length > 0
    },
  },

  watch: {
    activeIcon: {
      handler(val) {
        this.form.icon_info.id = val.icon_id
      },
      deep: true,
    },
  },

  methods: {
    isArray(data) {
      return Object.prototype.toString.call(data) === '[object Array]'
    },

    openIconModal() {
      this.$emit('open-modal', 'icon')
    },

    switchStep() {
      this.$refs.spotForm.resetFields()
      this.$store.commit(EDIT.HOTSPOTS.SELECT.ICON, {})
      this.$emit('switch-step', 1)
    },

    selectMater(type) {
      const invokeMater = (kind, multiple) => {
        if (multiple) {
          // 多选素材
          this.$store.dispatch(EDIT.MATERIAL.INVOKES, kind)
            .then((res) => {
              this.form = { ...this.form, data_id: [...res, ...this.form.data_id] }
              this.$nextTick(() => {
                // 更新校验状态
                this.$refs.spotForm.validateField('data_id')
              })
            })
        } else {
          this.$store.dispatch(EDIT.MATERIAL.INVOKE, kind)
            .then(({ id, title }) => {
              this.form = { ...this.form, data_id: `${id}`, title }
            })
        }
      }
      switch (type) {
        case this.typeConfig.ARTICLE:
          // 图文信息
          invokeMater('article')
          break
        case this.typeConfig.AUDIO:
          // 音频素材
          invokeMater('audio')
          break
        case this.typeConfig.ROTATE:
          // 物品3D
          invokeMater('rotate')
          break
        case this.typeConfig.PHOTO:
          // 相册-多选
          invokeMater('photo', true)
          break
        default:
          break
      }
    },

    errorsHandler(errors) {
      this.formErrors = errors
    },

    sceneLink(id, thumb) {
      this.modal.sceneLink = false
      this.scenesLink.thumb = thumb
      this.scenesLink.status = true
      this.form.data_id = `${id}`
    },

    preDataRule() {
      switch (this.type) {
        case this.typeConfig.LINK:
          return '请填写链接地址'
        case this.typeConfig.SCENE:
          return '请选择链接场景'
        case this.typeConfig.VIDEO:
          return '请输入视频通用分享地址'
        case this.typeConfig.PHOTO:
          return '请选择相册素材'
        default:
          return '请选择所需素材'
      }
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
      const postSpotsData = {
        pano_id: this.panoId,
        scene_id: this.$store.getters.activeScene.id,
        hot_name: this.form.hot_name,
        ath: sphereY,
        atv: sphereX,
        icon_id: this.activeIcon.icon_id,
        type_id: this.type, // 热点类型
        data_id: this.form.data_id,
        diy_src: this.activeIcon.diy_src || '', // 自定义热点图标url
      }
      return postSpotsData
    },

    // 动态校验字段类型
    ruleType(name) {
      let type
      switch (name) {
        case 'data_id':
          if (this.type === this.typeConfig.PHOTO) {
            type = 'array'
          } else {
            type = 'string'
          }
          break
        default:
          type = 'string'
          break
      }
      return type
    },

    // 移除data_id数据
    removeDataId(item) {
      switch (this.type) {
        case this.typeConfig.PHOTO:
          this.form.data_id = this.form.data_id.filter(({ id }) => id !== item.id)
          // 更新STORE
          this.$store.commit(EDIT.MATERIAL.SELECTS, this.form.data_id)
          break
        default:

          break
      }
    },

    submitHotSpots() {
      const data = this.prepareSpotsData()
      const { ath, atv, ...editData } = data
      const request = !this.editStatus ? EDIT.HOTSPOTS.CREATE : EDIT.HOTSPOTS.UPDATE
      const params = !this.editStatus ?
        data : { id: this.editInfo.id, data: { ...this.editInfo, ...editData } }
      this.$store.dispatch(request, params)
        .then((result) => {
          this.resetForm('spotForm')
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
          if (!this.editStatus) {
            krpanoWin.adddesignhotspot(this.hotSpots)
          } else {
            // params.data.url = this.$url.staticHotSpots(`${params.data.icon_id}.png`)
            // krpanoWin.adddesignhotspot({ id: this.editInfo.id, ...params.data })
            this.$store.dispatch(EDIT.HOTSPOTS.INIT.SPOTS, {
              scene_id: this.scenes.find(({ active }) => active).id,
              pano_id: this.panoId })
          }
        })
        .catch(this.errorsHandler)
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitHotSpots()
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },

  mounted() {
    const { data_title, hot_name, data_id } = this.editInfo

    this.form.icon_info.id = this.activeIcon.icon_id || null

    // 初始化MATERIAL.SELECTS 数据
    if (this.type === this.typeConfig.PHOTO) {
      this.form.data_id = []
      this.$store.commit(EDIT.MATERIAL.SELECTS, data_id || [])
    }

    if (this.editStatus) {
      // 编辑状态
      this.form = { ...this.form, hot_name, data_id, title: data_title }
    }
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.addspots-sec {
  padding: 0 20px;
  &__icon {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: rgb(99, 99, 99);
  }

  &__title {
    margin-left: 10px;
  }

  /*调整对齐，这个要看下有没有更好的方法可以float，基线对齐*/
  .el-form-item__content {
    & .el-button,
    & img {
      vertical-align: middle;
    }
  }

  &__scenes-link {
    margin-top: 20px;

    & > i {
      color: rgb(150, 150, 150);
      font-size: 60px;
    }

    & > img {
      width : 145px;
      height: auto;
    }
  }
}

.addspots-photo-list {
  li {
    width: 90px;
    float: left;
    transition: 0.3s;
    margin-bottom: 10px;
    position: relative;
    cursor: move;
    &:hover {
      .iconfont {
       display: inline-block;
      }
    }
    .iconfont {
      display: none;
      line-height: 1.5;
      position: absolute;
      top: 2px;
      right: 12px;
      cursor: pointer;
    }
  }
}

/*覆盖弹窗嵌套样式*/
.hotspot-scene-dialog {
  width: 1000px !important;
  position: fixed;
}

</style>
