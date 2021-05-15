<template>
  <div id="app">
    <div class="w main">
      <!-- 左侧资讯 -->
      <div class="left">
        <!-- 轮播图 -->
        <div class="block">
          <el-carousel height="400px">
            <el-carousel-item v-if="this.obj.pic">
              <img :src="this.obj.pic ? this.obj.pic : ''" alt="" @click="foreign1">
            </el-carousel-item>
            <el-carousel-item v-for="item in swiperList" :key="item.id">
              <img :src="item.coverPic" alt="" @click="details(item.id)">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-for="item in informationList" :key="item.id">
          <div class="contain">
            <div>
              <img :src="item.coverPic" alt="" style="width: 200px; height: 100px">
            </div>
            <div>
              <!-- 标题 -->
              <h3 style="cursor: pointer;" @click="details(item.id)">{{item.title}}</h3>
              <div class="user">
                <!-- 用户 -->
                <div>
                  <span class="iconfont icon-yonghu"></span>
                  <span>{{item.username}}</span>
                </div>
                <!-- 时间 -->
                <div>
                  <span class="iconfont icon-shijian"></span>
                  <span>{{item.issueDate}}</span>
                </div>
                <!-- 信息 -->
                <div>
                  <span class="iconfont icon-xinxi"></span>
                  <span>{{item.comNum}}</span>
                </div>
              </div>
              <!-- 文章详情 -->
              <p>{{item.intro}}</p>
              <!-- 阅读全文 -->
              <div class="reading" @click="details(item.id)">阅读全文>></div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
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
      </div>
      <!-- 右侧 -->
      <TyreComponent class="right" :title="title"></TyreComponent>
    </div>
  </div>
</template>

<script>
import TyreComponent from './TyreComponent.vue'
export default {
  props: ['title', 'adv'],
  components: {
    TyreComponent
  },
  data () {
    return {
      // 广告
      advertiseList: [],
      obj: {},
      // 轮播图
      swiperList: [],
      // 资讯条数
      total: 0,
      // 页数
      pageNo: 1,
      // 每一页条数
      pageSize: 10,
      // 列表
      informationList: []
    }
  },
  mounted () {
    this.getAdvertisement()
  },
  methods: {
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [{
          name: this.adv,
          area: sessionStorage.getItem('LocationCity')
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
    // 获取轮播
    async getSwiper () {
      const { data: res } = await this.$http.post('/Infor/getLb', {
        home: this.title
      })
      this.swiperList = res
    },
    // 获取资讯列表
    async getInformationList () {
      let obj = {}
      if (this.$route.query.formAligin) obj = JSON.parse(this.$route.query.formAligin)
      const { data: res } = await this.$http.post(`/Infor/getInforListBySort`, {
        type: this.title,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        brand: obj.brand,
        series: obj.series
      })
      this.total = res.num
      this.informationList = res.l
    },
    // 改变页数
    async change (index) {
      const { data: res } = await this.$http.post(`/Infor/getInforListBySort`, {
        type: this.title,
        pageNo: index,
        pageSize: this.pageSize
      })
      this.informationList = res.l
      this.total = res.num
    },
    // 跳转资讯详情页
    details (id) {
      const { href } = this.$router.resolve({
        path: '/automotivelnformation/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取资讯列表
    this.getInformationList()
    // 获取轮播
    this.getSwiper()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.selected {
  background-color: #EB3030!important;
}
.main {
  display: flex;
  justify-content: flex-start;
  .left {
    width: 800px;
    .el-carousel {
      img {
        height: 100%;
        width: 100%;
      }
    }
    .contain {
      display: flex;
      justify-content: flex-start;
      padding: 20px 0;
      img {
        width: 300px!important;
        height: 150px!important;
        margin-right: 20px;
      }
      .user {
        div {
          float: left;
          margin: 15px 20px 15px 0;
          color: #999999;
          font-size: 15px;
          span {
            margin-right: 5px;
          }
        }
      }
      p {
        font-size: 14px;
        color: #999999;
        width: 430px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .reading {
        color: #0777DD;
        font-size: 14px;
        cursor: pointer;
      }
    }
    // 分页
    .el-pagination {
      margin: 30px 0;
      text-align: center;
    }
  }
}
</style>
