<template>
  <div class="hotspot-scene">
    <el-row :gutter="20">
      <el-col :span="6"
        v-for="item in list" :key="item.id"
        class="hotspot-scene__item"
        :class="{'hotspot-scene__item--active':activeId === item.id}"
        @click.native="selectScene(item.id, item.thumb)"
      >
        <img :src="$url.host(item.thumb)" :alt="item.name"/>
        <h4>{{item.name}}</h4>
      </el-col>
    </el-row>
    <el-button class="hotspot-scene__btn" type="primary" @click="submitScene">确定</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data() {
    return {
      activeId: 0,
      activeThumb: '',
    }
  },

  computed: {
    ...mapState({
      scenes: state => state.edit.scene.list,
    }),

    list() {
      return this.scenes.filter(scene => !scene.active)
    },
  },

  methods: {
    selectScene(id, thumb) {
      this.activeId = id
      this.activeThumb = thumb
    },

    submitScene() {
      this.$emit('scene-link', this.activeId, this.activeThumb)
      this.activeId = 0
      this.activeThumb = ''
    },
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.hotspot-scene__item {
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.2s;
  padding: 0 !important;
  margin-left: 10px;
  width: 180px;

  &:hover {
    opacity: 0.9;
  }

  & > img {
    width: 100%;
    height: 100%;
  }

  & > h4 {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: normal;
    line-height: 22px;
  }

  &--active {
    border: 2px solid #ffc000;
  }
}

.hotspot-scene__btn {
  display: block;
  width: 80px;
  margin: 0 auto;
}

</style>
