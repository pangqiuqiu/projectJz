<template>
  <div>
    <!-- 头部导航 -->
    <Header></Header>
    <!-- 商家信息 -->
    <div class="w shopping">
      <!-- 左侧logo -->
      <div class="left">
        <img :src="this.distributor.logo" alt="">
      </div>
      <!-- 中间信息 -->
      <div class="middle">
        <h1>{{this.distributor.name4s}}</h1>
        <div>
          <label>地址：</label>
          <span>{{this.distributor.address}}</span>
        </div>
      </div>
      <!-- 右侧电话 -->
      <div class="right">
        <label>优惠咨询：</label>
        <span>{{this.distributor.tel}}</span>
      </div>
    </div>
    <!-- 页面导航 -->
    <div class="nav">
      <el-menu :default-active="$route.path"
        mode="horizontal"
        class="w"
        background-color="#2b79ff"
        text-color="#fff"
        active-text-color="#fff"
        router>
        <el-menu-item index="/distr/shophome">店铺首页</el-menu-item>
        <el-menu-item index="/distr/exhibitionhall">车型展示</el-menu-item>
        <el-menu-item index="/distr/infor">店铺资讯</el-menu-item>
        <el-menu-item index="/distr/contactus">公司介绍</el-menu-item>
      </el-menu>
    </div>
    <!-- 占位符 -->
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
    return {
      // 经销商信息
      distributor: {}
    }
  },
  created () {
    this.getDetails()
  },
  methods: {
    // 经销商详情
    async getDetails () {
      const id = Number(window.sessionStorage.getItem('distributorId'))
      const { data: res } = await this.$http.post(`/dealer/getDealer`, {
        id: id
      })
      this.distributor = res
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 商家信息
.shopping {
  overflow: hidden;
  height: 120px;
  .left {
    float: left;
    margin-right: 40px;
    img {
      margin-top: 20px;
      width: 120px;
      height: 60px;
    }
  }
  .middle {
    float: left;
    h1 {
      margin: 20px 0 10px 0;
    }
  }
  .right {
    float: right;
    line-height: 120px;
    label {
      color: #999;
      font-size: 14px;
    }
    span {
      color: #f44;
      font-size: 22px;
      font-weight: 700;
    }
  }
}
// 页面导航
.nav {
  background-color: #2b79ff;
  .el-menu {
    display: flex;
    justify-content: space-between;
    height: 50px;
  }
}
.el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
</style>
