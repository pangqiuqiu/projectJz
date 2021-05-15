<template>
  <div>
    <!-- 图片 -->
    <img src="../../assets/us/2.png" alt="">
    <!-- 介绍 -->
    <div class="w">
      <div class="left" id="allmap"></div>
      <div class="right">
        <h3>合肥巨石科技有限公司</h3>
        <div class="bot">
          <div>tel: 18655751780</div>
          <div>email: zdqc@zixun.com</div>
          <div>安徽合肥火车站天龙现代城503</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: '安徽合肥火车站天龙现代城503'
    }
  },
  mounted () {
    this.baiduMap()
  },
  methods: {
    // 百度地图组件
    baiduMap () {
      // 百度地图API功能
      var map = new window.BMap.Map('allmap')
      var point = new window.BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 25)
      // 添加鼠标滚动缩放
      map.enableScrollWheelZoom()
      // 创建地址解析器实例
      var myGeo = new window.BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(this.address, function (point) {
        if (point) {
          map.centerAndZoom(point, 17)
          map.addOverlay(new window.BMap.Marker(point))
        } else {
          alert('您选择地址没有解析到结果!')
        }
      }, '安徽省')
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1000px;
  margin: 50px auto;
  display: flex;
  justify-content: flex-start;
  .left {
    height: 250px;
    width: 500px;
    margin-right: 50px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    letter-spacing: 2px;
    .bot {
      div {
        margin-top: 10px;
      }
    }
  }
}
</style>
