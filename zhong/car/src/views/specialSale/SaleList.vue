<template>
  <div>
    <!-- 广告 -->
    <div class="w">
      <img :src="this.obj.pic ? this.obj.pic : ''" alt="" @click="foreign1">
    </div>
    <!-- 特卖车型 -->
    <ul class="w iconly">
      <li v-for="(item,index) in iconList" :key="item" @click="handleOffer(item,index)" :class="currentIconIndex === index ? 'select' : ''">
        <img :src='`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/pic/${item}.png`' />
        <span>{{item}}</span>
      </li>
    </ul>
    <!-- 特卖价格 -->
    <ul class="price w condition">
      <div>价格:</div>
      <li @click="changePrice(item,index)" :class="currentPriceIndex === index ? 'select' : ''" v-for="(item,index) in priceList" :key="item">{{item}}</li>
    </ul>
    <!-- 特卖部分品牌 -->
    <ul class="brand w condition">
      <div>品牌:</div>
      <li @click="changeBrand(item,index)" :class="currentBrandIndex === index ? 'select' : ''" v-for="(item,index) in brandList1" :key="item">{{item}}</li>
      <i class="icon" :class="iconBrand" @click="showAllBrand"></i>
    </ul>
    <!-- 特卖所有品牌 -->
    <div class="w">
      <ul class="brandAll" v-show="isShowAllBrand">
        <li v-for="item in brandList2" :key="item.label" class="item">
          <div class="title">{{item.label}}</div>
          <div class="items">
            <span v-for="items in item.children" :key="items" @click="changeBrand(items)">{{items}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 热门车型 -->
    <h2 class="w">热门特卖车型</h2>
    <!-- 表格 -->
    <ul class="w tableData">
      <li v-for="item in list" :key="item.series" @click="details(item)">
        <div>
          <!-- 角标 -->
          <div class="items">
            <img src="../../assets/special/3.png" alt="" class="image">
          </div>
          <div class="seriesPic"><img :src="item.seriesPic" alt=""></div>
          <div class="item">
            <h3>{{item.series}}</h3>
            <div class="time">特卖时间：{{yearDate}}-{{monthDate}}-{{dayDate}}</div>
            <div class="bottom">
              <div>已有<em>{{item.num}}</em>人报名</div>
              <div><img :src="item.brandPic" alt=""></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="this.formAlign.pageNo"
      :page-size="this.formAlign.pageSize"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 广告
      advertiseList: [],
      obj: {},
      // 图标
      iconList: [],
      // 被选中图标索引
      currentIconIndex: -1,
      // 价格列表
      priceList: ['不限', '8万以下', '8-12万', '12-18万', '18-25万', '25-40万', '40-80万', '80万以上'],
      // 价格索引
      currentPriceIndex: 0,
      // 品牌列表
      brandList1: [],
      brandList2: [],
      // 是否展开所有品牌
      isShowAllBrand: false,
      // 品牌索引
      currentBrandIndex: 0,
      iconBrand: 'el-icon-arrow-down',
      // 特卖列表
      list: [],
      total: 0,
      // 特卖列表参数
      formAlign: {
        price: '不限',
        brand: '不限',
        level: '不限',
        pageSize: 20,
        pageNo: 1
      },
      // 当前时间
      dayDate: '',
      monthDate: '',
      yearDate: ''
    }
  },
  methods: {
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [{
          name: '特卖顶部通栏', area: sessionStorage.getItem('LocationCity')
        }]
      })
      this.advertiseList = res
      this.obj = this.advertiseList[0] || {}
    },
    foreign1 () {
      if (this.obj.url.indexOf('https://') > -1) {
        window.open(`${this.obj.url}`)
      } else {
        window.open(`http://${this.obj.url}`)
      }
    },
    // 获取icon
    async getIcon () {
      const { data: res } = await this.$http.post('/car/getAllL')
      this.iconList = res
      this.iconList.unshift('新能源')
    },
    // 获取部分品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/sale/getTmBH')
      this.brandList1 = res
      this.brandList1.unshift('不限')
    },
    // 获取所有品牌
    async getBrandAll () {
      const { data: res } = await this.$http.post('/sale/getTmB')
      this.brandList2 = res
    },
    // 点击icon
    handleOffer (item, index) {
      // 二次点击取消选中状态
      if (this.currentIconIndex === index) {
        this.currentIconIndex = -1
        this.formAlign.level = ''
        this.getList()
        return
      }
      this.currentIconIndex = index
      this.formAlign.level = item
      this.getList()
    },
    // 切换价格
    changePrice (item, index) {
      this.currentPriceIndex = index
      this.formAlign.price = item
      this.getList()
    },
    // 切换品牌
    changeBrand (item, index) {
      // 隐藏选择框
      this.isShowAllBrand = false
      this.iconBrand = 'el-icon-arrow-down'
      this.currentBrandIndex = index
      this.formAlign.brand = item
      this.getList()
    },
    // 展示所有品牌
    showAllBrand () {
      // 未展开时
      if (this.iconBrand === 'el-icon-arrow-down') {
        this.iconBrand = 'el-icon-arrow-up'
        this.isShowAllBrand = true
      } else {
        this.iconBrand = 'el-icon-arrow-down'
        this.isShowAllBrand = false
      }
    },
    // 获取特卖列表
    async getList () {
      const { data: res } = await this.$http.post('/sale/getTm', this.formAlign)
      this.list = res.l
      this.total = res.num
    },
    // 切换分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getList()
    },
    // 去往详情页
    details (item) {
      const items = {
        brand: item.brand,
        series: item.series
      }
      const { href } = this.$router.resolve({
        path: '/specialsale/saledetails',
        query: { id: JSON.stringify(items) }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取icon
    this.getIcon()
    // 获取部分品牌
    this.getBrand()
    this.getBrandAll()
    // 获取特卖列表
    this.getList()
    // 当前时间
    var myDate = new Date()
    this.yearDate = myDate.getFullYear()
    this.monthDate = myDate.getMonth() + 1
    this.dayDate = myDate.getDate()
  },
  mounted () {
    this.getAdvertisement()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 图标
.iconly {
  display: flex;
  justify-content: space-between;
  height: 40px;
  li {
    line-height: 40px;
    color: #333;
    cursor: pointer;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .select {
    background-color: #DEDEDE;
  }
}
// 特卖价格 品牌
.condition {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  border: 1px solid #ccc;
  position: relative;
  div {
    margin: 0 30px;
    color: #999;
  }
  li {
    margin-right: 25px;
    cursor: pointer;
  }
  .select {
    padding: 5px 10px;
    background-color: rgb(43, 121, 255);
    color: #fff;
    border-radius: 3px;
  }
  .icon {
    position: absolute;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
// 所有品牌
.brandAll {
  position: absolute;
  z-index: 50;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #EDEDED;
  width: 1200px;
  .item {
    width: 50%;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .title {
    font-size: 18px;
    color: rgb(43, 121, 255);
    margin: 5px 0;
  }
  .items {
    font-size: 13px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    span {
      margin-right: 15px;
      cursor: pointer;
    }
    span:hover {
      color: rgb(43, 121, 255);
    }
  }
}
// 特卖车型
h2 {
  height: 70px;
  line-height: 70px;
  color: rgb(43, 121, 255);
}
.tableData {
  // border-bottom: 1px solid #ccc;
  // border-right: 1px solid #ccc;
  overflow: hidden;
  li {
    box-sizing: border-box;
    float: left;
    width: 25%;
    box-sizing: border-box;
    // border-top: 1px solid #ccc;
    // border-left: 1px solid #ccc;
    border: .5px solid #ccc;
    cursor: pointer;
    .items {
      position: relative;
      .image {
        position: absolute;
        width: 100px;
      }
    }
    .item {
      padding: 0 10px;
      h3 {
        margin-top: 7px;
      }
      .time {
        margin: 10px 0;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        em {
          color: red;
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
