<template>
  <div class="app">
    <!-- 左侧列表 -->
    <ul class="left">
      <li v-for="(item,index) in list" :key="index">
        <div class="title">
          <h3>{{item.label}}</h3>
          <span @click="more(item.label)">查看更多>></span>
        </div>
        <el-divider></el-divider>
        <div class="item" :class="index === 2 || index === 5 ? 'current' : ''" @click="details(items.id)" v-for="(items,index) in item.children" :key="items.id">
          <img :src="items.coverPic" alt="">
          <h5>{{items.title}}</h5>
          <div class="subsidiary">
            <div>
              <span class="iconfont icon-shijian"></span>
              <span>{{items.sc}}</span>
            </div>
            <div>
              <span style="font-size: 18px" class="iconfont icon-bofang"></span>
              <span>{{items.clickNum}}</span>
            </div>
            <div>
              <span class="iconfont icon-xinxi"></span>
              <span>{{items.comNum}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 右侧导航 -->
    <div class="right" ref="right" style="position: relative; top: 0; right: 0">
      <!-- 查询 -->
      <Query @fun="getMsg"></Query>
      <ul>
        <h4>热播排行榜</h4>
        <li v-for="(item,i) in hotList" :key="i" @click="details(item.id)">
          <div class="image">
            <img :src="item.coverPic" alt="">
          </div>
          <div>
            <div class="title">{{item.title | typeface}}</div>
            <div class="small">
              <i style="font-size: 12px" class="iconfont icon-bofang"></i>
              <span>{{item.clickNum}}</span>
              <i style="font-size: 12px" class="iconfont icon-xinxi"></i>
              <span>{{item.comNum}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Query from '../../components/video/Query'
export default {
  components: {
    Query
  },
  data () {
    return {
      list: [],
      moreList: [
        { label: '原创视频', path: '/video/original' },
        { label: '技术视频', path: '/video/technology' },
        { label: '新车视频', path: '/video/newcar' },
        { label: '车展视频', path: '/video/autoshow' },
        { label: '试驾视频', path: '/video/testdrive' }
      ],
      // 热门视频
      hotList: [],
      // 滚动条高度
      scrollTop: 0,
      // 获取视频列表参数
      series: ''
    }
  },
  created () {
    // 获取首页视频列表
    this.getVideoHomeList()
    // 获取热门视频
    this.getHotVideo()
  },
  filters: {
    typeface (data) {
      if (data.length > 20) {
        return data.slice(0, 19) + '...'
      }
      return data
    }
  },
  methods: {
    // 获取首页视频列表
    async getVideoHomeList () {
      const { data: res } = await this.$http.post('/video/homeList', {
        series: this.series
      })
      this.list = res
    },
    // 跳转详情页
    details (id) {
      const { href } = this.$router.resolve({
        path: '/video/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 跳转列表页面
    more (index) {
      const ary = this.moreList.filter(item => {
        return item.label === index
      })
      const path = ary[0].path
      this.$router.push(path)
    },
    // 热门视频
    async getHotVideo () {
      const { data: res } = await this.$http.post('/video/hotRank')
      this.hotList = res
    },
    // 滚动条事件
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 品牌宽度
      let clientWidth = document.body.clientWidth
      let rightLevel = (clientWidth - 1200) / 2
      // 滚动条高度
      if (this.scrollTop > 400) {
        this.$refs.right.style.position = 'absolute'
        this.$refs.right.style.right = rightLevel + 'px'
        this.$refs.right.style.top = this.scrollTop - 180 + 'px'
      } else {
        this.$refs.right.style.position = 'relative'
        this.$refs.right.style.right = 0
        this.$refs.right.style.top = 0
      }
    },
    // 子组件传值
    getMsg (data) {
      this.series = data
      this.getVideoHomeList()
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // 离开该页面需要移除这个监听的事件，不然会报错
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: flex-start;
}
.left {
  width: 945px;
  margin-right: 15px;
  li {
    margin-bottom: 30px;
    overflow: hidden;
    img {
      width: 240px;
      height: 120px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      span {
        color: #999;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .item {
      float: left;
      margin-top: 20px;
      cursor: pointer;
      margin-right: 90px;
      h5 {
        width: 220px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 30px;
      }
      .subsidiary {
        display: flex;
        justify-content: space-between;
        color: #999999;
        font-size: 12px;
        padding: 0 30px;
        margin-bottom: 15px;
        span {
          margin-left: 2px;
        }
        .iconfont {
          font-size: 20px;
        }
      }
    }
  }
}

.current {
  margin-right: 0!important;
}
.right {
  box-sizing: border-box;
  width: 235px;
  padding: 10px;
  border: 1px solid #DCDFE6;
  height: 900px;
  li {
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
    cursor: pointer;
    .image {
      width: 100px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }
    .title {
      width: 110px;
      font-size: 10px;
      color: #333333;
    }
    span {
      font-size: 12px;
      margin-right: 30px;
    }
  }
}
</style>
