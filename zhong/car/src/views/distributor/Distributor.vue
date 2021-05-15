<template>
  <el-container class="w">
    <el-aside width="250px">
      <CarSideList @func="getCarName"></CarSideList>
    </el-aside>
    <el-main>
      <h3>找经销商</h3>
      <!-- 对应经销商区域 -->
      <div class="bottom">
        <!-- 经销商数据 -->
        <ul style="overflow: hidden;">
          <li v-for="item in list" :key="item.id">
            <div>
              <img @click="home(item.id)" :src="item.logo" alt="" style="width: 132px; height: 99px; cursor: pointer;">
            </div>
            <div class="left">
              <div class="title">
                <h4 @click="home(item.id)">{{item.name4s}}</h4>
                <el-tag type="success" size="mini" effect="dark"> 4S店 </el-tag>
              </div>
              <div class="else">
                <label>地址：</label>
                <span>{{item.address}}</span>
              </div>
              <div class="else">
                <label>主营品牌：</label>
                <span>{{item.brand}}</span>
              </div>
              <div class="else">
                <label>电话：</label>
                <em>{{item.tel}}</em>
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <el-pagination
          @current-change="changePage"
          hide-on-single-page
          :page-size="this.formAlign.pageSize"
          :current-page="this.formAlign.pageNo"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import CarSideList from '../../components/picture/CarSideList.vue'
export default {
  components: {
    CarSideList
  },
  data () {
    return {
      formAlign: {
        // 用来接收子组件
        brand: '',
        series: '',
        pageNo: 1,
        pageSize: 6,
        city: window.sessionStorage.getItem('selectCity') || window.sessionStorage.getItem('LocationCity')
      },
      total: 0,
      // 经销商信息
      list: []
    }
  },
  methods: {
    // 初始化加载经销商
    async getDistributorList () {
      const { data: res } = await this.$http.post(`/dealer/getDealer2`, this.formAlign)
      // console.log(res)
      this.list = res.l
      this.total = res.num
    },
    // 点击侧边栏 加载经销商
    async getCarName (data) {
      if (!data.children) {
        this.formAlign.series = data.label
      } else {
        this.formAlign.brand = data.label
        this.formAlign.series = ''
      }
      const { data: res } = await this.$http.post('/dealer/getDealer2', this.formAlign)
      this.list = res.l
      this.total = res.num
    },
    // 分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getDistributorList()
    },
    // 进入经销商店铺
    home (title) {
      window.sessionStorage.setItem('distributorId', title)
      const { href } = this.$router.resolve({
        path: '/distr/main',
        query: { id: title }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取经销商数据
    this.getDistributorList()
  }
}
</script>

<style lang="less" scoped>
// 右侧主体
.el-main {
  h3 {
    color: rgb(43, 121, 255);
  }
  // 下部分
  .bottom {
    margin-top: 20px;
    li {
      display: flex;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 15px 0;
      border-bottom: 1px dashed #ddd;
      img {
        margin-right: 20px;
      }
      .left {
        .else {
          margin-bottom: 7px;
          font-size: 12px;
          label {
            color: #999999;
          }
          span {
            color: #333333;
          }
          i {
            font-style: normal;
            color: #0777DD;
          }
          em {
            font-style: normal;
            color: #EB3030;
          }
        }
        .title {
          display: flex;
          justify-content: flex-start;
          h4 {
            margin-bottom: 12px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 16px;
          }
          h4:hover {
            color: rgb(43, 121, 255);
          }
        }
      }
    }
    // 分页
    .el-pagination {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
