<template>
  <div class="edit-functions__menu-gps">
    <!-- top: 搜索、地理信息 -->
    <el-form
      class="gips-above"
      :inline="true"
      label-width="80px"
    >
      <!-- 模糊搜索 -->
      <el-form-item
        class="gps__search"
      >
        <el-select
          v-model="searchingInfo"
          placeholder="请输入关键字"
          size="small" :filterable="true" :clearable="true"
          :remote="true" :remote-method="onSearchingHelp"
        >
          <el-option
            v-for="help in searchingHelps" :key="help.id"
            :label="help.name"
            :value="help.name"
          ></el-option>
        </el-select>
        <el-button
          size="small"type="primary"
          @click="onSearchAddress"
        >搜索信息</el-button>
      </el-form-item>
      <!-- 当前坐标 -->
      <el-form-item
        label="当前坐标"
      >
        <el-input
          size="small"
          v-model="mapInfo.geoInfo.curPoi"
        ></el-input>
      </el-form-item>
      <!-- 当前地址 -->
      <el-form-item
        label="当前地址"
        class="gps__address"
      >
        <el-input
          size="small"
          v-model="mapInfo.geoInfo.curAddress"
        ></el-input>
      </el-form-item>
      <!-- 确认提交 -->
      <el-form-item
        class="gps__submit"
      >
        <el-button
          size="small" type="primary"
          @click="onSubmitGps"
        >提交位置</el-button>
      </el-form-item>
    </el-form>

    <!-- bottom: 提示、搜索结果、地图显示 -->
    <div class="gps-below">
      <!-- 城市、缩放等级 -->
      <header class="gps-below__header">
        <span>{{this.mapInfo.city}}</span>
        <!-- 更换城市下拉选择 -->
        <el-dropdown trigger="hover" menu-align="start">
          <!-- hover -->
          <span class="el-dropdown-link">
            [更换城市]
          </span>
          <!-- 下拉 -->
          <el-dropdown-menu
            class="gps-below__header-selection"
            slot="dropdown"
          >
            <!--  -->
            <h4>热门城市</h4>
            <el-dropdown-item>
              <span
                v-for="city in chinaCity.hotcities" :key="city"
                @click.stop="onChooseCity(city)"
              >{{city}}</span>
            </el-dropdown-item>
            <!--  -->
            <h4>全国城市</h4>
            <el-dropdown-item
              v-for="province in chinaCity.provinces" :key="province.name"
            >
              <h5>{{province.name}}</h5>
              <span
                v-for="city in province.cities" :key="city"
                @click.stop="onChooseCity(city)"
              >{{city}}</span>
            </el-dropdown-item>
            <!--  -->
          </el-dropdown-menu>
        </el-dropdown>
        <span>当前缩放等级: {{mapInfo.zoom}}</span>
      </header>
      <!-- tips -->
      <aside
        class="gps-below__aside"
        v-if= "!searchedAddresses"
      >
        <h3>功能简介</h3>
         <p>1、支持地址 精确/模糊 查询；</p>
         <p>2、支持POI点坐标显示；</p>
         <p>3、坐标鼠标跟随显示；</p>
        <h3>使用说明：</h3>
         <p>1、在搜索框搜索关键词后，地图会显示相应poi点，同时该栏会显示搜索结果；</p>
         <p>2、点击某点或某结果，右上角会显示相应该点的坐标和地址。</p>
        </ul>
      </aside>
      <!-- 搜索结果 -->
      <aside
        class="gps-below__aside"
        v-else-if="searchedAddresses.length > 0"
      >
        <dl
          v-for="item in searchedAddresses" :key="item.name"
          @click="onChooseSearchedPoi(item)"
        >
          <dt>{{item.name}}</dt>
          <dd>地址：{{item.address}}</dd>
          <dd>电话：{{item.phone}}</dd>
          <dd>坐标：{{item.latLng.lat}},{{item.latLng.lng}}</dd>
        </dl>
      </aside>
      <!-- 没有搜索结果 -->
      <aside
        class="gps-below__aside"
        v-else
      >
        <span>对不起，没有搜索到你要找的结果!</span>
      </aside>
      <!-- 地图容器 -->
      <div
        ref="tencentmap"
        class="gps-below__map"
      ></div>
    </div>
  </div>
</template>

<script>
/**
 * 高级编辑 - 菜单编辑 - 地址导航
 *
 * @author huojinzhao
 */

import chinaCity from './modules/city'
import TencentMap from './modules/tencentMap'

