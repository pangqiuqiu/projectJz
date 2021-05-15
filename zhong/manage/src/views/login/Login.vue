<template>
  <div class="container">
    <!-- 登录模块 -->
    <div class="login">
      <h4>欢迎登录 <span> 重点汽车网经销商管理平台</span></h4>
      <div class="contain">
        <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="ruleForm" label-width="60px"  class="demo-ruleForm">
          <!-- 账号 -->
          <el-form-item label="账号" prop="mobile">
            <el-input type="text" v-model="loginForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm" type="warning">修改密码</el-button>
            <el-button type="success" @click="distributor">我是经销商</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
    // 点击按钮触发登录请求
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        const { data: res } = await this.$http.post('/user/login', {
          phone: this.loginForm.mobile,
          password: this.loginForm.password
        })
        if (JSON.stringify(res.list) === '[]') {
          this.$router.push({
            path: '/company',
            query: { id: res.token }
          })
        } else if (res === '') {
          this.$message.error('密码或账号错误')
        } else {
          this.$message.success('登录成功')
          this.$store.commit('clearMenu')
          window.sessionStorage.setItem('token', res.token)
          this.$store.commit('setMenu', res.list)
          // 登录成功追加动态路由
          this.$store.commit('addMenu', this.$router)
          this.$router.push('/')
        }
      })
    },
    // 点击按钮触发跳转
    resetForm () {
      this.$router.push('/retrieve')
    },
    distributor () {
      this.$router.push('/mobile')
    }
  }
}
</script>

<style lang="less" scoped>
html, body{
  width: 100%;
  height: 100%;
}
.container {
  position: relative;
  height: 100%;
  background-color: #999;
  // background-image: url('../../assets/login/login.jpg');
  // background-size: 100%;
  // overflow: hidden;
}
.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 500px;
  h4 {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .contain {
    margin: auto;
    padding: 30px 20px 0 20px;
    .btn {
      display: flex;
      justify-content: space-around;
    }
    .jump {
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
