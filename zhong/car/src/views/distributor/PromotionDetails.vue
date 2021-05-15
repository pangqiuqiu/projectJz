<template>
  <el-container class="w">
    <!-- 左侧主体 -->
    <el-main width="830px">
      <el-card>
        <h1>{{this.headerObj.title}}</h1>
        <div class="firstBlock">
          <img src="../../assets/logo/logo.jpg" alt="">
          <div>
            <h3>最高优惠：{{this.headerObj.zgyh}}!</h3>
            <div class="row">
              <div class="row1">其他优惠：{{this.headerObj.a}}</div>
              <div class="row2">
                <label>排量：</label>
                <span><i v-for="item in this.headerObj.listUtil2.label.enginel" :key="item">{{item}}</i></span>
                <label>级别：</label>
                <span>{{this.headerObj.listUtil2.label.level}}</span>
              </div>
              <div class="row3">
                <label>变速箱：</label>
                <span><i v-for="item in this.headerObj.listUtil2.label.gearBoxl" :key="item">{{item}}</i></span>
                <label>驱动方式：</label>
                <span><i v-for="item in this.headerObj.listUtil2.label.driveWayl" :key="item">{{item}}</i></span>
              </div>
              <div class="row4">
                <el-input size="mini" v-model="username" placeholder="请输入称号 (如王先生)"></el-input>
                <el-input size="mini" v-model="phone" placeholder="请输入手机号"></el-input>
                <el-button @click="submit" size="mini" type="warning">获取底价</el-button>
              </div>
            </div>
          </div>
        </div>
        <h4>优惠详情</h4>
        <div class="promotionTime">促销时间：{{this.headerObj.saleDate}}</div>
        <div style="clear: both;"></div>
        <el-divider></el-divider>
        <p>{{this.headerObj.text}}</p>
        <!-- 商家 -->
        <img class="image" :src="this.headerObj.yhpic" alt="">
        <div class="des">
          <div>
            <label>商家名称：</label>
            <span>{{this.addressObj.name4s}}</span>
          </div>
          <div>
            <label>资讯电话：</label>
            <span style="color: #EB3030;margin-right: 5px;">{{this.addressObj.phone}}</span>
            <el-tag size="mini" effect="dark" style="color: #fff;">24H</el-tag>
          </div>
          <div>
            <label>商家地址：</label>
            <span>{{this.addressObj.address}}</span>
          </div>
        </div>
        <!-- 免责声明 -->
        <div class="careful">
          <h5>免责声明：</h5>
          <p>1. 上述文章内容由经销商自行发布，其真实性、准确性及合法性由经销商负责，本网站不提供任何保证，亦不承担任何法律责任。</p>
          <p>2. 报价均由商家提供，本网站只提供网络平台，过低价格可能存在附加条件，请提高警惕。</p>
        </div>
      </el-card>
    </el-main>
    <!-- 右侧商家地址 -->
    <el-aside style="padding-top: 20px;">
      <Distributor></Distributor>
    </el-aside>
  </el-container>
</template>

<script>
import Distributor from '../../components/Distributor.vue'
export default {
  components: {
    Distributor
  },
  data () {
    return {
      username: '',
      phone: '',
      headerObj: {},
      addressObj: {},
      // 表格数据
      listData: [
        {
          carEntrustId: '荣威RX5 MAX 2019款 400TGI 自动4G互联豪华版',
          name: '23',
          carRewardId: '34',
          carFundProvider: '34',
          carFrameNo: '354',
          carNo: '534'
        }
      ]
    }
  },
  methods: {
    // 获取底价
    submit () {
      if (this.username.trim().length === 0) {
        return this.$message.warning('请输入称呼')
      }
    },
    // 头部信息框
    async getHeader () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post(`/Infor/getCxInforD`, {
        id: id
      })
      this.headerObj = res
    },
    // 商家地址
    async getAddress () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post(`/dealer/getContact`, {
        dealerId: id
      })
      this.addressObj = res
    }
  },
  created () {
    // 头部信息框
    this.getHeader()
    // 商家地址
    this.getAddress()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
// 第一块
.firstBlock {
  display: flex;
  justify-content: flex-start;
  img {
    width: 240px;
    margin-right: 20px;
  }
  h3 {
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    background-color: pink;
    color: #fff;
  }
  .row {
    background-color: #ddd;
    padding: 10px 10px 10px 10px;
    >div {
      margin-bottom: 10px;
    }
    .row2, .row3 {
      color: #999;
      font-size: 12px;
      label {
        display: inline-block;
        width: 60px;
      }
      span {
        display: inline-block;
        width: 180px;
        i {
          font-style: normal;
          margin-right: 3px;
        }
      }
    }
    .row4 {
      .el-input {
        width: 170px;
        margin-right: 10px;
      }
    }
  }
}
// 第二块
h4 {
  float: left;
  margin-right: 30px;
  height: 44px;
  line-height: 70px;
  color: #FF6B09;
}
.promotionTime {
  float: left;
  font-size: 13px;
  color: #EB3030;
  line-height: 65px;
}
// 商家
.image {
  margin-top: 20px;
  width: 100%;
}
.des {
  div {
    margin-top: 6px;
  }
  label {
    color: #999999;
    font-size: 13px;
  }
  span {
    color: #222;
  }
}
// 声明
.careful {
  margin-top: 15px;
  background-color: #fef8e5;
  padding: 10px;
  color: #b65e08;
  p {
    font-size: 12px;
  }
}
</style>
