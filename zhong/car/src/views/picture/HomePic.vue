<template>
  <div class="w con">
    <!-- 侧边汽车列表 -->
    <CarSideList2 class="w side" @func="getCarName"></CarSideList2>
    <!-- 右侧 -->
    <div class="righting">
      <!-- 轮播图 -->
      <el-carousel height="340px">
        <el-carousel-item v-for="(item,index) in swiperList" :key="index">
          <img @click="swiperSeries(item.series)" :src="item.homePic" alt="">
        </el-carousel-item>
      </el-carousel>
      <!-- 车系图片 -->
      <ul>
        <li v-for="item in seriesPhoto" :key="item.series">
          <div>
            <img style="width: 300px; height: 225px" :src="item.carPic" alt="" @click="swiperSeries(item.series)">
          </div>
          <h3 @click="swiperSeries(item.series)">{{item.series}}</h3>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        @current-change="changePage"
        hide-on-single-page
        background
        :current-page="this.pageNo"
        :page-size="this.pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CarSideList2 from '../../components/picture/CarSideList2.vue'
export default {
  components: {
    CarSideList2
  },
  data () {
    return {
      swiperList: [],
      seriesPhoto: [],
      pageSize: 15,
      pageNo: 1,
      total: 0
    }
  },
  methods: {
    // 获取轮播图
    async getSwiperList () {
      const { data: res } = await this.$http.post('/Pic/getHome')
      this.swiperList = res
    },
    // 车系图片
    async getSeriesPhoto () {
      const { data: res } = await this.$http.post('/Pic/carPicHome', {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      this.seriesPhoto = res.l
      this.total = res.num
    },
    // 切换分页
    changePage (index) {
      this.pageNo = index
      this.getSeriesPhoto()
    },
    // 点击轮播图跳转
    swiperSeries (series) {
      window.sessionStorage.setItem('photo', series)
      this.$router.push('/picture/realshooting')
    },
    // 获取左侧汽车列表的名称
    getCarName (data) {
      if (data.children !== null) {
        return
      }
      window.sessionStorage.setItem('photo', data.label)
      this.$router.push('/picture/home')
    }
  },
  created () {
    // 轮播图
    this.getSwiperList()
    // 车系图片
    this.getSeriesPhoto()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.con {
  display: flex;
  justify-content: flex-start;
}
.side {
  width: 250px;
}
.righting {
  width: 950px;
  height: 1600px;
  margin-bottom: 60px;
  .el-carousel {
    margin: 10px 0 10px 10px;
  }
  img {
    cursor: pointer;
  }
  ul {
    margin-left: 10px;
    overflow: hidden;
    li {
      float: left;
      margin-right: 20px;
      cursor: pointer;
      div {
        width: 300px;
        height: 225px;
      }
      h3 {
        font-weight: normal;
        text-align: center;
        font-size: 14px;
        padding: 3px 0;
      }
    }
    li:nth-child(3n) {
      margin-right: 0!important;
    }
  }
  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
