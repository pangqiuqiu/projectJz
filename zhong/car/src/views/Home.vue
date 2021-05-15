<template>
  <div class="home">
    <!-- 头部一级导航 -->
    <Header></Header>
    <!-- 头部logo -->
    <header class="w">
      <div class="left">
        <!-- logo -->
        <div>
          <img @click="logo" style="cursor: pointer;" src="../assets/logo/logo.png" alt="">
        </div>
        <!-- 定位 -->
        <div>
          <i class="el-icon-location"></i>
          <div id="allmap"></div>
        </div>
        <span class="local_city" @click="changeLocation">{{LocationCity}}</span>
        <!-- 分站 -->
        <router-link target="_blank" to="/substation/home" style="font-size: 12px; margin-left: 10px">进入城市分站</router-link>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <div class="block">
          <el-cascader filterable placeholder="请选择品牌/车系" v-model="search" :options="options" :props="{ label: 'label', value: 'label' }"></el-cascader>
        </div>
        <el-button style="background: rgb(43, 121, 255); color: #fff" @click="findOut">查找</el-button>
        <el-button style="background: rgb(43, 121, 255); color: #fff" @click="findBrand">条件找车</el-button>
      </div>
    </header>
    <!-- 开屏广告 -->
    <el-dialog style="margin-top: -30px; height: 100%" :visible.sync="dialogTableVisible" width="80%" top="0" :show-close="false" v-if="this.objAdv.pic && this.advFlag !== 'ed'">
      <img :src="this.objAdv.pic ? this.objAdv.pic : ''" alt="" style="width: 100%; height: 400px; display: block; cursor: pointer" @click="foreign1">
    </el-dialog>
    <!-- 切换定位 -->
    <el-dialog title="请选择城市" :visible.sync="dialogFormVisible">
      <ul>
        <li v-for="item in cityList" :key="item.label">
          <h3>{{item.label}}</h3>
          <div v-for="items in item.children" :key="items.city">
            <span @click="selectCity(items.city)">{{items.city}}</span>
          </div>
          <div style="clear: both"></div>
        </li>
      </ul>
    </el-dialog>
    <!-- 导航栏 -->
    <div class="navigation">
      <div style="color: rgb(43, 121, 255); width: 100%">
        <el-menu class="" router mode="horizontal" background-color="#2b79ff" text-color="#fff" :default-active="$route.path" active-text-color="#fff">
          <div class="w abc">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/specialsale/salelist">特卖</el-menu-item>
            <el-menu-item index="/automotivelnformation/home">资讯</el-menu-item>
            <el-menu-item index="/forum/forumtitle">论坛</el-menu-item>
            <el-menu-item index="/picture/homepic">图片</el-menu-item>
            <el-menu-item index="/video/home">视频</el-menu-item>
            <el-menu-item index="/distr/offer">报价</el-menu-item>
            <el-menu-item index="/distr/distributor">经销商</el-menu-item>
            <el-menu-item index="/media/home">自媒体</el-menu-item>
            <el-menu-item index="/us/about">关于我们</el-menu-item>
          </div>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
    <!-- 公司介绍 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      // 定位
      LocationCity: sessionStorage.getItem('LocationCity'),
      // 搜索框
      options: [],
      search: [],
      // 对话框
      dialogFormVisible: false,
      formLabelWidth: '120px',
      cityList: [],
      // 开屏广告
      dialogTableVisible: false,
      objAdv: {},
      advFlag: window.sessionStorage.getItem('advFlag')
    }
  },
  methods: {
    // 定位
    ready () {
      if (!sessionStorage.getItem('LocationCity')) {
        const that = this
        window.AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true
          })
          geolocation.getCityInfo((status, res) => {
            var map = new window.BMap.Map('allmap')
            map.centerAndZoom(new window.BMap.Point(res.center[0], res.center[1]), 15)
            var myGeo = new window.BMap.Geocoder()
            myGeo.getLocation(new window.BMap.Point(res.center[0], res.center[1]), function (result) {
              if (result) {
                window.sessionStorage.setItem('LocationCity', result.addressComponents.city) // 定位城市
                window.sessionStorage.setItem('LocationProvince', result.addressComponents.province) // 定位省份
                that.getAdvertisement()
              }
              that.LocationCity = sessionStorage.getItem('LocationCity')
            })
          })
        })
      }
    },
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [{
          name: '开屏', area: sessionStorage.getItem('LocationProvince')
        }]
      })
      this.objAdv = res[0] || {}
      setTimeout(() => {
        window.sessionStorage.setItem('advFlag', 'ed')
      }, 1500)
    },
    foreign1 () {
      if (this.objAdv.url.indexOf('https://') > -1) {
        window.open(`${this.objAdv.url}`)
      } else {
        window.open(`http://${this.objAdv.url}`)
      }
    },
    // 点击logo跳回首页
    logo () {
      this.$router.push('/home')
    },
    // 获取搜索框内容
    async getSearchList () {
      const { data: res } = await this.$http.post('/car/brandSeriesS')
      this.options = res
    },
    // 条件找车
    findBrand () {
      const { href } = this.$router.resolve('/distr/offer')
      window.open(href, '_blank')
    },
    // 查找
    findOut () {
      if (this.search.length === 0) return
      window.sessionStorage.setItem('carDetails', this.search[1])
      const { href } = this.$router.resolve('/automobile/details')
      window.open(href, '_blank')
    },
    // 切换定位城市
    async changeLocation () {
      const { data: res } = await this.$http.post('/area/hotCity')
      this.cityList = res
      this.dialogFormVisible = true
    },
    // 选择对话框城市
    selectCity (a) {
      window.sessionStorage.setItem('LocationCity', a)
      this.dialogFormVisible = false
      this.$router.go(0)
    }
  },
  mounted () {
    // 百度
    this.ready()
    // 开屏广告显示
    this.dialogTableVisible = true
  },
  created () {
    // 搜索框
    this.getSearchList()
  }
}
</script>

<style lang="less" scoped>
// 版心1200px
.w {
  width: 1200px;
  margin: 0 auto;
}
// 被选中项 增加样式
.checked {
  color: #000!important;
}
.slectedSlider {
  color: orange!important;
}
.footerCurrent {
  display: block!important;
}
.el-menu-item {
  font-size: 18px!important;
  font-family: "Microsoft YaHei";
  height: 46px;
  line-height: 46px;
}
.el-menu {
  height: 46px;
}
// 一级导航
.navigation_first {
  background-color: #ddd;
  span:hover {
    color: blue;
  }
  .w {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    // padding: 0 150px;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
// logo
header {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    justify-content: flex-start;
    height: 70px;
    line-height: 70px;
    i {
      margin: 0 6px 0 20px;
      display: inline-block;
      vertical-align: middle;
    }
    .local_city {
      cursor: pointer;
    }
  }
  img {
    height: 40px;
    display: inline-block;
    vertical-align: middle;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-cascader {
      width: 400px;
    }
  }
}
// 对话框
.el-dialog {
  ul {
    padding: 0 10px;
    height: 300px;
    overflow-y: scroll;
    overflow: auto;
  }
  li {
    overflow: hidden;
    margin-bottom: 20px;
    h3 {
      margin-bottom: 10px;
    }
    div {
      float: left;
      span {
        display: inline-block;
        margin: 5px;
        cursor: pointer;
      }
    }
  }
}
// 导航栏
.navigation {
  .abc {
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: 20px;
}

.wsxdr {
  width: 1200px;
  margin: 20px auto;
}
</style>
