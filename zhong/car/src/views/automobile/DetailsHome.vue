<template>
  <div id="app">
    <!-- 车系信息 -->
    <div class="series-information w">
      <div class="left">
        <el-image :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/series/${series}.jpg`" alt="重点汽车"></el-image>
        <div class="athm-carcolor">
          <i>外观颜色</i>
          <ul>
            <li v-for="item in colors" :key="item" :style="{backgroundColor: item}"></li>
          </ul>
        </div>
        <ul class="pic-list" v-if="seriesInformation.carPicList">
          <li>
            <el-image :src="seriesInformation.carPicList[0]" alt="重点汽车"></el-image>
            <span>外观</span>
          </li>
          <li>
            <el-image :src="seriesInformation.carPicList[1]" alt="重点汽车"></el-image>
            <span>内饰</span>
          </li>
          <li>
            <el-image :src="seriesInformation.carPicList[2]" alt="重点汽车"></el-image>
            <span>空间</span>
          </li>
        </ul>
      </div>
      <div class="middle">
        <!-- 官方价 -->
        <p>
          <i>官方指导价格: </i>
          <strong>{{seriesInformation.guide}}万</strong>
        </p>
        <!-- 经销商报价 -->
        <p>
          <i>经销商报价: </i>
          <span>{{seriesInformation.off}}万</span>
        </p>
        <!-- 按钮 -->
        <div class="information-activity">
          <div style="backgroundColor: #EB3030; color: #fff" @click="dialogFormVisible = true">获取底价</div>
          <div style="backgroundColor: #2B79FF; color: #fff" @click="dialogFormVisible = true">降价通知</div>
          <div style="border: 1px solid #DDDDDD">分期购车</div>
        </div>
        <!-- 参数 -->
        <p class="parameter">
          <i>排量:</i>
          <span>{{seriesInformation.engine}}</span>
          <i>变速箱:</i>
          <span>{{seriesInformation.gearBox}}</span>
        </p>
        <p class="parameter">
          <i>级别:</i>
          <span>{{seriesInformation.level}}</span>
          <i>车身类型:</i>
          <span>{{seriesInformation.carType}}</span>
        </p>
        <!-- 表格 -->
        <table>
          <thead>
            <tr>
              <th style="padding-left: 10px">竞品车系</th>
              <th style="width: 100px">排量</th>
              <th>售价</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in boutiqueCarList" :key="item.id">
              <td style="padding-left: 10px" @click="toSeries(item.series)">{{item.series}}</td>
              <td>{{item.engine}}</td>
              <td>{{item.guidePrice}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right">
        <img src="https://dx2.xcar.com.cn/attachedjpg/20210129/16001660170.jpg" alt="">
      </div>
    </div>
    <!-- 最新上市资讯 -->
    <div class="inforly w">
      <div class="new-infor">
        <div class="levels">
          <h4>最新上市</h4>
          <div class="l"></div>
        </div>
        <ul>
          <li v-for="item in latestListingList" :key="item.id">
            <div>
              <span></span>
              <p @click="informationTitle(item.id)">{{item.title}}</p>
            </div>
            <i>{{item.issueDate}}</i>
          </li>
        </ul>
      </div>
      <div class="buyCar">
        <div class="levels">
          <h4>买车必看</h4>
          <div class="l"></div>
        </div>
        <ul>
          <li v-for="item in buyCarMustSee" :key="item.id" @click="informationTitle(item.id)">
            <img :src="item.coverPic" alt="">
            <div>
              <h5>{{item.title}}</h5>
              <p>
                <i>{{item.issueDate}}</i>
                <i class="el-icon-chat-dot-square"> {{item.comNum}}</i>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 车型报价 -->
    <div class="w model_quotation">
      <!-- 标题 -->
      <div class="title">
        <span class="selectedItem">车型报价</span>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 详情 -->
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{'background-color': '#F5F5F5', 'height': '25px'}">
          <el-table-column
            prop="type"
            label="款式"
            width="400">
          </el-table-column>
          <el-table-column
            prop="guidePrice"
            label="官方价(万元)"
            width="250">
          </el-table-column>
          <el-table-column
            prop="offer"
            label="本地最低报价"
            width="250">
          </el-table-column>
          <el-table-column prop="button" label="">
            <template slot-scope="scope">
              <div style="padding-left: 110px">
                <el-button style="backgroundColor: #0777DD; color: #FFF" size="mini" @click="table_bottom(scope.row.id)">获取底价</el-button>
                <el-button size="mini" @click="table_buy(scope.row.id)">分期购车</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 询问低价 -->
    <div class="w asking_reserve_price">
      <el-row :gutter="20">
        <el-col :span="16">
          <!-- Tab栏 -->
          <Tab></Tab>
        </el-col>
        <el-col :span="8" style="padding-top: 20px; padding-left: 40px">
          <h4 style="color: #333; margin-bottom: 20px;">推荐车系</h4>
          <ul>
            <li @click="jump_series(item.series)" v-for="item in dealersRecommendAry" :key="item.index">
              <h4>{{item.brand}} / {{item.series}}</h4>
              <span>{{item.guidePrice}}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <!-- 推荐经销商 -->
    <div class="w recommend_dealers">
      <!-- 标题 -->
      <el-row :gutter="20" class="title">
        <h4>推荐经销商</h4>
      </el-row>
      <!-- 详情 -->
      <el-row :gutter="20" class="details">
        <div v-for="item in dealersAry" :key="item.index">
          <div class="left">
            <div>{{item.name4s}}</div>
            <div>
              <label>电话：</label>
              <span style="color: red;">{{item.tel}}</span>
            </div>
            <div>
              <label>地址：</label>
              <span>{{item.address}}</span>
            </div>
            <div>
              <el-button type="success" @click="True(item.id)" size="mini">获取底价</el-button>
            </div>
          </div>
        </div>
      </el-row>
    </div>
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :carInfo="mag" :info="msg" width="40%">
      <el-form :model="form">
        <el-form-item label="您的姓名" :label-width="formLabelWidth">
          <el-input style="width: 300px" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input style="width: 300px" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="TrueDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BMap from 'BMap'
import Tab from '../../components/Tab.vue'
let id = window.sessionStorage.getItem('carDetails')
export default {
  components: {
    Tab
  },
  data () {
    return {
      series: window.sessionStorage.getItem('carDetails'),
      // 定位
      locationProvince: '',
      locationCity: '',
      // 城市
      provinceAry: [], // 省
      cityAry: [], // 市
      value: '',
      // 汽车详情
      seriesInformation: {},
      colors: [],
      // 竞品车系
      boutiqueCarList: [],
      // 最新上市
      latestListingList: [],
      buyCarMustSee: [],
      // 车型报价表格
      tableData: [],
      // 推荐经销商
      dealersAry: [],
      dealersRecommendAry: [],
      // 对话框
      dialogFormVisible: false,
      title: '',
      msg: 0, // 经销商id
      mag: 0, // 汽车id
      form: {
        name: '',
        phone: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 百度定位
    ready () {
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(r => {
        this.locationProvince = r.address.province
        this.locationCity = r.address.city
        // 获取经销商列表
        this.getDistributor()
      }, { enableHighAccuracy: true })
    },
    // 获取汽车详细信息
    async getDetailsList () {
      const { data: res } = await this.$http.post('/car/carDetails', {
        series: this.series
      })
      this.seriesInformation = res
      this.getBoutiqueCar()
    },
    // 车系颜色
    async getSeriesColors () {
      const { data: res } = await this.$http.post('/car/getColorBySeries', {
        series: this.series
      })
      this.colors = res
    },
    // 获取精品车系
    async getBoutiqueCar () {
      const { data: res } = await this.$http.post('/car/getCompetitor', {
        level: this.seriesInformation.level,
        price: this.seriesInformation.guide
      })
      this.boutiqueCarList = res
    },
    // 跳转车系
    toSeries (item) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', item)
      window.open(href, '_blank')
    },
    // 最新上市
    async getLatestListing () {
      const { data: res } = await this.$http.post('/Infor/MostInforcx', {
        series: this.series
      })
      this.latestListingList = res
    },
    // 买车必看
    async getMustSee () {
      const { data: res } = await this.$http.post('/Infor/MostInforcx', {
        series: this.series,
        type: '测评'
      })
      this.buyCarMustSee = res
    },
    // 跳转资讯
    informationTitle (id) {
      const { href } = this.$router.resolve({
        path: '/automotivelnformation/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 车型报价
    async getModelQuotation () {
      const { data: res } = await this.$http.post(`/car/carOffer`, {
        series: id,
        city: window.sessionStorage.getItem('selectCity') || window.sessionStorage.getItem('LocationCity')
      })
      // console.log(res)
      this.tableData = res
    },
    // 获取底价 分期购车
    table_bottom (id) {
      this.title = '获取底价'
      this.dialogFormVisible = true
      this.mag = id
    },
    table_buy (id) {
      this.title = '分期购车'
      this.dialogFormVisible = true
      this.mag = id
    },
    // 车型报价排量
    async getDisplacement () {
      const { data: res } = await this.$http.post(`/car/engine`, {
        id: id
      })
      this.model_quotation_displacement = res
    },
    // 车型报价变速箱
    async getTransmissioncase () {
      const { data: res } = await this.$http.post(`/car/gearBox`, {
        id: id
      })
      this.model_quotation_transmission = res
    },
    // 推荐经销商列表
    async getDistributor () {
      const { data: res } = await this.$http.post('/dealer/getTjD', {
        series: id,
        province: this.locationProvince,
        city: this.locationCity
      })
      this.dealersAry = res
    },
    // 推荐车系
    async getRecommendSeries () {
      const { data: res } = await this.$http.post('/car/getGuide', {
        series: this.series
      })
      this.dealersRecommendAry = res.l
    },
    // 获取底价
    True (disId) {
      this.title = '获取底价'
      this.msg = disId
      this.dialogFormVisible = true
    },
    // 对话框
    async TrueDialog () {
      if (this.form.phone === '' || this.form.name === '') {
        return this.$message.error('请输入手机号和姓名')
      }
      const mobile = /^1[3456789]\d{9}$/
      if (!mobile.test(this.form.phone)) {
        return this.$message.error('手机号不合法')
      }
      const res = await this.$http.post(`/dealer/addXs`, {
        type: '获取底价',
        dealerId: this.msg,
        series: id,
        name: this.form.name,
        phone: this.form.phone,
        carId: this.mag
      })
      // console.log(res)
      if (res.data === true && res.status === 200) {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
      } else {
        return this.$message.success('提交失败')
      }
    },
    // 推荐车系
    jump_series (series) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', series)
      window.open(href, '_blank')
    }
  },
  mounted () {
    this.ready()
  },
  created () {
    // 获取汽车详细详细
    this.getDetailsList()
    this.getSeriesColors()
    // 最新上市
    this.getLatestListing()
    this.getMustSee()
    // 车型报价
    this.getModelQuotation()
    // 车型报价排量
    this.getDisplacement()
    // 车型报价变速箱
    this.getTransmissioncase()
    // 推荐车系
    this.getRecommendSeries()
  }
}
</script>

<style lang="less" scoped>
// 版心1200px
.w {
  width: 1200px;
  margin: 0 auto;
}
// 被选中项
.selectedItem {
  font-weight: 700!important;
  color: #000!important;
  font-size: 16px!important;
}
.selectedItem1 {
  color: #FF6B09;
}
.selectedItem2 {
  background-color: skyblue!important;
}
.selectedItem3 {
  background-color: red!important;
  color: #fff!important;
}
i {
  font-style: normal;
}
p {
  margin: 0;
}
// 车系信息
.series-information {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  .left {
    >.el-image {
      width: 400px;
      height: 276px;
    }
    .athm-carcolor {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px 0;
      i {
        margin: 0 20px;
        color: #333;
        font-size: 14px;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        li {
          margin-right: 8px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1px solid #ddd;
          cursor: pointer;
        }
      }
    }
    .pic-list {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        .el-image {
          width: 120px;
          height: 90px;
        }
        span {
          margin-top: 5px;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
  .middle {
    flex: 1;
    margin: 0 30px;
    p {
      margin-bottom: 15px;
      i {
        margin-right: 8px;
        font-size: 14px;
        color: #999;
      }
      strong {
        font-size: 26px;
        color: #EB3030;
      }
      span {
        font-size: 14px;
        color: #333;
      }
    }
    .information-activity {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      div {
        width: 105px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        cursor: pointer;
      }
      div:hover {
        opacity: .8;
      }
    }
    .parameter {
      span {
        display: inline-block;
        width: 140px;
      }
    }
    table {
      border-spacing: 0;
      width: 100%;
      thead {
        width: 100%;
        background: #F6F6F6;
        th {
          padding: 5px 0;
          text-align: left;
          font-size: 14px;
          font-weight: normal;
          color: #999;
        }
      }
      tbody {
        td:hover {
          color: #2B79FF;
          cursor: pointer;
        }
        td {
          padding: 5px 0;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .right {
    width: 300px;
    img {
      width: 100%;
      height: 407px;
    }
  }
}
// 最新上市
.inforly {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  h4 {
    font-size: 15px;
    color: #333;
  }
  .levels {
    position: relative;
    padding-bottom: 10px;
    width: 530px;
    border-bottom: 3px solid #E5E5E5;
    .l {
      position: absolute;
      top: 30px;
      width: 60px;
      height: 3px;
      background-color: #FF4444;
    }
  }
  .new-infor {
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            margin-right: 10px;
            width: 5px;
            height: 5px;
            background: #D7D7D7;
            border-radius: 50%;
          }
          p {
            font-size: 10px;
            color: #333333;
          }
          p:hover {
            cursor: pointer;
            color: #2B79FF;
          }
        }
        i {
          font-size: 9px;
          color: #999;
        }
      }
    }
  }
  .buyCar ul {
    li {
      display: flex;
      justify-content: flex-start;
      margin-top: 10px;
      cursor: pointer;
      img {
        margin-right: 20px;
        width: 150px;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        h5 {
          font-size: 12px;
          font-weight: normal;
          color: #333;
        }
        p {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
// 车型报价
.model_quotation {
  margin-top: 30px;
  .title {
    height: 50px;
    line-height: 50px;
    span {
      margin-right: 30px;
      font-size: 13px;
      color: #ccc;
      cursor: pointer;
    }
  }
}
/deep/.el-table__header .has-gutter th {
  padding: 5px 0;
}
// 询问低价
.asking_reserve_price {
  margin-top: 30px;
  h5 {
    color: orange;
    margin-bottom: 20px;
  }
  .tab1 {
    .el-select {
      width: 160px;
      margin-right: 20px;
    }
    .el-input {
      width: 300px;
    }
    .el-button {
      width: 300px;
    }
  }
  .tab3 {
    .el-radio-button {
      margin-right: 10px;
    }
  }
  ul {
    border: 1px solid #ccc;
    padding: 10px;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      list-style: none;
    }
  }
  li:hover {
    color: rgb(43, 121, 255);
  }
}
// 车主综合评价
.comprehensive_evaluation {
  margin-top: 20px;
  h4 {
    height: 50px;
    line-height: 50px;
    color: #FF6B09;
  }
  ul li {
    float: left;
    margin-right: 40px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
  .vehicle_ranking {
    margin-bottom: 10px;
    font-weight: 700;
    span {
      color: red;
    }
  }
  .details {
    .right {
      img {
        width: 100px;
        height: 70px;
        float: left;
      }
      .rightItem {
        width: 45%;
        float: left;
        margin-bottom: 10px;
        >div {
          float: left;
        }
        .public {
          color: #ccc;
          font-size: 12px;
          >span {
            color: red;
          }
        }
      }
    }
  }
}
// 汽车CSS图片
.css_picture {
  margin-top: 30px;
  .title1 {
    display: flex;
    justify-content: space-between;
    >div {
      color: #ccc;
      font-size: 12px;
    }
  }
  .title2 {
    color: orange;
    line-height: 40px;
    height: 40px;
  }
  ul {
    float: left;
    width: 100px;
    height: 430px;
    li {
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #ddd;
      color: #111;
      cursor: pointer;
    }
  }
  .el-collapse {
    float: left;
    width: 280px;
    .el-collapse-item {
      padding-left: 20px;
    }
  }
}
// 推荐经销商
.recommend_dealers {
  margin-top: 40px;
  margin-bottom: 20px;
  .title {
    height: 50px;
    line-height: 50px;
    h4 {
      float: left;
      color: #000;
    }
    .left {
      overflow: hidden;
      >div {
        float: right;
        color: #333;
        font-size: 13px;
      }
      .el-select {
        width: 100px;
        margin-right: 10px;
      }
    }
  }
  .details {
    overflow: hidden;
    .left {
      float: left;
      margin-right: 10%;
      width: 40%;
      margin-bottom: 15px;
      label {
        color: #ccc;
        font-size: 12px;
      }
      span {
        display: inline-block;
        font-size: 12px;
        margin-bottom: 10px;
      }
      :first-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
