<template>
  <div class="container">
    <!-- 登录模块 -->
    <div class="card">
      <el-card class="w" :body-style="{ padding: '0px', height: '100%' }">
        <div class="left">
          <img src="../../assets/login/1.png" alt="">
        </div>
        <div class="right">
          <!-- 欢迎 -->
          <h2>欢迎来到重点汽车网</h2>
          <div class="title">请使用本人注册的</div>
          <div class="title">账户密码登录</div>
          <!-- 表单 -->
          <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="ruleForm" class="demo-ruleForm">
            <!-- 手机号 -->
            <el-form-item prop="mobile">
              <el-input type="text" v-model="loginForm.mobile" autocomplete="off" placeholder="请输入账户"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btn">
              <el-button type="text" class="forget" @click="retrieve">忘记密码 ？ </el-button>
              <div>
                <el-button type="primary" @click="submitForm" style="margin-right: 20px; margin-left: 80px">登录</el-button>
                <el-button @click="register">注册</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <!-- 返回首页 -->
    <div class="back" @click="back">
      <img src="../../assets/login/fanhui.png" alt=""> 返回首页
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
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
      // 这是登录表单的数据绑定对象
      loginForm: {
        mobile: '', // 手机号
        password: '' // 密码
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证手机号是否合法
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isMobile }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { validator: isPsd }
        ]
      }
    }
  },
  methods: {
    // 返回首页
    back () {
      this.$router.push('/home')
    },
    // 点击按钮触发登录请求
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        const res = await this.$http.post(`/user/userLogin`, {
          phone: this.loginForm.mobile,
          password: this.loginForm.password
        })
        if (res.data === null || res.data === '') {
          return this.$message.error('登录失败')
        } else {
          this.$message.success('登录成功')
          let inFifteenMinutes = new Date(new Date().getTime() + 30 * 60 * 60 * 1000)
          Cookie.set('token', res.data.username, { expires: inFifteenMinutes })
          Cookie.set('ID', res.data.id, { expires: inFifteenMinutes })
          Cookie.set('mediaID', res.data.keyId, { expires: inFifteenMinutes })
          this.$router.push(window.sessionStorage.getItem('page'))
          window.sessionStorage.removeItem('page')
        }
      })
    },
    // 跳转注册页面
    register () {
      this.$router.push('/login/register')
    },
    // 触发找回密码页面
    retrieve () {
      this.$router.push('/login/retrieve')
    }
  }
}
</script>

<style lang="less" scoped>
html, body{
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
      padding-left: 50px;
      padding-top: 50px;
      box-sizing: border-box;
      h2 {
        font-weight: 400;
        height: 100px;
        line-height: 100px;
        color: #2B79FF;
      }
      .title {
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
      }
      .el-form {
        margin-top: 40px;
        padding-right: 15px;
        .btn {
          .forget {
            display: block;
            margin-bottom: 15px;
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
