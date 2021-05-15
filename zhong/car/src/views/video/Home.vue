<template>
  <div class="all">
    <Header></Header>
    <div class="w">
      <h2>汽车视频</h2>
      <div class="navigation">
        <el-menu class="w" router mode="horizontal" background-color="#2b79ff" text-color="#fff" :default-active="$route.path" active-text-color="#fff">
          <el-menu-item index="/video/main">首页</el-menu-item>
          <el-menu-item index="/video/original">原创视频</el-menu-item>
          <el-menu-item index="/video/newcar">新车视频</el-menu-item>
          <el-menu-item index="/video/autoshow">车展视频</el-menu-item>
          <el-menu-item index="/video/technology">技术视频</el-menu-item>
          <el-menu-item index="/video/testdrive">试驾视频</el-menu-item>
        </el-menu>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
h2 {
  height: 60px;
  line-height: 60px;
}
.el-menu {
  height: 50px;
  margin-bottom: 20px;
}
.el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 17px;
}
</style>
