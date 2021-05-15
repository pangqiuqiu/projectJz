<template>
  <el-container class="w">
    <!-- 左侧主体 -->
    <el-main width="830px">
      <!-- 主营车系 -->
      <el-card class="major" shadow="never">
        <h3>店铺资讯</h3>
        <!-- 信息分类 -->
        <h5>信息分类 > </h5>
        <el-radio-group v-model="radio1" size="mini" @change="changeRadio1">
          <el-radio border label="团购活动">团购活动</el-radio>
          <el-radio border label="店铺活动">店铺活动</el-radio>
          <el-radio border label="品牌新闻">品牌新闻</el-radio>
        </el-radio-group>
        <div style="clear: both;"></div>
        <!-- 车系选择 -->
        <h5>车系选择 > </h5>
        <el-radio-group @change="changeRadio2" v-model="radio2" size="mini" v-if="this.radio1 !== '品牌新闻'">
          <el-radio border label="不限">不限</el-radio>
          <el-radio border :label="item" v-for="item in seriesAry" :key="item">{{item}}</el-radio>
        </el-radio-group>
        <el-radio-group @change="changeRadio2" v-model="radio2" size="mini" v-else>
          <el-radio border label="不限">不限</el-radio>
        </el-radio-group>
      </el-card>
      <!-- 资讯列表 -->
      <el-card class="all" shadow="never">
        <h1>资讯列表</h1>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <img :src="item.coverPic" alt="" style="width: 300px; height: 150px">
            <div>
              <h3 @click="jump(item.id)">{{item.title}}</h3>
              <p>{{item.intro}}</p>
              <div class="store">
                <div>{{item.type}}</div>
                <div>{{item.issueDate}}</div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          hide-on-single-page
          @current-change="change"
          :page-size="pageSize"
          :current-page="pageNo"
          :total="total">
        </el-pagination>
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
      radio1: '团购活动',
      radio2: '不限',
      seriesAry: [],
      pageSize: 5,
      pageNo: 1,
      total: 0,
      list: []
    }
  },
  methods: {
    // 获取车系
    async getSeries () {
      const { data: res } = await this.$http.post(`/dealer/getDealerSeries`, {
        dealerId: window.sessionStorage.getItem('distributorId')
      })
      // console.log(res)
      this.seriesAry = res
    },
    // 获取资讯
    async getLsit () {
      if (this.radio2 === '不限') {
        const { data: res } = await this.$http.post(`/dealer/getInforD`, {
          dealerId: window.sessionStorage.getItem('distributorId'),
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          type: this.radio1,
          series: ''
        })
        this.list = res.l
        this.total = res.num
      } else {
        const { data: res } = await this.$http.post(`/dealer/getInforD`, {
          dealerId: window.sessionStorage.getItem('distributorId'),
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          type: this.radio1,
          series: this.radio2
        })
        this.list = res.l
        this.total = res.num
      }
    },
    // 改变页数
    change (index) {
      this.pageNo = index
      this.getLsit()
    },
    // 当信息分类发生改变时
    changeRadio1 () {
      if (this.radio1 === '品牌新闻') {
        this.radio2 = '不限'
      }
      this.getLsit()
    },
    // 当车系发生变化
    changeRadio2 () {
      this.getLsit()
    },
    // 详情页
    jump (id) {
      const { href } = this.$router.resolve({
        path: '/automotivelnformation/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取车系
    this.getSeries()
    // 获取资讯
    this.getLsit()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 主营车系
.major {
  .el-radio {
    margin-left: 0!important;
    margin-right: 5px!important;
    margin-bottom: 5px;
  }
  h3 {
    padding-bottom: 10px;
    // border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
  }
  h5 {
    margin-bottom: 5px;
  }
}
// 资讯列表
.all {
  margin-top: 20px;
  h1 {
    padding-bottom: 10px;
  }
  li {
    display: flex;
    justify-content: flex-start;
    padding: 20px 0;
    border-bottom: 1px dashed #ccc;
    img {
      width: 200px;
      margin-right: 20px;
    }
    h3:hover {
      color: rgb(43, 121, 255);
      cursor: pointer;
    }
    p {
      color: #777;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    .store {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      :first-child {
        float: left;
        padding: 3px 6px;
        border: 1px solid #ccc;
      }
      :last-child {
        float: left;
        margin-left: 50px;
      }
    }
  }
  // 分页
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
