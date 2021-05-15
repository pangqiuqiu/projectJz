<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" style="height: 40px; cursor: pointer; margin-left: 20px" @click="home">
        <span>后台管理系统</span>
        <span>{{dealerName}}</span>
      </div>
      <div>
        <el-dropdown style="margin-right: 20px">
          <span class="el-dropdown-link">
            公众号<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <img src="../assets/logo/1.jpg" alt="" style="width: 100px">
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="info" @click="logout" size="small">{{this.btnText}}</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse"> | | | </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.token + ''" v-for="item in menulist" :key="item.token">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span style="font-size: 16px">{{item.token}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.list" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu" style="margin-left: 10px"></i>
                <!-- 文本 -->
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      //用户登录名
      dealerName:'',
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      // 按钮上的字体
      btnText: window.sessionStorage.getItem('simulationToken') ? '退出模拟登录' : '退出'
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      if(this.btnText === '退出模拟登录') {
        window.sessionStorage.removeItem('simulationToken')
        this.$router.go(0)
      } else {
        this.$confirm('确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(async () => {
          const res = await this.$http.post('/user/out', {
            token: window.sessionStorage.getItem('token')
          })
          if (res.status !== 200 || res.data !== true) return this.$message.error('退出失败')
          window.sessionStorage.clear()
          this.$store.commit('clearMenu')
          this.$router.push('/login')
        }).catch(() => {
        })
      }
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.post('/user/Cbl', {
        token: window.sessionStorage.getItem('token')
      })
      this.menulist = res.list
      this.dealerName= res.dealerName
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 回到首页
    home () {
      window.sessionStorage.removeItem('activePath')
      this.$router.push('/')
      setTimeout(() => {
        this.$router.go(0)
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
