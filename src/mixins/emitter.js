/**
 * 实现Vue1.x $broadcast/dispatch事件广播方法
 * @author  chenliangshan
 * @version 2017/10/09
 */

/**
  * @param {String} componentName - 目标组件的name属性
  * @param {String} eventName - 广播事件名称
  * @param {Array} params - 广播事件参数
  */
function broadcast(componentName, eventName, ...params) {
  this.$children.forEach((child) => {
    if (child.$options.name === componentName) {
      child.$emit(eventName, ...params)
    } else {
      broadcast.call(child, componentName, eventName, ...params)
    }
  })
}

export default {
  methods: {
    // 事件广播
    broadcast(...args) {
      broadcast.call(this, ...args)
    },

    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        // eslint-disable-next-line
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
  },
}
