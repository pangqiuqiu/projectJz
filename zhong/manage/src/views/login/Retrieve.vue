<template>
  <div class="container">
    <div class="login">
      <h4>修改密码 重点汽车网 会员</h4>
      <div class="contain">
        <el-form label-position="left" :model="registerForm" status-icon :rules="registerRules" ref="ruleFormRef" label-width="100px"  class="demo-ruleForm">
          <!-- 手机号 -->
          <el-form-item label="手 机" prop="mobile">
            <el-input type="text" v-model="registerForm.mobile" autocomplete="off" @blur="judgeMobile" @change="change"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="新 密 码" prop="psd1">
            <el-input type="password" v-model="registerForm.psd1" autocomplete="off" :disabled="isDisabled"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认新密码" prop="psd2">
            <el-input type="password" v-model="registerForm.psd2" autocomplete="off" :disabled="isDisabled"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="手机验证码" prop="code">
            <el-input type="type" v-model="registerForm.code" autocomplete="off" style="width: 135px; margin-right: 30px;"></el-input>
            <el-button type="warning" @click="code()" :disabled="isDisabled">{{!codetime?'发送验证码':codetime + 's后重新获取'}}</el-button>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btn">
            <el-button size="small" type="primary" @click="back()" style="margin-right: 10px;">返回登录</el-button>
            <el-button size="small" type="primary" @click="submitForm()" style="margin-right: 10px;">找回密码</el-button>
            <el-button size="small" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 广告模块 -->
  </div>
</template>

<script>
export default {
  data () {
    // 验证手机号正则
    const mobile = /^[1]([3-9])[0-9]{9}$/
    const isMobile = (rule, value, callback) => {
      if (!mobile.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    // 验证密码的正则
    const psd = /^[\d\w]{6,12}$/
    const isPsd = (rule, value, callback) => {
      if (!psd.test(value)) {
        return callback(new Error('请输入6~12以内数字、字母或组合密码'))
      } else {
        callback()
      }
    }
    return {
      isDisabled: false,
      // 验证码倒计时
      codetime: 0,
      // 这是注册表单的数据绑定对象
      registerForm: {
        mobile: '', // 手机号
        psd1: '', // 密码
        psd2: '', // 确认密码
        code: '' // 验证码
      },
      // 这是表单的验证规则对象
      registerRules: {
        // 验证手机号是否合法
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isMobile }
        ],
        // 验证密码是否合法
        psd1: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: isPsd }
        ],
        // 确认密码是否合法
        psd2: [
          { required: true, message: '请确认登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: isPsd }
        ],
        // 验证验证码是否合法
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 判断手机号是否已经注册
    async judgeMobile () {
      const res = await this.$http.post('/user/phoneYz', {
        phone: this.registerForm.mobile
      })
      if (res.data === true) {
        this.$message.warning('手机号未被注册，请前往注册页面')
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    change () {
      this.judgeMobile()
    },
    // 点击按钮触发找回密码请求
    submitForm () {
      if (this.registerForm.psd1 !== this.registerForm.psd2) {
        return this.$message({
          showClose: true,
          message: '两次密码不一致',
          type: 'error'
        })
      }
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return
        this.$http.post('/user/resetPass', {
          code: this.registerForm.code,
          phone: this.registerForm.mobile,
          password: this.registerForm.psd1
        }).then((res) => {
          if (res.data === true) {
            this.$message({
              showClose: true,
              message: '新密码注册成功',
              type: 'success'
            })
            this.$router.push('/login')
          } else {
            this.$message({
              showClose: true,
              message: '验证码错误',
              type: 'error'
            })
          }
        })
      })
    },
    // 点击按钮触发重置按钮
    resetForm () {
      this.$refs.ruleFormRef.resetFields()
    },
    back () {
      this.$router.push('/login')
    },
    // 获取短信验证码
    async code () {
      if (this.registerForm.mobile === '' || this.registerForm.mobile.length !== 11) {
        return alert('请输入手机号')
      }
      if (this.codetime > 0) {
        return
      }
      // 发送AJAX请求，成功时设置定时器 console.log('获取验证码')
      this.codetime = 60
      const timer = setInterval(() => {
        this.codetime--
        if (this.codetime < 1) {
          clearInterval(timer)
          this.codetime = 0
        }
      }, 1000)
      const res = await this.$http.post('/user/sendCode', {
        phone: this.registerForm.mobile
      })
    }
  }
}
</script>

<style lang="less" scoped>
html, body {
  width: 100%;
  height: 100%;
}
.container {
  height: 100%;
  // background-image: url('../../assets/login/login.jpg');
  // background-size: 100%;
  // overflow: hidden;
}
.login {
  margin-left: 800px;
  width: 600px;
  height: 500px;
  overflow: hidden;
  h4 {
    margin-top: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .contain {
    margin: 10px auto;
    padding: 30px 20px 0 20px;
    width: 400px;
    height: 350px;
    .btn {
      display: flex;
      justify-content: flex-start;
    }
    .el-input {
      width: 300px;
    }
  }
}
</style>
