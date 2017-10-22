/* eslint-disable no-underscore-dangle */
import { Url } from '@/utils'

import editImg from '../assets/edit.png'
import trigonImg from '../assets/trigon.png'
import deleteImg from '../assets/delete.png'

/**
 * @typedef {Object} Hotspot
 * @property {string} hot_name
 * @property {number} id
 * @property {number} pano_id
 * @property {number} scene_id
 * @property {string} icon_id
 * @property {string} diy_src
 * @property {string} url
 * @property {number} scale
 * @property {number} ath
 * @property {number} atv
 * @property {number} v
 * @property {number} x
 * @property {number} y
 * @property {string} style
 */

/**
 *
 * @param {Hotspot} data
 */
function adddesignhotspot(data) {
  const id = data.id

  this.hotspots[id] = data

  const hotspotName = `hotspot_${id}`
  // const hotspotbgName = `hotspotbg_${id}`
  // const hotspoticonName = `hotspotbgicon_${id}`
  const hotspotManageBg = `hotspotmanagebg_${id}`
  const hotspotManageEdit = `hotspotmanageedit_${id}`
  const hotspotManagedelete = `hotspotManagedelete_${id}`
  const textName = `hotspot_txt_${id}`
  const ondown = `spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery); sub(drag_adjustx, mouse.stagex, hotspotcenterx); sub(drag_adjusty, mouse.stagey, hotspotcentery); asyncloop(pressed, sub(dx, mouse.stagex, drag_adjustx); sub(dy, mouse.stagey, drag_adjusty); screentosphere(dx, dy, ath, atv);, js(window.moveHotspot(${id},get(ath),get(atv))););`
  const onclick = `js(!window.krpanoEditHotspot || window.krpanoEditHotspot(${id}));`
  const ondelete = `js(!window.krpanoDeleteHotspot || window.krpanoDeleteHotspot(${id},${data.scene_id},${data.pano_id}));`
  const onover = `stopdelayedcall(${id});set(layer[${hotspotManageBg}].visible, true);`
  const onout = `delayedcall(${id},0.5,set(layer[${hotspotManageBg}].visible, false););`
  let hotspotManageBgY = 0
  const _url = data.icon_id === '0' ? data.diy_src : data.url

  const hotspot = this.addhotspot(hotspotName, {
    id,
    type: 'image',
    url: _url,
    keep: 'true',
    enabled: 'true',
    scale: data.scale,
    devices: 'desktop',
    ath: data.ath,
    atv: data.atv,
    v: data.v,
    edge: 'bottom',
    scenename: `scene_${data.scene_id}`,
    bgcapture: true,
    ishotspot: true,
    handcursor: true,
    onover,
    onout,
    ondown,
  })

  if (data.hot_name) {
    hotspotManageBgY = (-20 + parseInt(data.y, 10)) - 15
    // - 'title' 文字层
    this.addlayer(textName, {
      parent: hotspot,
      interactivecontent: true,
      url: '%SWFPATH%/plugins/textfield.swf',
      html: data.hot_name,
      alpha: '1',
      enabled: 'true',
      align: 'top',
      edge: 'bottom',
      autowidth: 'true',
      y: data.y,
      backgroundcolor: '0x000000',
      backgroundalpha: '0.4',
      padding: '5 20',
      roundedge: '4',
      css: ' font-size: 13px;color: #FFFFFF;',
      zorder: 1,
      keep: true,
      handcursor: false,
    })
  }

  // - 工具背景层
  // console.log(hotspotManageBgY);
  this.addlayer(hotspotManageBg, {
    parent: hotspot,
    type: 'container',
    align: 'top',
    edge: 'bottom',
    y: hotspotManageBgY,
    width: 120,
    height: 26,
    bgcolor: '#ff0000',
    bgalpha: '0.5',
    visible: false,
    keep: true,
    onover: `stopdelayedcall(${id})`,
    onout,
  })
  // - 编辑按钮
  this.addlayer(hotspotManageEdit, {
    parent: hotspotManageBg,
    url: Url.static(editImg),
    // url: require('@/views/UserMake/Edit/components/Bottom/Hotspot/images/edit.png'),
    align: 'left',
    crop: '0|0|60|26',
    onovercrop: '0|27|60|27',
    onclick,
    keep: true,
  })
  // - 删除按钮
  this.addlayer(hotspotManagedelete, {
    parent: hotspotManageBg,
    // url: require('file-loader!@/views/UserMake/
    // Edit/components/Bottom/Hotspot/images/edit.png'),
    // url: require('url-loader?limit=10!@/views/UserMake/
    // Edit/components/Bottom/Hotspot/images/edit.png'),
    url: Url.static(deleteImg),
    align: 'right',
    crop: '0|0|60|26',
    onovercrop: '0|26|60|26',
    onclick: ondelete,
    keep: true,
  })

  const hotspotManageTriangle = `hotspotmanagetriangle_${id}`
  // - 小三角
  this.addlayer(hotspotManageTriangle, {
    parent: hotspotManageBg,
    url: Url.static(trigonImg),
    alpha: '0.5',
    align: 'bottom',
    edge: 'top',
    y: '5',
    scale: '0.5',
    keep: true,
  })
  window.__krpano.call(`hotspot[${hotspotName}].loadstyle(${data.style})`)
  return this
}

window.krpanoplugin.prototype.adddesignhotspot = adddesignhotspot
