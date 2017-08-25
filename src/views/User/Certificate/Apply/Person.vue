<template>
  <div>
    <el-form
      label-width="115px"
      label-position="left"
    >
      <el-form-item label="真实姓名：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="身份证扫描件："></el-form-item>
      <div><el-checkbox>我同意《光鱼摄影师认证服务协议》</el-checkbox></div>
      <el-button type="primary" size="large" class="cert-apply__submit" @click="submit">立即申请</el-button>
    </el-form>
  </div>
</template>

<script>
/**
 * 摄影师认证 - 个人认证
 *
 * @author zhoumenglin
 * @version 2017-08-11
 */

export default {
  name: 'certifate-apply-person',

  data() {
    return {
      form: {
        certificate_type: 10,
        name: '',
        number: '12345678910',
        front: '1.jpg',
        back: '2.jpg',
        accept: 1,
      },
    }
  },

  computed: {
    form() {
      return {
        ...(this.type === 10 ? this.formPerson : this.formCompany),
        certificate_type: this.type,
      }
    },
  },

  methods: {
    submit() {
      this.$http.post('/user/certification', this.form)
        .then((res) => {
          // eslint-disable-next-line
          console.log(res)
        })
    },
  },

}
</script>

<style>

</style>
