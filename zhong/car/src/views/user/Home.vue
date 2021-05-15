<template>
  <div style="height: 100%">
    <el-container class="home-container">
      <!-- 头部header -->
      <Header></Header>
      <!-- 头部区域 -->
      <el-header>
        <div class="w">重点汽车网 | 个人中心</div>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container class="w">
        <!-- 侧边栏 -->
        <el-aside width="160px">
          <!-- 头像 -->
          <img style="width: 160px; height: 160px" :src="this.userObj.headPic" alt="">
          <!-- 用户信息 -->
          <div>{{this.userObj.username}}</div>
          <div>{{this.userObj.sex}}</div>
          <div>{{this.userObj.city}}</div>
          <div style="height: 30px"></div>
          <!-- 侧边栏菜单区域 -->
          <el-menu background-color="#ddd" text-color="#333" active-text-color="#409EFF" unique-opened :collapse-transition="false" router :default-active="activePath">
            <el-menu-item index="/user/system">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span style="text-align: center">系统通知</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/forum">
              <template slot="title">
                <i class="el-icon-chat-line-square"></i>
                <span style="text-align: center">我的论坛</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/media">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span style="text-align: center">自媒体</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/follow">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span style="text-align: center">我的关注</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/collection">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span style="text-align: center">我的收藏</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/user/data">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span style="text-align: center">个人资料</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Cookie from 'js-cookie'
const ID = Cookie.get('ID')
export default {
  components: {
    Header
  },
  data () {
    return {
      // 被激活的链接地址
      activePath: '',
      userObj: {
        headPic: '',
        username: '',
        name: '',
        sex: '',
        city: ''
      }
    }
  },
  created () {
    // 获取用户基本信息
    this.getUserInfo()
  },
  methods: {
    // 获取用户基本信息
    async getUserInfo () {
      if (ID === null) {
        return this.$router.push('/home')
      }
      const { data: res } = await this.$http.post('/user/getUser', {
        id: ID
      })
      this.userObj = res
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.w {
  width: 1100px;
  margin: 0 auto;
}
.el-header {
  background-color: rgb(43, 121, 255);
  padding-left: 20px;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
}

.el-aside {
  div {
    text-align: center;
    margin-top: 10px;
  }
  background-color: #ddd;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  padding: 10px;
}
</style>
