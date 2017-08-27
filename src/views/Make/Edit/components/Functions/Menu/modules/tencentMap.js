/**
 * 高级编辑 - 菜单编辑 - 地图导航组件地图api配置
 *
 * @author huojinzhao
 * @description 需要分清地图实例和地图DOM的概念
 */

/* ------ API初始化 ------ */

const mapApi = window.qq.maps

// 地理信息服务
const mapApiGeoCoder = new mapApi.Geocoder()

// event对象 - 调用地图实例事件
const mapApiEvent = mapApi.event

// 创建Map实例时的配置信息
const mapOptions = {
  zoom: 10,
  draggableCursor: 'crosshair',
  draggable: true,
  scrollwhell: true,
  disableDoubleClickZoom: false,
}

// 创建map实例关联的Label实例的配置信息
const initLabelOptions = mapInstance => ({
  map: mapInstance,
  // label相对于cursor的偏移显示
  offset: new mapApi.Size(15, -12),
  clickable: false,
})

/* ------ 实例初始化 ------ */

class TencentMap {
  constructor(dom) {
    // map container
    this.dom = dom
    // 创建地图实例，通过Map类，并与容器dom对象关联
    this.mapInstance = new mapApi.Map(dom, mapOptions)
    // map实例关联的label实例 - 文字标签，可以设置简单的样式
    this.labelInstance = new mapApi.Label(
      initLabelOptions(this.mapInstance),
    )
    // 鼠标在map上获得的地理位置信息
    this.labelGeoInfo = { curPoi: '', curAddress: '' }
  }

  initLabelServer() {
    this.dom
      .addEventListener(
        'mouseenter',
        () => { this.labelInstance.setMap(this.mapInstance) },
      )

    this.dom
      .addEventListener(
        'mouseleave',
        () => { this.labelInstance.setMap(null) },
      )

    // 鼠标在地图上移动时，label位置随着改变，并且显示出对应坐标
    mapApiEvent.addListener(this.mapInstance, 'mousemove',
      (e) => {
        // e为包装MouseEvent对象，有两个属性 latLng & pixel
        const latLng = e.latLng
        const lat = latLng.getLat().toFixed(6)
        const lng = latLng.getLng().toFixed(6)
        // 设置 label 的位置
        this.labelInstance.setPosition(latLng)
        // 设置 label 的内容
        this.labelInstance.setContent(`${lat},${lng}`)
      },
    )

    // 鼠标点击地图时，获取当前位置的 地址&坐标 信息，并输入到信息框中
    mapApiEvent.addListener(this.mapInstance, 'click',
      (e) => {
        this.setGeoInfo(e.latLng)
      },
    )
  }

  /**
   * @param {Object} latLng 经纬坐标对象
   * @description 根据______经纬对象更新labelGeoInfo信息
   */
  setGeoInfo(latLng) {
    const lat = latLng.getLat().toFixed(6)
    const lng = latLng.getLng().toFixed(6)
    mapApiGeoCoder.setComplete(({
      detail: {
        addressComponents: {
          province,
          city,
          district,
          village,
          town,
          street,
          streetNumber,
        },
      },
    }) => {
      this.labelGeoInfo.curPoi = `${lat},${lng}`
      this.labelGeoInfo.curAddress = `${province + city + district}`
        + `${village + town + street + streetNumber}`
    })
    mapApiGeoCoder.getAddress(latLng)
  }

  /**
   * @param {function} complete 城市定位成功后的回调函数
   */
  /* eslint-disable class-methods-use-this */
  initCityServer(complete) {
    // 城市位置信息服务类
    // 可根据城市名称、经纬度、IP地址（支持自动获取用户IP）、电话区号获取城市信息
    const cityServ = new mapApi.CityService({ complete })
    // 根据用户IP查询所在城市信息
    cityServ.searchLocalCity()
  }
  /* eslint-enable */

  /**
   * @param {Object} latLng 经纬坐标对象
   */
  setGeo(latLng) {
    // this.setGeoInfo(latLng)
    this.mapInstance.setCenter(latLng)
    this.mapInstance.zoomTo(15)
  }
}

TencentMap.api = mapApi

export default TencentMap
