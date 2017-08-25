<template>
  <div class="edit-functions__menu-gps">
    <!-- top: 搜索、地理信息 -->
    <el-form
      class="gips-above"
      :inline="true"
      label-width="80px"
    >
      <!-- 模糊搜索 -->
      <el-form-item>
        <el-select
          size="small"
          filterable remote
        ></el-select>
        <el-button
          size="small"type="primary"
        >搜索信息</el-button>
      </el-form-item>
      <!-- 当前坐标 -->
      <el-form-item
        label="当前坐标"
      >
        <el-input size="small"></el-input>
      </el-form-item>
      <!-- 当前地址 -->
      <el-form-item
        label="当前地址"
        class="gps__address"
      >
        <el-input size="small"></el-input>
      </el-form-item>
      <!-- 确认提交 -->
      <el-form-item
        class="gps__submit"
      >
        <el-button
          size="small" type="primary"
        >提交位置</el-button>
      </el-form-item>
    </el-form>

    <!-- bottom: 提示、搜索结果、地图显示 -->
    <div class="gps-below">
      <!-- 城市、缩放等级 -->
      <header class="gps-below__header">
        <span>厦门市</span>
        <!-- 更换城市下拉选择 -->
        <el-dropdown trigger="click" menu-align="start">
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
              >{{city}}</span>
            </el-dropdown-item>
            <!--  -->
          </el-dropdown-menu>
        </el-dropdown>
        <span>当前缩放等级: 10</span>
      </header>
      <!-- 搜索结果 -->
      <aside
        class="gps-below__aside"
        v-if="false"
      >
        <dl v-for="i in 10" :key="i">
          <dt>{{data.name}}</dt>
          <dd>地址：{{data.address}}</dd>
          <dd>电话：{{data.phone}}</dd>
          <dd>坐标：{{data.latLng.lat}},{{data.latLng.lng}}</dd>
        </dl>
      </aside>
      <!-- 没有搜索结果 -->
      <aside
        class="gps-below__aside"
        v-else-if="false"
      >
        <span>对不起，没有搜索到你要找的结果!</span>
      </aside>
      <!-- tips -->
      <aside
        class="gps-below__aside"
        v-else
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
      <!-- 地图容器 -->
      <div
        id="edit-functions__menu-tencentmap"
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

export default {
  name: 'edit-functions__menu-gps',

  data: () => ({
    data: {
      name: '厦门软件园二期',
      address: '福建省厦门市思明区观日路4号，福建省厦门市思明区观日路4号，福建省厦门市思明区观日路4号',
      phone: '0592-1111111',
      latLng: { lat: '24.485660', lng: '118.180950' },
    },

    chinaCity,
  }),
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
