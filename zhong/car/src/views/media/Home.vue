<template>
  <div>
    <!-- 左侧 -->
    <div class="left w">
      <!-- 轮播图 -->
      <el-carousel height="400px">
        <el-carousel-item v-for="item in swiperList" :key="item.id">
          <img style="width: 800px; height: 400px" :src="item.object.coverPic" alt="" @click="clickSwiper(item.type,item.id)">
        </el-carousel-item>
      </el-carousel>
      <!-- 推荐关注 -->
      <el-card class="recommend" style="box-shadow: 0 0 0 0">
        <div class="title">
          <h3>推荐关注</h3>
          <span @click="clickViewAll">查看全部 ></span>
        </div>
        <ul>
          <li v-for="item in recommendList" :key="item.id">
            <el-card shadow="hover" :body-style="{ padding: '0' }">
              <img :src="item.headPic" alt="" style="width: 70px; height: 70px; margin-top: 10px">
              <h4>{{item.name}}</h4>
              <div>粉丝数：{{item.fansNum}}</div>
              <el-checkbox style="margin-bottom: 5px" v-model="item.z" :checked="true" @change="changeCheck(item)"></el-checkbox>
            </el-card>
          </li>
        </ul>
        <!-- 按钮 -->
        <div style="text-align: center;">
          <el-button type="primary" @click="oneClickAttention" size="small">一键关注</el-button>
        </div>
      </el-card>
      <!-- 主体列表页面 -->
      <Maincontent :title="title"></Maincontent>
    </div>
    <!-- 右侧 -->
    <div class="right w">
      <!-- 重点号入驻 -->
      <div class="akey" v-if="!userId || !token">
        <div class="item" @click="clickHighlights">
          <i class="el-icon-document"></i>
          <span>重点号介绍</span>
        </div>
        <div class="item">|</div>
        <div class="item" @click="clickSettledIn">
          <i class="el-icon-s-shop"></i>
          <span>我要入驻</span>
        </div>
      </div>
      <!-- 重点号发文 -->
      <div class="sub" v-else>
        <el-button type="primary" @click="inforRelease">文章发布</el-button>
        <el-button type="primary" @click="videoRelease">视频发布</el-button>
      </div>
      <!-- 影响力排行榜 -->
      <img @click="imageRanking" class="image" src="../../assets/media/effect.jpg" alt="">
      <!-- 一周热门车型 -->
      <Weekhot></Weekhot>
      <!-- 重点号推荐 -->
      <Keynumber></Keynumber>
      <!-- 热门内容 -->
      <Hotcontent></Hotcontent>
      <!-- 热门标签 -->
      <Label></Label>
    </div>
  </div>
</template>

<script>
import Maincontent from '../../components/media/Maincontent'
import Weekhot from '../../components/media/Weekhot'
import Keynumber from '../../components/media/Keynumber'
import Hotcontent from '../../components/media/Hotcontent'
import Label from '../../components/media/Label'
import Cookie from 'js-cookie'
export default {
  components: {
    Maincontent,
    Weekhot,
    Keynumber,
    Hotcontent,
    Label
  },
  data () {
    return {
      title: '首页', // 组件传值
      // 轮播图
      swiperList: [],
      // 推荐关注
      recommendList: [],
      javaRecommend: [],
      // 判断用户是否为自媒体用户
      mediaID: null,
      userId: Cookie.get('ID'),
      token: Cookie.get('token')
    }
  },
  mounted () {
    this.mediaID = Cookie.get('mediaID')
    document.querySelector('body').setAttribute('style', 'background-color: #f5f5f5')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    // 获取轮播图
    async getSwiper () {
      const { data: res } = await this.$http.post('/key/getLb')
      this.swiperList = res
    },
    // 点击轮播图跳转
    clickSwiper (type, id) {
      if (type === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: id }
        })
        window.open(href, '_blank')
      } else if (type === '重点号视频') {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: id }
        })
        window.open(href, '_blank')
      }
    },
    // 获取推荐关注列表
    async getRecommend () {
      const { data: res } = await this.$http.post('/key/recFollowF', {
        userId: Cookie.get('ID') || ''
      })
      this.recommendList = res
      this.recommendList.forEach(item => {
        this.javaRecommend.push(item.id)
      })
    },
    // 查看全部
    clickViewAll () {
      this.$router.push('/media/all')
    },
    // 一键关注
    changeCheck (item) {
      if (item.z === true) {
        this.javaRecommend.push(item.id)
      } else {
        this.javaRecommend = this.javaRecommend.filter(val => {
          return val !== item.id
        })
      }
    },
    async oneClickAttention () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      const res = await this.$http.post('/key/gz', {
        ary: this.javaRecommend,
        userId: Cookie.get('ID')
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('关注失败')
      }
      this.$message.success('关注成功')
    },
    // 重点号介绍
    clickHighlights () {
    },
    // 我要入驻
    async clickSettledIn () {
      if (!Cookie.get('ID')) return this.$router.push('/login/login')
      // 提交用户ID查看是否已经入驻
      const { data: res } = await this.$http.post('/key/pdd', {
        userId: Cookie.get('ID')
      })
      if (res === '未通过' || res === '') {
        this.$router.push('/media/settledin')
      } else {
        this.$message.error('该账号不可再次申请')
      }
    },
    // 影响力排行榜
    imageRanking () {
      this.$router.push('/media/ranking')
    },
    // 文章发布
    inforRelease () {
      if (this.mediaID === '0' || this.mediaID === undefined) {
        this.$router.push('/media/settledin')
      } else {
        const { href } = this.$router.resolve('/media/edit/infor')
        window.open(href, '_blank')
      }
    },
    // 视频发布
    videoRelease () {
      if (this.mediaID === '0' || this.mediaID === undefined) {
        this.$router.push('/media/settledin')
      } else {
        const { href } = this.$router.resolve('/media/edit/video')
        window.open(href, '_blank')
      }
    }
  },
  created () {
    // 轮播图
    this.getSwiper()
    // 推荐关注
    this.getRecommend()
    // 主体列表
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}

// 左侧
.left {
  float: left;
  width: 800px;
  margin-right: 50px;
  // 轮播图
  .el-carousel {
    cursor: pointer;
  }
  // 推荐关注
  .recommend {
    margin-top: 24px;
    height: 288px;
    box-sizing: border-box;
    .title {
      display: flex;
      justify-content: space-between;
      height: 20px;
      line-height: 20px;
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        color: #333;
        cursor: pointer;
      }
      span {
        color: #666;
        font-size: 14px;
        cursor: pointer;
      }
    }
    ul {
      display: flex;
      justify-content: flex-start;
      li {
        width: 120px;
        text-align: center;
        margin-right: 10px;
        h4 {
          color: #333;
        }
        div {
          color: #999999;
          font-size: 13px;
          margin: 10px 0;
        }
      }
    }
    .el-button {
      width: 130px;
    }
  }
}

// 右侧
.right {
  float: left;
  width: 350px;
  // 发文
  .sub {
    display: flex;
    justify-content: space-between;
    .el-button {
      width: 45%;
    }
  }
  // 重点号
  .akey {
    height: 70px;
    background-color: #2B77FF;
    display: flex;
    justify-content: space-around;
    color: #fff;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        font-size: 13px;
      }
    }
  }
  // 影响力排行榜
  .image {
    margin-top: 18px;
    width: 350px;
    height: 276px;
    cursor: pointer;
  }
}
</style>
