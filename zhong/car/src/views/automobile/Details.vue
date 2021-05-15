<template>
  <div id="app">
    <!-- 首页导航 -->
    <Header></Header>
    <!-- 汽车标题 -->
    <div class="w automobile_name">
      <div class="left">
        <span class="name">{{this.automobileDetailsList.series}}</span>
      </div>
    </div>
    <!-- 本页导航 -->
    <el-menu :default-active="$route.path"
      class="w"
      mode="horizontal"
      background-color="#2b79ff"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <el-menu-item index="/automobile/details/detailsHome">车系首页</el-menu-item>
      <el-menu-item index="/automobile/details/parameterconfiguration">配置参数</el-menu-item>
      <el-menu-item @click="pic" index="/picture/home">图片</el-menu-item>
      <el-menu-item index="/automobile/details/video">视频</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      // 汽车详情数组
      automobileDetailsList: []
    }
  },
  methods: {
    // 获取汽车详情信息
    async getAutomobileDetailsList () {
      let ID = window.sessionStorage.getItem('carDetails')
      const { data: res } = await this.$http.post(`/car/carDetails`, { series: ID })
      this.automobileDetailsList = res
    },
    pic () {
      let ID = window.sessionStorage.getItem('carDetails')
      window.sessionStorage.setItem('photo', ID)
    }
  },
  created () {
    // 获取汽车详情信息
    this.getAutomobileDetailsList()
  }
}
</script>

<style lang="less" scoped>
// 版心1200px
.w {
  width: 1200px;
  margin: 0 auto;
}
// 汽车标题
.automobile_name {
  height: 70px;
  line-height: 70px;
  font-weight: 700;
  font-size: 20px;
}
// 本页导航
.el-menu {
  position: relative;
  display: flex;
  justify-content: flex-start;
  .el-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .el-menu-item {
    font-size: 16px;
  }
}
</style>
