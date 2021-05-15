<template>
  <el-container>
    <el-header>
      <!-- logo -->
      <div><img src="../../assets/logo.png" alt=""></div>
      <!-- 注册 -->
      <div class="head">
        <h2>欢迎入驻</h2>
        <div class="login" @click="logined">立即登录</div>
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>手机号</label>
          <el-input @blur="judgeMobile" v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>设置密码</label>
          <el-input v-model="formLabelAlign.psd1" placeholder="请输入密码"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>确认密码</label>
          <el-input v-model="formLabelAlign.psd2" placeholder="请确认密码"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>验证码</label>
          <el-input v-model="formLabelAlign.code" placeholder="请输入验证码" style="width: 270px;margin-right: 20px"></el-input>
          <el-button @click="code" :disabled="isDisabled" type="success">{{!codetime?'发送验证码':codetime + 's后重新获取'}}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div>
            <label></label>
            <el-checkbox v-model="checked">我已看过并同意 <el-button type="text" @click="agreement">《用户协议》</el-button></el-checkbox>
          </div>
          <div>
            <label></label>
            <el-button type="primary" style="width: 400px" @click="submit" :disabled="isDisabledForm">注册</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
const mobile = /^[1]([3-9])[0-9]{9}$/
export default {
  data () {
    return {
      // 复选框
      checked: false,
      // 验证码倒计时
      codetime: 0,
      // 发送验证码按钮
      isDisabled: false,
      // 表单
      formLabelAlign: {
        phone: '',
        psd1: '',
        psd2: '',
        code: ''
      }
    }
  },
  computed: {
    isDisabledForm () {
      // 判断提交按钮
      if (this.checked === true && this.formLabelAlign.psd1.trim().length !== 0 && this.formLabelAlign.psd1 === this.formLabelAlign.psd2 && this.formLabelAlign.code.trim().length === 4 && this.isDisabled === false) {
        return false
      }
      return true
    }
  },
  methods: {
    // 判断手机号是否注册
    async judgeMobile () {
      if (!mobile.test(this.formLabelAlign.phone)) {
        return
      }
      const res = await this.$http.post('/user/phoneYz', {
        phone: this.formLabelAlign.phone
      })
      if (res.data !== true) {
        this.$message.error('手机号已被注册')
        this.isDisabled = true
      } else if (res.data === true) {
        this.isDisabled = false
      }
    },
    // 获取验证码
    async code () {
      if (!mobile.test(this.formLabelAlign.phone)) {
        return this.$message.error('请输入正确的手机号')
      }
      if (this.codetime > 0) {
        return
      }
      this.codetime = 60
      const timer = setInterval(() => {
        this.codetime--
        if (this.codetime < 1) {
          clearInterval(timer)
          this.codetime = 0
        }
      }, 1000)
      await this.$http.post('/user/sendCode', {
        phone: this.formLabelAlign.phone
      })
    },
    // 用户协议
    agreement () {
      const { href } = this.$router.resolve('/agreement')
      window.open(href, '_blank')
    },
    // 提交表单
    async submit () {
      if (!mobile.test(this.formLabelAlign.phone)) {
        return this.$message.error('手机号不合法')
      }
      const res = await this.$http.post('/user/addUser0', {
        phone: this.formLabelAlign.phone,
        password: this.formLabelAlign.psd1,
        code: this.formLabelAlign.code
      })
      if (res.data === true) {
        this.$router.push('/login')
      } else {
        this.$message.error('注册失败')
      }
    },
    // 立即登录
    logined () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  div {
    float: left;
  }
  .head {
    position: relative;
    .login {
      color: orange;
      font-weight: 700;
      position: absolute;
      top: 0;
      right: -1000px;
      cursor: pointer;
    }
  }
  padding: 0 100px;
  background-color: #f6f6f6;
  height: 100px!important;
  line-height: 100px;
  img {
    height: 40px;
    vertical-align: middle;
    margin-right: 40px;
  }
}
.el-main {
  margin-top: 40px;
  .el-row {
    margin-bottom: 20px;
  }
  label {
    display: inline-block;
    width: 80px;
  }
  .el-input {
    width: 400px;
  }
}
</style>
