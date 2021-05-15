<template>
  <div>
    <!-- 头部导航 -->
    <Header></Header>
    <!-- 汽车资讯 -->
    <h2 class="w">汽车资讯</h2>
    <!-- 导航 -->
    <el-menu :default-active="$route.path"
      class="w"
      mode="horizontal"
      background-color="#2b79ff"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <el-menu-item index="/automotivelnformation/carnews">车讯</el-menu-item>
      <el-menu-item index="/automotivelnformation/testdrive">试驾评测</el-menu-item>
      <el-menu-item index="/automotivelnformation/shoppingguide">导购</el-menu-item>
      <el-menu-item index="/automotivelnformation/technology">技术</el-menu-item>
      <el-menu-item index="/automotivelnformation/culture">行业文化</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
export default {
  components: {
    Header
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
// 标题
h2 {
  height: 60px;
  line-height: 60px;
}
// 导航
.el-menu {
  margin-bottom: 10px;
  height: 50px;
}
.el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
</style>
