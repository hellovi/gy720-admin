export const GLOBAL = {
  USER: {
    INIT: 'GLOBAL.USER.INIT',
    UPDATE_POINT: 'GLOBAL.USER.UPDATE_POINT',
  },
}

// 个人中心
export const CENTER = {
  INITIALIZE: 'center/initialize',
  SETPAGINATE: 'center/setpaginate',
  LIST_UPDATE: 'center/updatelist',
  LINK_UPDATE: 'center/updatelink',
  LOAD_LOCK: 'center/lockload',
}

export const MESSAGE = {
  SYSTEM: {
    INIT: 'MESSAGE.SYSTEM.INIT',
  },
  PRIVATE: {
    INIT: 'MESSAGE.PRIVATE.INIT',
  },
  SAY: {
    INIT: 'MESSAGE.SAY.INIT',
  },
  CHECK: 'MESSAGE.CHECK',
  CHECK_ALL: 'MESSAGE.CHECK_ALL',
}

export const POINT = {
  TASK: {
    INIT: 'POINT.TASK.INIT',
  },
  LOG: {
    INIT: 'POINT.LOG.INIT',
  },
  EXCHANGE: {
    INIT: 'POINT.EXCHANGE.INIT',
  },
  RECORD: {
    INIT: 'POINT.RECORD.INIT',
  },
}

export const PURCHASE = {
  ORDERS: {
    INIT: 'PURCHASE.ORDERS.INIT',
  },
}

/**
 * 行为宏
 * @module @/store/mutationType
 * @author Hjz
 * @version 2017-05-06 Hjz 个人中心/用户中心组件状态管理
 * @version 2017-05-16 Hjz 个人中心/个人作品组件状态管理
 * @version 2017-05-19 Hjz 高级编辑/菜单组件状态管理
 * @version 2017-05-31 Hjz 高级编辑/主组件状态管理
 * @version 2017-06-01 Yangjun 高级编辑/场景模块
 * @version 2017-06-01 Yangjun 高级编辑/素材模块
 * @version 2017-06-22 Yangjun 高级编辑/场景模块
 */

export const USERCLIENT = {
  // 用户中心模块 center
  CENTER: {
    INITIALIZE: 'userclient/center/initialize',
    LIST_UPDATE: 'userclient/center/updatelist',
    LINK_UPDATE: 'userclient/center/updatelink',
    LOAD_LOCK: 'userclient/center/lockload',
  },

  // 个人作品模块 compositions
  COMPOSITIONS: {
    CATE: {
      INITIALIZE: 'userclient/compositions/catelist/initialize',
      CREATE: 'userclient/compositions/catelist/create',
      DELETE: 'userclient/compositions/catelist/delete',
    },
    COMPLIST: {
      INITIALIZE: 'userclient/compositions/complist/initialize',
      DELETE: 'userclient/compositions/complist/delete',
      UPDATE: 'userclient/compositions/complist/update',
    },
    SELECTEDLIST: {
      INITIALIZE: 'userclient/compositions/selectedlist/initialize',
      UPDATE: 'userclient/compositions/selectedlist/update',
    },
  },
}

// 高级编辑模块 Edit
export const EDIT = {
  MODAL: {
    OPEN: 'EDIT.MODAL.OPEN',
    CLOSE: 'EDIT.MODAL.CLOSE',
  },

  // Logo
  LOGO: {
    INITIALIZE: 'edit/logo/initialize',
  },

  // 作者
  AUTHOR: {
    INITIALIZE: 'edit/author/initialize',
  },

  // 素材模块
  MATERIAL: {
  },

  // 场景模块
  SCENE: {

  },
}
