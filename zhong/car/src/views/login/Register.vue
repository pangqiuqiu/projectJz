<template>
  <div class="container">
    <div class="card">
      <el-card class="w" :body-style="{ padding: '0px', height: '100%' }">
        <div class="left">
          <img src="../../assets/login/1.png" alt="">
        </div>
        <div class="right">
          <!-- 欢迎 -->
          <h3>欢迎注册 重点汽车网 会员</h3>
          <!-- 表单 -->
          <el-form :model="registerForm" status-icon :rules="registerRules" ref="ruleFormRef" class="demo-ruleForm">
            <!-- 手机号 -->
            <el-form-item prop="mobile">
              <el-input placeholder="请输入手机号" type="text" @change="change" v-model="registerForm.mobile" autocomplete="off" @blur="judgeMobile"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <div class="code">
              <el-form-item>
                <el-input type="text" v-model="writen" autocomplete="off" placeholder="请输入随机码"></el-input>
              </el-form-item>
              <el-form-item class="random" style="width: 88px">
                <span @click="this.getRandom">{{random}}</span>
              </el-form-item>
            </div>
            <!-- 密码 -->
            <el-form-item prop="psd1">
              <el-input placeholder="请输入密码" type="password" v-model="registerForm.psd1" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="psd2">
              <el-input placeholder="请再次输入密码" type="password" v-model="registerForm.psd2" autocomplete="off" :disabled="isDisabled"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <div class="code">
              <el-form-item prop="code">
                <el-input placeholder="请输入验证码" type="type" v-model="registerForm.code" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="code()" :disabled="isDisabled">{{!codetime?'发送验证码':codetime + 's后重新获取'}}</el-button>
              </el-form-item>
            </div>
            <!-- 按钮区域 -->
            <el-form-item class="btn">
              <el-button type="primary" @click="back" style="margin-right: 10px;">返回登录</el-button>
              <el-button type="primary" @click="submitForm()" style="margin-right: 10px;">注册</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <!-- 返回首页 -->
    <div class="back" @click="backed">
      <img src="../../assets/login/fanhui.png" alt=""> 返回首页
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 验证手机号正则
    let mobile = /^[1]([3-9])[0-9]{9}$/
    let isMobile = (rule, value, callback) => {
      if (!mobile.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    // 验证密码的正则
    let psd = /^[\d\w]{6,12}$/
    let isPsd = (rule, value, callback) => {
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
      random: '', // 图片随机数
      writen: '', // 输入的随机数
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
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: isPsd }
        ],
        // 确认密码是否合法
        psd2: [
          { required: true, message: '请确认登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
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
  created () {
    // 获取随机数
    this.getRandom()
  },
  methods: {
    // 获取随机数
    getRandom () {
      let chars = '0123456789'
      let maxPos = chars.length
      let code = ''
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      this.random = code
    },
    // 判断手机号是否已经注册
    async judgeMobile () {
      const res = await this.$http.post(`/user/phoneYz`, {
        phone: this.registerForm.mobile
      })
      if (res.data === false) {
        this.$message.error('手机号已被注册')
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    change () {
      this.judgeMobile()
    },
    // 点击按钮触发注册请求
    submitForm () {
      if (this.registerForm.psd1 !== this.registerForm.psd2) return this.$message.error('两次密码不一致')
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) return
        this.$http.post(`/user/addUser`, {
          code: this.registerForm.code,
          phone: this.registerForm.mobile,
          password: this.registerForm.psd1
        }).then((res) => {
          if (res.data === true) {
            this.$message.success('注册成功')
            this.$router.push('/login/login')
          } else {
            this.$message.error('短信验证码错误')
          }
        })
      })
    },
    // 点击按钮触发重置按钮
    resetForm () {
      this.$refs.ruleFormRef.resetFields()
    },
    // 获取短信验证码
    async code () {
      if (this.registerForm.mobile === '' || this.registerForm.mobile.length !== 11 || this.writen !== this.random) return this.$message.error('请输入手机号和随机码')
      if (this.codetime > 0) return
      this.codetime = 60
      let timer = setInterval(() => {
        this.codetime--
        if (this.codetime < 1) {
          clearInterval(timer)
          this.codetime = 0
        }
      }, 1000)
      await this.$http.post(`/user/sendCode`, {
        phone: this.registerForm.mobile
      })
    },
    // 返回登录页面
    back () {
      this.$router.push('/login/login')
    },
    // 返回首页
    backed () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
html, body {
  width: 100%;
  height: 100%;
}
.w {
  width: 1200px;
  margin: 0 auto;
}
.container {
  height: 100%;
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .el-card {
    height: 600px;
    width: 1200px;
    box-sizing: border-box;
    .left {
      box-sizing: border-box;
      padding: 30px;
      float: left;
      width: 800px;
      height: 100%;
      background-color: #f3f5ff;
      img {
        height: 100%;
      }
    }
    .right {
      float: left;
      width: 398px;
      box-sizing: border-box;
      padding-left: 50px;
      padding-top: 50px;
      h3 {
        color: #2B79FF;
        margin-top: 35px;
      }
      .el-form {
        margin-top: 40px;
        padding-right: 15px;
        .code {
          display: flex;
          justify-content: space-between;
          .random {
            background-color: #ddd;
            padding: 0 10px;
            letter-spacing: 2px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}

// 返回首页
.back {
  position: absolute;
  top: 10px;
  right: 10px;
  letter-spacing: 2px;
  cursor: pointer;
  color: #888888;
  font-size: 14px;
  img {
    vertical-align: middle;
    width: 15px;
    height: 15px;
  }
}
</style>
