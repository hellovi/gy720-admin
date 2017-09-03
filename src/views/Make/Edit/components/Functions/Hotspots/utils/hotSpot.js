/* eslint-disable */
import { Http } from '@/utils'
import { EDIT } from '@/store/mutationTypes'
export default function hotspotsInit(that){
    window.krpanoplugin.prototype.adddesignhotspot = function(hotspotdata){
      this.hotspots[hotspotdata.id] = hotspotdata;
      // var copy = JSON.parse(JSON.stringify(hotspotdata))
     	var hotspotName = "hotspot_" + hotspotdata.id;
     	var hotspotbgName = "hotspotbg_" + hotspotdata.id;
     	var hotspoticonName = "hotspotbgicon_" + hotspotdata.id;
     	var hotspotManageBg = "hotspotmanagebg_" + hotspotdata.id;
     	var hotspotManageEdit = "hotspotmanageedit_" + hotspotdata.id;
     	var hotspotManagedelete = "hotspotManagedelete_" + hotspotdata.id;
     	var textName = "hotspot_txt_" + hotspotdata.id;
     	var ondown = "spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery); sub(drag_adjustx, mouse.stagex, hotspotcenterx); sub(drag_adjusty, mouse.stagey, hotspotcentery); asyncloop(pressed, sub(dx, mouse.stagex, drag_adjustx); sub(dy, mouse.stagey, drag_adjusty); screentosphere(dx, dy, ath, atv);, js(window.moveHotspot("+hotspotdata.id+",get(ath),get(atv)));); ";
     	var onclick = "js(!window.krpanoEditHotspot || window.krpanoEditHotspot(" + hotspotdata.id + "));";
     	var ondelete = "js(!window.krpanoDeleteHotspot || window.krpanoDeleteHotspot(" + hotspotdata.id + "," + hotspotdata.scene_id + "," + hotspotdata.pano_id + "));";
     	var onover = "stopdelayedcall("+hotspotdata.id+");set(layer[" + hotspotManageBg + "].visible, true);";
     	var onout = "delayedcall("+hotspotdata.id+",0.5,set(layer[" + hotspotManageBg + "].visible, false););";
      var hotspotManageBgY = 0;
      var _url = hotspotdata.icon_id === '0' ? hotspotdata.diy_src : hotspotdata.url;

   	  var hotspot = this.addhotspot(hotspotName, {
   	    id: hotspotdata.id,
   	    type: "image",
   	    url: _url,
   	    keep: "true",
   	    enabled: "true",
   	    scale: hotspotdata.scale,
   	    devices: "desktop",
   	    ath: hotspotdata.ath,
   	    atv: hotspotdata.atv,
           v: hotspotdata.v,
   	    edge: "bottom",
   	    scenename: "scene_" + hotspotdata.scene_id,
   	    bgcapture: true,
   	    ishotspot: true,
   	    handcursor: true,
   	    onover: onover,
   	    onout: onout,
   	    ondown: ondown
     	});

      if (hotspotdata.hot_name) {
           hotspotManageBgY = -20 + parseInt(hotspotdata.y) - 15;
           //- 'title' 文字层
           this.addlayer(textName, {
               parent: hotspot,
               interactivecontent: true,
               url: "%SWFPATH%/plugins/textfield.swf",
               html: hotspotdata.hot_name,
               alpha: "1",
               enabled: "true",
               align: "top",
               edge: "bottom",
               autowidth: "true",
               y: hotspotdata.y,
               backgroundcolor: "0x000000",
               backgroundalpha: "0.4",
               padding: "5 20",
               roundedge: '4',
               css: " font-size: 13px;color: #FFFFFF;",
               zorder: 1,
               keep: true,
               handcursor: false
           });
       }

       //- 工具背景层
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
   	    onover: 'stopdelayedcall(' + hotspotdata.id + ')',
   	    onout: onout
   	});
       //- 编辑按钮
   	this.addlayer(hotspotManageEdit, {
   	    parent: hotspotManageBg,
   	    url: "http://www.gy720.com/statics/images/edit.png",
   	    //url: require('@/views/UserMake/Edit/components/Bottom/Hotspot/images/edit.png'),
   	    align: 'left',
   	    crop: '0|0|60|26',
   	    onovercrop: '0|27|60|27',
   	    onclick: onclick,
   	    keep: true
   	});
       //- 删除按钮
   	this.addlayer(hotspotManagedelete, {
   	    parent: hotspotManageBg,
   	    //url: require('file-loader!@/views/UserMake/Edit/components/Bottom/Hotspot/images/edit.png'),
   	    //url: require('url-loader?limit=10!@/views/UserMake/Edit/components/Bottom/Hotspot/images/edit.png'),
   	    url: "http://www.gy720.com/statics/images/delete.png",
   	    align: 'right',
   	    crop: '0|0|60|26',
   	    onovercrop: '0|26|60|26',
   	    onclick: ondelete,
   	    keep: true
   	});

   	var hotspotManageTriangle = "hotspotmanagetriangle_" + hotspotdata.id;
       //- 小三角
   	this.addlayer(hotspotManageTriangle, {
   	    parent: hotspotManageBg,
   	    url: "http://www.gy720.com/statics/images/sanjiao.png",
   	    alpha: "0.5",
   	    align: "bottom",
   	    edge: "top",
   	    y: "5",
   	    scale: "0.5",
   	    keep: true
     });
       __krpano.call( "hotspot[" + hotspotName + "].loadstyle(" + hotspotdata.style + ")" );
   	return this;
   };


   /**
   * 编辑热点
   */
    window.krpanoEditHotspot = function (id) {
      that.title = '编辑'
      that.editInfo = that.spotsList.find((spot) => spot.id == id)
      const info = that.editInfo
      // 热点图标赋值 ???? // 这里还是得区分有无c-
      const activeIcon = { icon_id: info.icon_id, thumb: info.icon_thumb, y: info.y }
      that.$store.commit(EDIT.HOTSPOTS.SELECT.ICON, activeIcon)
      that.openModal('hotspots')
      that.switchStep(2, info.type_id)
    };



    /**
     * 删除热点
     */
   window.krpanoDeleteHotspot = function (id, scene_id, pano_id) {
      that.$store.dispatch(EDIT.HOTSPOTS.REMOVE, {id, scene_id, pano_id})
        .then(() => {
          window.__krpano.removehotspot(`hotspot_${id}`)
          window.__krpano.removelayer(`hotspot_txt_${id}`)
          window.__krpano.hotspots[id] = null
          that.$message.success('删除成功')
        })
   }

    /**
     * 移动热点
     */
   window.moveHotspot = function (hotid, ath, atv) {
       window.console.log('移动热点')
       var hotspot = window.__krpano.hotspots[hotid];
       if (Math.floor(ath) != Math.floor(hotspot.ath) || Math.floor(atv) != Math.floor(hotspot.atv)) {
           hotspot.ath = ath;
           hotspot.atv = atv;
           hotspot.pano_id = vueData.pano_id;
          //  ajax.post('/user/?vtour-save_hotspot.htm', hotspot)
          //    .then((res) => {
          //      window.console.log(res)
          //    })
       }
   }
}
