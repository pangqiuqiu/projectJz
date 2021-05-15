<template>
  <div>
    <!-- 资讯 -->
    <el-card class="infor" shadow="never">
      <ul>
        <h4>最新资讯</h4>
        <li v-for="(item,index) in inforList" :key="index" @click="infor(item.id)">{{item.title}}</li>
      </ul>
    </el-card>
    <!-- 经销商地址 -->
    <el-card class="dis_address" shadow="never">
      <h4>{{this.obj.name4s}} <el-tag size="mini" effect="dark"> 4S店</el-tag> </h4>
      <div style="overflow: hidden;">
        <label style="float: left;">服务评分:</label>
        <span style="float: left;"><el-rate v-model="fenshu" disabled text-color="#ff9900"></el-rate></span>
      </div>
      <div>
        <label>优惠咨询:</label>
        <span style="color: #EB3030;">{{this.obj.tel}}</span>
      </div>
      <!-- <div>
        <label>综合服务:</label>
        <span style="color: #999;font-size: 13px;margin-right: 5px;" v-for="(item,index) in this.obj.service" :key="index">{{item}}</span>
      </div> -->
      <div>
        <label>商家地址:</label>
        <span style="color: #0777DD;font-size: 13px;">{{this.obj.address}}</span>
      </div>
    </el-card>
    <!-- 经销商地址图片 -->
    <el-card style="margin-top: 20px;" shadow="never">
      <div id="allmap"></div>
    </el-card>
  </div>
</template>

<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      // 经销商信息
      obj: {},
      // 评分
      fenshu: 4.8,
      // 地址
      address: '',
      inforList: [] // 最新资讯
    }
  },
  methods: {
    // 百度地图组件
    async baiduMap () {
      const { data: res } = await this.$http.post(`/dealer/getDealer`, {
        id: window.sessionStorage.getItem('distributorId')
      })
      this.address = res.city + res.address
      // 百度地图API功能
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 25)
      // 添加鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(this.address, function (point) {
        if (point) {
          map.centerAndZoom(point, 16)
          map.addOverlay(new BMap.Marker(point))
        } else {
          alert('您选择地址没有解析到结果!')
        }
      }, '安徽省')
    },
    async getInformation () {
      const { data: res } = await this.$http.post(`/dealer/getDealer`, {
        id: window.sessionStorage.getItem('distributorId')
      })
      // console.log(res.province + res.city + res.address)
      this.obj = res
    },
    // 最新资讯
    async getInfor () {
      const { data: res } = await this.$http.post('/Infor/getNew', {
        dealerId: window.sessionStorage.getItem('distributorId')
      })
      this.inforList = res
    }
  },
  created () {
    this.getInformation()
    // 最新资讯
    this.getInfor()
  },
  mounted () {
    this.baiduMap()
  }
}
</script>

<style lang="less" scoped>
.infor {
  margin-bottom: 20px;
  li {
    cursor: pointer;
    margin-top: 7px;
    color: #333;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 2px;
  }
  li:hover {
    color: rgb(43, 121, 255);
  }
}
// 经销商地址
.dis_address {
  div {
    margin-bottom: 5px;
  }
  h4 {
    margin-bottom: 20px;
  }
  label {
    font-size: 13px;
    color: #333333;
    margin-right: 15px;
  }
}
// 地址图片
#allmap {
  height: 300px;
  width: 250px;
}
</style>
