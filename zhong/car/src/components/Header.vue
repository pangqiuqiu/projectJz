<template>
  <div>
    <div class="navigation_first">
      <div class="w">
        <div>
          <span @click="home">重点汽车网</span>
        </div>
        <div>
          <span v-if="isEmpty" @click="login">[登录/注册]</span>
          <el-dropdown @command="handleCommand" v-if="!isEmpty">
            <span class="el-dropdown-link">
              <el-avatar style="width: 25px;height: 25px;vertical-align: middle;margin-right: 5px" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>您好,欢迎登录重点汽车网
              <span class="count" v-show="this.num !== 0">{{this.num}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="b">个人中心</el-dropdown-item>
              <el-dropdown-item command="a">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      my: null,
      num: null
    }
  },
  methods: {
    // 点击logo回到首页
    home () {
      this.$router.push('/home')
    },
    // 跳转登录注册
    login () {
      this.$router.push('/login/login')
    },
    // 点击登录状态
    handleCommand (command) {
      if (command === 'a') {
        Cookie.remove('token')
        Cookie.remove('ID')
        Cookie.remove('mediaID')
        this.$router.go(0)
      } else if (command === 'b') {
        this.$router.push('/user/home')
      }
    },
    // 获取用户的系统消息
    async getUserSystem () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return
      const { data: res } = await this.$http.post('/mess/showMessCountW', {
        userId: Cookie.get('ID')
      })
      this.num = res
    }
  },
  computed: {
    isEmpty () {
      if (this.my) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.my = Cookie.get('token')
    // 获取用户的系统消息
    this.getUserSystem()
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
// 一级导航
.navigation_first {
  background-color: #F8F8F8;
  span:hover {
    color: rgb(43, 121, 255);
  }
  .w {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    // padding: 0 150px;
    span {
      margin-right: 20px;
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .router-link-active {
    text-decoration: none;
  }
  .count {
    display: inline-block;
    background-color: red!important;
    color: #fff;
    width: 16px;
    text-align: center;
    line-height: 20px;
    height: 20px;
    border-radius: 50%;
  }
}
</style>
