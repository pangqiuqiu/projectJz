<template>
  <div>
    <!-- 头部导航 -->
    <Header></Header>
    <!-- 汽车资讯 -->
    <h2 class="w">图片库</h2>
    <!-- 导航 -->
    <el-menu :default-active="$route.path"
      class="w"
      mode="horizontal"
      background-color="#2b79ff"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <el-menu-item index="/picture/realshooting">实拍</el-menu-item>
      <!-- <el-menu-item index="/picture/detailedexplanation">车型详解</el-menu-item>
      <el-menu-item index="/picture/vr">VR看车</el-menu-item>
      <el-menu-item index="/picture/graphic">图解</el-menu-item>
      <el-menu-item index="/picture/selected">精选</el-menu-item> -->
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
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
// 标题
h2 {
  height: 60px;
  line-height: 60px;
}
.el-menu {
  height: 50px;
}
.el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
