<template>
  <el-row>
    <el-col :span="12">
      <form-alert label-width="200px"
                  :title="formAlertTitle"
                  :type="formAlertType"
                  :contents="this.formAlert"></form-alert>
      <el-form :model="userInfo"
               :rules="rules"
               :ref="formRef"
               label-width="200px">
        <el-form-item label="头像">
          <avatar v-model="userInfo.avatar"></avatar>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input placeholder="请输入昵称" v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input placeholder="请输入联系电话" v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="居住城市">
          <address-select v-model="areaValue"></address-select>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input placeholder="请输入联系地址" v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="请输入简介" type="textarea"
                    v-model="userInfo.remark"
                    :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="user-account__btn"
                     :loading="formLoading"
                     @click.native="beforeSubmit">提交</el-button>
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
  import Avatar from './components/Avatar'
  import AddressSelect from './components/Address'
  import FormAlert from './components/Alert'
  import { strToArr } from './utils'
  import form from './mixins/form'

  export default {
    name: 'account-info',
    mixins: [form],
    components: { Avatar, AddressSelect, FormAlert },
    data() {
      return {
        areaKey: ['region_id', 'city_id', 'area_id'],
        areaValue: null,
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
      areaData() {
        const areaData = {}
        const areaValue = strToArr(this.areaValue)
        this.areaKey.forEach((val, key) => {
          areaData[val] = areaValue[key] || null
        })
        return areaData
      },
      userInfo() {
        return { ...this.$store.state.userInfo }
      },
    },
    watch: {
      userInfo: {
        handler() {
          this.getAreaInfo()
        },
        deep: true,
      },
    },
    methods: {
      // 获取地区信息
      getAreaInfo() {
        const areaValue = []
        this.areaKey.forEach((v) => {
          areaValue.push(this.userInfo[v])
        })
        this.areaValue = areaValue.join(',')
      },
      // 保存修改
      submitForm() {
        this.$http.post('/user/account/updateinfo', {
          ...this.userInfo,
          ...this.areaData,
        })
          .then(() => {
            // 更新store
            this.$store.commit(GLOBAL.USER.INIT, this.userInfo)
            this.successHandler({
              message: '您的个人资料已修改成功 !',
            })
          })
          .catch((errors) => {
            this.errorHandler(errors)
          })
      },
    },
    mounted() {
      this.getAreaInfo()
    },
  }
</script>
