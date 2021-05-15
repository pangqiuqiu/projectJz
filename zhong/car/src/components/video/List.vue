<template>
  <div class="app">
    <main>
      <ul>
        <li @click="video(item.id)" v-for="(item,index) in videoList" :key="index">
          <div><img :src="item.coverPic" alt=""></div>
          <h5>{{item.title}}</h5>
          <div class="subsidiary">
            <div>
              <span class="iconfont icon-shijian"></span>
              <span>{{item.sc}}</span>
            </div>
            <div>
              <span style="font-size: 18px" class="iconfont icon-bofang"></span>
              <span>{{item.clickNum}}</span>
            </div>
            <div>
              <span class="iconfont icon-xinxi"></span>
              <span>{{item.comNum}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        hide-on-single-page
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </main>
    <!-- 查询 -->
    <Query @fun="getMsg" class="news"></Query>
  </div>
</template>

<script>
import Query from '../../components/video/Query'
export default {
  props: ['title'],
  components: {
    Query
  },
  data () {
    return {
      // 视频列表
      videoList: [],
      pageSize: 16,
      pageNo: 1,
      total: 0,
      series: ''
    }
  },
  created () {
    // 获取视频列表
    this.getVideoList()
  },
  methods: {
    // 获取视频列表
    async getVideoList () {
      const { data: res } = await this.$http.post('/video/getVideoByType', {
        type: this.title,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        series: this.series
      })
      this.videoList = res.l
      this.total = res.num
    },
    // 切换分页
    changePage (index) {
      this.pageNo = index
      this.getVideoList()
    },
    // 点击跳转视频详情
    video (id) {
      const { href } = this.$router.resolve({
        path: '/video/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 组件传值
    getMsg (data) {
      this.series = data
      this.getVideoList()
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: space-between;
}
ul {
  overflow: hidden;
  width: 900px;
  margin-right: 70px;
  li {
    width: 200px;
    float: left;
    margin-right: 30px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  li:nth-child(4n) {
    margin-right: 0;
  }
}

li div {
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}

h5 {
  width: 200px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 30px;
}

.subsidiary {
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: #999999;
  font-size: 12px;
  margin-bottom: 15px;
  span {
    margin-left: 2px;
  }
  .iconfont {
    font-size: 20px;
  }
}

.el-pagination {
  text-align: center;
}

.news {
  width: 255px;
  padding: 10px;
  border: 1px solid #ccc;
  height: 230px;
}
</style>
