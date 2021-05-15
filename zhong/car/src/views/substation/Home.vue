<template>
  <div>
    <!-- 顶部导航 -->
    <Header></Header>
    <!-- 正文上面横幅 -->
    <header class="w">
      <div class="left">
        <img src="../../assets/logo/logo.png" @click="image" alt="" style="cursor: pointer;">
        <span @click="changeLocation">{{location}}分站</span>
      </div>
      <div class="right" @click="admin">经销商登录</div>
    </header>
    <!-- 分割线 -->
    <div class="w">
      <el-divider></el-divider>
    </div>
    <!-- 今日焦点 -->
    <section class="w">
      <h2>今日焦点</h2>
      <!-- 资讯 -->
      <div class="infor">
        <!-- 轮播图 -->
        <el-carousel height="340px">
          <el-carousel-item v-for="item in swiperList" :key="item.coverPic">
            <img :src="item.coverPic" alt="" @click="focus(item)">
          </el-carousel-item>
        </el-carousel>
        <!-- 文字资讯 -->
        <ul>
          <!-- :class="(index === 4 || index === 0) ? 'select' : ''" -->
          <li v-for="(item,index) in writtenInforList" :key="index" @click="focus(item)">{{item.title}}</li>
        </ul>
      </div>
    </section>
    <!-- 广告模块 -->
    <section class="w adv" v-if="advList[0] !== null">
      <img :src="adv1.pic" alt="" style="height: 100px; width: 1200px" @click="jumpAdvertisement(adv1.url)">
    </section>
    <!-- 热门车型 -->
    <section class="w">
      <h2>热门车型</h2>
      <div class="w line">
        <el-divider></el-divider>
      </div>
      <ul class="hot">
        <li v-for="(item,index) in hotModel" :key="index">
          <div @click="carDetails(item.series)">
            <img :src="item.seriesPic" alt="">
            <span>{{item.series}}</span>
          </div>
        </li>
      </ul>
    </section>
    <!-- 车市报价 -->
    <el-container class="w">
      <el-main style="padding: 0">
        <!-- 分类标题 -->
        <div class="title">
          <h2>车市报价</h2>
          <ul>
            <li @click="changeTitle(item,index)" v-for="(item,index) in titleList" :key="index" :class="currentTitleIndex === index ? 'select' : ''">{{item}}</li>
          </ul>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 表格信息 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="series" label="车系" width="160"></el-table-column>
          <el-table-column prop="carType" label="型号" width="180"></el-table-column>
          <el-table-column prop="offer" label="报价(万元)" width="120"></el-table-column>
          <el-table-column label="降幅(万元)" width="120">
            <template slot-scope="scope">
              <i class="el-icon-bottom" style="color: #399F51; font-weight: 700"></i>
              <span style="color: #399F51">{{scope.row.scope}}</span>
            </template>
          </el-table-column>
          <el-table-column label="经销商">
            <template slot-scope="scope">
              <div class="scope">
                <span>{{scope.row.dealerName}}</span>
                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">询底价</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-aside width="240px">
        <!-- 侧边标题 -->
        <div class="title">
          <h3>商家促销</h3>
          <div @click="batch">换一批</div>
        </div>
        <!-- 促销内容 -->
        <ul>
          <li v-for="(item,index) in promotionList" :key="index" @click="focus(item)">
            <i></i>{{item.title}}
          </li>
        </ul>
        <!-- 广告 -->
        <section v-if="advList[2] !== null">
          <img :src="adv3.pic" alt="" style="height: 110px; width: 210px; cursor: pointer;" @click="jumpAdvertisement(adv3.url)">
        </section>
      </el-aside>
    </el-container>
    <!-- 询价表单 -->
    <el-dialog title="填写信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formAlign" style="padding: 0 20px">
        <el-form-item label="您的姓名" :label-width="formLabelWidth">
          <el-input v-model="formAlign.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="您的联系方式" :label-width="formLabelWidth">
          <el-input v-model="formAlign.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="disabled" @click="upDatedialogForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 经销商推荐 -->
    <section class="w">
      <h2>经销商推荐</h2>
      <div class="w line">
        <el-divider></el-divider>
      </div>
      <!-- 宫格 -->
      <ul class="grid">
        <li v-for="(item,index) in recommendList" :key="index">
          <div class="item" @click="dealerDetails(item.id)">
            <img :src="item.logo ? item.logo : 'https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/林肯(进口).png'" alt="">
            <div>{{item.name4s}}</div>
            <div>{{item.tel}}</div>
          </div>
        </li>
      </ul>
    </section>
    <!-- 广告模块 -->
    <section class="w adv" v-if="advList[1] !== null">
      <img :src="adv2.pic" alt="" style="height: 100px; width: 1200px" @click="jumpAdvertisement(adv2.url)">
    </section>
    <!-- 资讯 -->
    <div class="w foot">
      <!-- 热门资讯 -->
      <aside>
        <h2>热门资讯</h2>
        <ul class="first">
          <li @click="focus(item)" v-for="(item,index) in hotInfor" :key="index">
            <i></i> {{item.title}}
          </li>
        </ul>
      </aside>
      <!-- 行情优惠 -->
      <aside style="margin: 0 20px;">
        <h2>行情优惠</h2>
        <ul class="second">
          <li @click="focus(item)" v-for="(item,index) in discount" :key="index">
            <i></i>
            {{item.title}}
          </li>
        </ul>
      </aside>
      <!-- 商家动态 -->
      <aside>
        <h2>商家动态</h2>
        <ul class="third">
          <li @click="focus(item)" v-for="(item,index) in business" :key="index">
            <i></i>
            {{item.title}}
          </li>
        </ul>
      </aside>
    </div>
    <!-- 切换定位 -->
    <el-dialog title="请选择城市" :visible.sync="dialogForm" class="dialogCity">
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
    <!-- 联系我们 -->
    <Footer style="margin-bottom: 20px"></Footer>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      // 当前城市
      location: sessionStorage.getItem('selectCity') || sessionStorage.getItem('LocationCity'),
      cityList: [],
      // 轮播图数组
      swiperList: [],
      // 文字资讯数组
      writtenInforList: [],
      // 热门车型
      hotModel: [],
      // 车市报价
      titleList: ['最新报价', '8万以下', '8-12万', '12-18万', '18-25万', '25-40万', '40万以上'],
      titles: '最新报价',
      tableData: [],
      currentTitleIndex: 0,
      // 用户信息对话框
      formLabelWidth: '100px',
      formAlign: {
        name: '',
        phone: '',
        city: '',
        carId: '',
        dealerId: '',
        series: '',
        type: '获取底价'
      },
      dialogFormVisible: false,
      // 商家促销
      promotionList: [],
      pageSize: 8,
      pageNo: 1,
      // 推荐经销商
      recommendList: [],
      // 底部资讯
      hotInfor: [],
      discount: [],
      business: [],
      // 广告模块
      adv1: {}, // 上通栏
      adv2: {}, // 下通栏
      adv3: {}, // 促销广告
      advList: [],
      // 城市切换
      dialogForm: false
    }
  },
  computed: {
    // 判断询价表单按钮
    disabled () {
      if (this.formAlign.name.trim().length !== 0 && (/^1[3456789]\d{9}$/.test(this.formAlign.phone))) return false
      return true
    }
  },
  methods: {
    // 点击Logo回到首页
    image () {
      this.$router.push('/home')
    },
    // 获取焦点图
    async getSwiperList () {
      const { data: res } = await this.$http.post('/Infor/substationLb', {
        city: this.location
      })
      this.swiperList = res
    },
    // 获取焦点资讯
    async getTodayInfo () {
      const { data: res } = await this.$http.post('/Infor/substationJd', {
        city: this.location
      })
      this.writtenInforList = res
    },
    // 获取热门车型
    async getHotCar () {
      const { data: res } = await this.$http.post('/car/hotSeries')
      this.hotModel = res
    },
    carDetails (series) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', series)
      window.open(href, '_blank')
    },
    // 获取车市报价
    async getTableData () {
      const { data: res } = await this.$http.post('/dealer/carOfferByCity', {
        price: this.titles,
        city: this.location
      })
      this.tableData = res
    },
    // 获取商家促销
    async getPromotionList () {
      const { data: res } = await this.$http.post('/Infor/sales', {
        city: this.location,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      this.promotionList = res
    },
    // 获取推荐经销商
    async getRecommendList () {
      const { data: res } = await this.$http.post('/dealer/getDealerByCity', {
        city: this.location
      })
      this.recommendList = res
    },
    dealerDetails (id) {
      window.sessionStorage.setItem('distributorId', id)
      const { href } = this.$router.resolve({
        path: '/distr/main',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 获取热门资讯
    async getHotInfor () {
      const { data: res } = await this.$http.post('/Infor/hotInfor', {
        city: this.location
      })
      this.hotInfor = res
    },
    async getDiscount () {
      const { data: res } = await this.$http.post('/Infor/hqyh', {
        city: this.location
      })
      this.discount = res
    },
    async getBusiness () {
      const { data: res } = await this.$http.post('/Infor/sjdt', {
        city: this.location
      })
      this.business = res
    },
    // 获取页面广告数据
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [
          { name: '分站上通栏', area: this.location },
          { name: '分站下通栏', area: this.location },
          { name: '促销广告', area: this.location }
        ]
      })
      this.advList = res
      this.adv1 = res[0]
      this.adv2 = res[1]
      this.adv3 = res[2]
    },
    // 切换定位城市
    async changeLocation () {
      const { data: res } = await this.$http.post('/area/hotCity')
      this.cityList = res
      this.dialogForm = true
    },
    selectCity (a) {
      window.sessionStorage.setItem('selectCity', a)
      this.dialogForm = false
      this.$router.go(0)
    },
    // 点击广告跳转
    jumpAdvertisement (id) {
      if (id.indexOf('https://') > -1) {
        window.open(`${id}`)
      } else {
        window.open(`http://${id}`)
      }
    },
    // 经销商登录
    admin () {
      window.open('https://www.zhongdianqiche.com/manage')
    },
    // 点击资讯跳转
    focus (item) {
      if (item.sign === '资讯') {
        const { href } = this.$router.resolve({
          path: '/automotivelnformation/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '视频') {
        const { href } = this.$router.resolve({
          path: '/video/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '帖子') {
        const { href } = this.$router.resolve({
          path: '/forum/post/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号视频') {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 切换标题
    changeTitle (item, index) {
      this.currentTitleIndex = index
      this.titles = item
      this.getTableData()
    },
    // 换一批
    batch () {
      this.pageNo = this.pageNo + 1
      this.getPromotionList()
    },
    // 询底价
    handleEdit (row) {
      this.formAlign.city = this.location
      this.formAlign.carId = row.carId
      this.formAlign.dealerId = row.dealerId
      this.formAlign.series = row.series
      this.dialogFormVisible = true
    },
    // 提交询价表单
    async upDatedialogForm () {
      const res = await this.$http.post('/dealer/addXs', this.formAlign)
      if (res.status !== 200 || res.data !== true) return this.$message.error('提交失败')
      this.$message.success('提交成功')
      // 清空表单
      this.formAlign.name = ''
      this.formAlign.phone = ''
      this.dialogFormVisible = false
    }
  },
  created () {
    // // 获取焦点图
    this.getSwiperList()
    // // 获取焦点资讯
    this.getTodayInfo()
    // // 获取热门车型
    this.getHotCar()
    // // 获取车市报价
    this.getTableData()
    // // 获取商家促销
    this.getPromotionList()
    // // 获取推荐经销商
    this.getRecommendList()
    // // 获取热门资讯
    this.getHotInfor()
    this.getDiscount()
    this.getBusiness()
    // // 获取页面广告数据
    this.getAdvertisement()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 分割线
.line {
  margin-bottom: 15px;
}
// 正文上面横幅
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: #000000;
  font-size: 13px;
  span {
    cursor: pointer;
  }
  img {
    vertical-align: middle;
    margin-right: 40px;
    height: 40px;
  }
  .right {
    cursor: pointer;
  }
}
// 广告模块
.adv {
  height: 100px;
  cursor: pointer;
  margin: 20px auto;
}
// 标题
h2 {
  height: 80px;
  line-height: 80px;
}
// 今日焦点
.infor {
  display: flex;
  justify-content: flex-start;
  .el-carousel {
    width: 670px;
    img {
      height: 100%;
      cursor: pointer;
      transition: all 1s;
      overflow: hidden
    }
    img:hover {
      transform: scale(1.05)
    }
  }
  ul {
    padding-left: 20px;
    width: 510px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      box-sizing: border-box;
      font-size: 14px;
      color: #000;
      margin-bottom: 12px;
      letter-spacing: 2px;
      width: 170px;
      height: 20px;
      line-height: 20px;
      border-right: 1px solid #ccc;
      padding: 0 7px;
    }
    li:hover {
      color: red;
      cursor: pointer;
    }
    li:nth-of-type(3n) {
      border-right: 0;
    }
    .select {
      color: #FE0000;
      font-size: 14px;
      font-weight: 700;
    }
  }
}
// 热门车型
.hot {
  display: flex;
  justify-content: space-between;
  li {
    margin-right: 20px;
    width: 100%;
    cursor: pointer;
    >div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        margin-bottom: 10px;
      }
      span {
        color: #666;
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
  li:nth-of-type(6n) {
    margin-right: 0;
  }
}
// 车市报价
.el-container {
  .el-main {
    .title {
      display: flex;
      justify-content: flex-start;
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        li {
          margin-left: 60px;
          color: #666;
          font-size: 14px;
          cursor: pointer;
        }
        .select {
          color: #2B79FF;
        }
      }
    }
    .el-table {
      .scope {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .el-aside {
    padding-left: 30px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      h3 {
        color: #666;
        font-size: 17px;
        font-weight: 400;
      }
      div {
        color: #999;
        font-size: 10px;
        cursor: pointer;
      }
    }
    ul {
      li {
        color: #666;
        font-size: 15px;
        margin-bottom: 10px;
        letter-spacing: 2px;
        cursor: pointer;
      }
      i {
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #0B85F4;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
// 推荐经销商
.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 200px;
    box-sizing: border-box;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    cursor: pointer;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      img {
        margin-bottom: 10px;
        width: 100%;
      }
      :nth-child(2) {
        color: #2158B6;
      }
      :nth-child(3) {
        color: #DD0115;
        margin: 10px 0;
      }
    }
  }
  li:nth-of-type(6n) {
    border-right: 1px solid #ddd;
  }
  li:nth-of-type(n+7) {
    border-bottom: 1px solid #ddd;
  }
}
// 底部资讯
.foot {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  h2 {
    font-weight: 400;
  }
  .first {
    border: 1px solid #ccc;
  }
  .second {
    border: 1px solid #ccc;
  }
  .third {
    border: 1px solid #ccc;
  }
  ul {
    box-sizing: border-box;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      height: 30px;
      line-height: 30px;
      color: #666;
      font-size: 14px;
      letter-spacing: 1px;
      cursor: pointer;
      width: 50%;
    }
    i {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: #dedede;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
// 城市选择
.dialogCity {
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
</style>