export default {
  name: 'edit-functions__menu-gps',

  data: () => ({
    temp: null,

    chinaCity,

    map: null,

    mapInfo: {
      city: '',
      zoom: 10,
      geoInfo: {
        curAddress: '',
        curPoi: '',
      },
    },

    searchingInfo: '',

    searchingHelps: [],

    searchedAddresses: null,
  }),

  methods: {
    locateCity({ name, latLng }) {
      this.mapInfo.city = name
      this.map.mapInstance.setCenter(latLng)
    },

    onChooseCity(cityName) {
      const server = new TencentMap.api
        .CityService({
          complete: ({ detail }) => {
            this.locateCity(detail)
          },
        })
      server.searchCityByName(cityName)
      this.map.mapInstance.zoomTo(10)
    },

    onSearchingHelp(keyword) {
      this.searchingInfo = keyword
      this.searchingHelps = []
      this.searchPoisOnline(keyword,
        (pois) => { this.searchingHelps = pois },
      )
    },

    onSearchAddress() {
      this.searchPoisOnline(this.searchingInfo,
        (pois) => { this.searchedAddresses = pois },
        () => { this.searchedAddresses = [] },
      )
    },

    searchPoisOnline(
      keyword,
      success,
      error = () => {},
    ) {
      // 检索初始化
      const server = new TencentMap.api
        .SearchService({
          pageIndex: 1,
          pageCapacity: 10,
          location: this.mapInfo.city,
          autoExtend: false,
        })
      server.setComplete(({ detail: { pois } }) => {
        success(pois)
      })
      server.setError(() => error())
      server.search(keyword)
    },

    onChooseSearchedPoi(poi) {
      this.mapInfo.geoInfo
        .curAddress = poi.address
      this.mapInfo.geoInfo
        .curPoi = `${poi.latLng.lat},${poi.latLng.lng}`
      this.map.setGeo(poi.latLng)
    },

    onSubmitGps() {
      this.$emit('submit', this.mapInfo.geoInfo)
    },
  },

  mounted() {
    this.map = new TencentMap(this.$refs.tencentmap)

    this.map.initLabelServer()

    this.map.initCityServer(({ detail }) => {
      this.locateCity(detail)
    })

    TencentMap.api.event
      .addListener(this.map.mapInstance, 'zoom_changed',
        ({ target }) => {
          this.mapInfo.zoom = target.zoom
        },
      )

    this.mapInfo.geoInfo = this.map.labelGeoInfo
  },
}
</script>

<style lang="postcss">
@import "vars.css";

:root {
  --below-frame-color: color(var(--color-primary) shade(15%));
  --below-content-height: 310px;
  --menu-province-width: 40px;
}

.edit-functions__menu-gps {
  padding-bottom: 20px;

  & .gps-above {

  }

  & .gps {

    &__search {

      & input {
        cursor: text;
      }
    }

    &__pos {

    }

    &__address {

    }

    &__submit {
      margin-left: 10px;
      margin-right: 0;
    }
  }

  & .gps-below {
    border: 1px solid var(--below-frame-color);

    &__header {
      padding-left: 10px;
      background-color: var(--below-frame-color);
      line-height: 30px;
      font-size: 16px;
      color: #fff;

      & > span:first-of-type {
        font-weight: bold;
      }

      & > span:last-of-type {
        margin-left: 15px;
      }

      & .el-dropdown-link {
        padding: 8px;
        color: #fff;
        cursor: pointer;

        &:hover {
          color: var(--color-warning);
        }
      }
    }

    &__aside {
      float: left;
      border-right: 1px solid var(--below-frame-color);
      padding: 10px;
      height: var(--below-content-height);
      width: 33%;
      overflow-x: hidden;
      overflow-y: auto;

      & dl {
        cursor: pointer;
        &:hover {
          background-color: var(--gray-light);
        }
      }

      & > h3:first-of-type { margin: 14px 0; }
      & dt { font-size: 16px; color: var(--color-primary); }
      & dd { margin: 5px 0 0 18px; }
      & > span { font-size: 16px; color: var(--color-danger); }
    }

    &__map {
      height: var(--below-content-height);
      overflow: hidden;
    }
  }
}

/* 更换城市 */
.gps-below__header-selection {
  margin: 0;
  padding-left: 10px;
  height: var(--below-content-height);
  width: 380px;
  overflow: auto;

  & .el-dropdown-menu__item {
    line-height: 20px;

    &:hover { background-color: transparent; }

    &:not(:nth-child(2)) {
      position: relative;
      margin-left: var(--menu-province-width);
    }
  }

  & h4 {
    margin: 10px 0;
    font-size: 14px;
  }

  & h5 {
    position: absolute;
    top: 0;
    left: -var(--menu-province-width);
    margin: 0;
    width: var(--menu-province-width);
    font-weight: normal;
  }

  & span {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    color: var(--color-primary);
    white-space: nowrap;

    &:hover {
      color: var(--color-info);
    }
  }
}
</style>
