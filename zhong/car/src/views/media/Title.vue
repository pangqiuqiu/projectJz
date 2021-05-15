<template>
  <div>
    <Header></Header>
    <h2 class="w title">自媒体</h2>
    <div class="w">
      <el-menu class="w" router mode="horizontal" background-color="#2b79ff" text-color="#fff" :default-active="$route.path" active-text-color="#fff">
        <el-menu-item index="/media/home">首页</el-menu-item>
        <!-- <el-menu-item index="/media/selected">精选</el-menu-item> -->
        <el-menu-item index="/media/bigguy">大咖评车</el-menu-item>
        <el-menu-item index="/media/manual">用车宝典</el-menu-item>
        <el-menu-item index="/media/technical">技术解读</el-menu-item>
        <el-menu-item index="/media/expert">玩车行家</el-menu-item>
        <el-menu-item index="/media/analysis">行业分析</el-menu-item>
        <el-menu-item index="/media/travel">自驾旅行</el-menu-item>
        <el-menu-item index="/media/energy">新能源车</el-menu-item>
        <el-menu-item index="/media/focusing">热点聚焦</el-menu-item>
        <el-menu-item index="/media/culture">汽车文化</el-menu-item>
        <el-menu-item index="/media/autoshow">车展</el-menu-item>
        <el-menu-item index="/media/all">全部重点号</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
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
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}

.title {
  height: 55px;
  line-height: 55px;
}

.el-menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0;
  width: 1200px;
}

.el-menu, .el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
</style>
