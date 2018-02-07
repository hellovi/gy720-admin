<template>
  <el-row>
    <el-col :span="12">
      <app-form-alert
        label-width="200px"
        :contents="formAlert"
      ></app-form-alert>
      <el-form
        :model="userInfo"
        :rules="rules"
        :ref="formRef"
        label-width="200px"
      >
        <el-form-item label="头像">
          <avatar v-model="userInfo.avatar"></avatar>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input placeholder="请输入昵称" v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input placeholder="请输入联系电话" v-model="userInfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="居住城市">
          <address-select v-model="areaValue"></address-select>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input placeholder="请输入联系地址" v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            placeholder="请输入简介"
            type="textarea"
            v-model="userInfo.remark"
            :autosize="{ minRows: 4, maxRows: 6}"
          ></el-input>
        </el-form-item>
        <el-form-item label="主页背景">
          <background v-model="userInfo.wallpaper"></background>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="user-account__btn"
            :loading="formLoading"
            @click.native="beforeSubmit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  /**
   * 修改资料
   * @author  chenliangshan
   * @version 2017/08/10
   */

  import { GLOBAL } from '@/store/mutationTypes'
  import AppFormAlert from '@/components/AppFormAlert'
  import Avatar from './components/Avatar'
  import Background from './components/Background'
  import AddressSelect from './components/Address'
  import { strToArr } from './utils'
  import form from './mixins/form'

  export default {
    name: 'account-info',
    mixins: [form],
    components: { Avatar, Background, AddressSelect, AppFormAlert },
    data() {
      return {
        areaKey: ['region_id', 'city_id', 'area_id'],
        areaData: {},
        positionData: {
          region: [],
          city: [],
          area: [],
        },
        rules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],
        },
      }
    },
    computed: {
      // 获取用户信息
      userInfo() {
        return { ...this.$store.state.userInfo }
      },
      // 获取地区信息
      areaValue: {
        get() {
          const areaValue = []
          this.areaKey.forEach((v) => {
            if (Object.keys(this.areaData).length) {
              if (this.areaData[v]) areaValue.push(this.areaData[v])
            } else {
              areaValue.push(this.userInfo[v])
            }
          })
          return areaValue.join(',')
        },

        set(value) {
          // 设置居住城市信息
          const areaData = {}
          const areaValue = strToArr(value)
          this.areaKey.forEach((val, key) => {
            areaData[val] = areaValue[key] || null
          })
          this.areaData = { ...areaData }
        },
      },
    },
    methods: {
      // 保存修改
      submitForm() {
        const userInfo = {
          ...this.userInfo,
          ...this.areaData,
        }
        this.$http.patch('/user/update', userInfo)
          .then(() => {
            // 更新store
            this.$store.commit(GLOBAL.USER.INIT, userInfo)
            this.$message.success('您的个人资料已修改成功 !')
            this.formLoading = false
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },
    },
  }
</script>
