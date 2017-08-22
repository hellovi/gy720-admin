<template>
  <div
    class="edit-functions__tour-viewpanel"
    ref="panel"
    @mousedown="onRotate"
  >
    <div
      class="point"
      ref="point"
      @mousedown="onTranslate"
    ></div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 导览 - 视角设置组件
 *
 * @author huojinzhao
 */

export default {
  name: 'edit-functions__tourpanel',

  props: {
    top: {
      type: Number,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    degress: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    frame: null,
    panel: null,
    translation: {
      initialPosition: null,
      originPosition: null,
    },
    rotation: {
      centerPoint: null,
      initialAngle: 0,
      originAnngle: 0,
    },
  }),

  methods: {
    /* 拖拽操作 */

    onTranslate(e) {
      e.preventDefault()
      e.stopPropagation()

      this.translation.initialPosition = {
        x: this.panel.offsetLeft,
        y: this.panel.offsetTop,
      }
      this.translation.originPosition = {
        x: e.clientX,
        y: e.clientY,
      }

      document.addEventListener('mousemove', this.preTranslate)
      document.addEventListener('mouseup', this.endTranslate)
    },

    preTranslate(e) {
      const origin = this.translation.originPosition
      const initial = this.translation.initialPosition
      const delteX = e.clientX - origin.x
      const delteY = e.clientY - origin.y

      const dynamicPosition = {
        x: initial.x + delteX,
        y: initial.y + delteY,
      }

      this.translate(dynamicPosition.x, dynamicPosition.y)
    },

    translate(x, y) {
      const frame = this.frame
      const panel = this.panel

      const boundary = {
        x: frame.clientWidth - panel.clientWidth,
        y: frame.clientHeight - panel.clientHeight,
      }

      if (x >= 0 && x <= boundary.x) {
        panel.style.left = `${x}px`
        this.$emit('update:left', x)
      }

      if (y >= 0 && y <= boundary.y) {
        panel.style.top = `${y}px`
        this.$emit('update:top', y)
      }
    },

    endTranslate() {
      document.removeEventListener('mousemove', this.preTranslate)
      document.removeEventListener('mouseup', this.endTranslate)
    },

    /* 旋转操作 */

    onRotate(e) {
      e.preventDefault()
      e.stopPropagation()

      this.getCenterPoint()
      this.getInitialAngle()

      this.rotation.originAngle = this.vectorToAngle(e)

      document.addEventListener('mousemove', this.preRotate)
      document.addEventListener('mouseup', this.endRotate)
    },

    preRotate(e) {
      const dynamicAngle = this.vectorToAngle(e)

      const delteAngle = this.rotation.originAngle - dynamicAngle

      this.rotate(delteAngle)
    },

    rotate(delteAngle) {
      const angle = (delteAngle + this.rotation.initialAngle) % 360

      this.panel.style.transform = `rotate(${angle}deg)`
      this.$emit('update:degress', angle)
    },

    endRotate() {
      document.removeEventListener('mousemove', this.preRotate)
      document.removeEventListener('mouseup', this.endRotate)
    },

    radianToAngle(radian) {
      return (radian / Math.PI) * 180
    },

    get360Angle(base, opposite) {
      let radian = 0
      let offset = 0
      if (base < 0) {
        offset = Math.PI
      }
      if (base > 0 && opposite < 0) {
        offset = Math.PI * 2
      }
      radian = Math.atan(opposite / base) + offset
      return this.radianToAngle(radian)
    },

    getCenterPoint() {
      const panelRect = this.panel.getBoundingClientRect()

      this.rotation.centerPoint = {
        x: panelRect.left + (panelRect.width / 2),
        y: panelRect.top + (panelRect.height / 2),
      }

      return this.rotation.centerPoint
    },

    getInitialAngle() {
      const rotate = this.panel.style.transform
      this.rotation.initialAngle = rotate
        ? parseInt(rotate.slice(7, -4), 10)
        : 0
    },

    vectorToAngle(mousePoint) {
      const centerPoint = this.rotation.centerPoint
      const base = mousePoint.clientX - centerPoint.x
      const opposite = centerPoint.y - mousePoint.clientY
      return this.get360Angle(base, opposite)
    },
  },

  mounted() {
    this.panel = this.$refs.panel
    this.frame = this.panel.offsetParent

    this.panel.style.top = `${this.top}px`
    this.panel.style.left = `${this.left}px`
    this.panel.style.transform = `rotate(${this.degress}deg)`
  },
}
</script>

<style lang="postcss">
.edit-functions__tour-viewpanel {
  position: absolute;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 30px 60px;
    border-color: rgb(238, 124, 31) transparent transparent;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    border: 2px solid white;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    transform: translate(-50%, -50%);
  }

  & .point {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    height: 18px;
    width: 18px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: rgb(238, 124, 31);
    transform: translate(-50%, -50%);
  }
}
</style>
