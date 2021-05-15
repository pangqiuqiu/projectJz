<template>
  <div>
    <!-- 个人介绍 -->
    <header>
      <div class="image"><img :src="this.userObj.headPic" alt=""></div>
      <h3>{{this.userObj.name}}</h3>
      <p>{{this.userObj.intro}}</p>
      <div class="infor">
        <div>
          <span>{{this.userObj.followNum}}</span>
          <span>关注</span>
        </div>
        <div class="middle">
          <span>{{this.userObj.fansNum}}</span>
          <span>粉丝</span>
        </div>
        <div>
          <span>{{this.userObj.worksNum}}</span>
          <span>作品</span>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="clickFollow" size="mini" v-show="this.userObj.bgz === false">+ 关注</el-button>
        <el-button type="success" @click="clickFollow" size="mini" v-show="this.userObj.bgz === true">已关注</el-button>
      </div>
    </header>
    <!-- 个人作品 -->
    <div class="title">
      <span>分类</span>
      <ul>
        <li :class="currentIndex === index ? 'select' : ''" v-for="(item,index) in title" :key="item" @click="changeTitle(index,item)">{{item}}</li>
      </ul>
    </div>
    <div class="left">
      <Userlist :title="this.selectTitle" :keyId="this.keyId"></Userlist>
    </div>
    <div class="right">
      <!-- 热门标签 -->
      <Label></Label>
      <!-- 一周热门车型 -->
      <Weekhot></Weekhot>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
import Userlist from '../../components/media/Userlist'
import Label from '../../components/media/Label'
import Weekhot from '../../components/media/Weekhot'
import Cookie from 'js-cookie'
export default {
  components: {
    Userlist,
    Label,
    Weekhot
  },
  data () {
    return {
      // 用户个人信息
      userObj: {},
      // 标题
      title: ['不限', '文章'],
      // 当前索引
      currentIndex: 0,
      selectTitle: '不限',
      keyId: this.$route.query.id
    }
  },
  methods: {
    // 获取用户个人信息
    async getUserInfor () {
      const { data: res } = await this.$http.post('/key/getKey', {
        id: this.$route.query.id,
        userId: Cookie.get('ID') || ''
      })
      this.userObj = res
      this.bgz = res.bgz
    },
    // 切换标题时
    changeTitle (index, item) {
      this.currentIndex = index
      if (item === '文章') {
        this.selectTitle = '重点号资讯'
      } else if (item === '视频') {
        this.selectTitle = '重点号视频'
      } else {
        this.selectTitle = '不限'
      }
    },
    // 关注
    async clickFollow () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      const res = await this.$http.post('/key/gz', {
        userId: Cookie.get('ID'),
        keyId: this.keyId
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.getUserInfor()
    }
  },
  watch: {
  },
  created () {
    // 获取用户个人信息
    this.getUserInfor()
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color: #f5f5f5')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
// 个人介绍
header {
  height: 330px;
  background-color: #fff;
  .image {
    text-align: center;
    padding-top: 20px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }
  h3, p {
    text-align: center;
  }
  p {
    color: #999;
  }
  .infor {
    display: flex;
    justify-content: center;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      :last-child {
        color: #999;
        font-size: 14px;
      }
    }
    .middle {
      margin: 0 100px;
    }
  }
  .el-button {
    display: block;
    margin: 20px auto;
  }
}

// 标题
.select {
  color: rgb(43, 121, 255)!important;
}

.title {
  overflow: hidden;
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  padding-left: 20px;
  margin: 20px 0 0 0;
  span {
    float: left;
    margin-right: 50px;
    color: #333;
    font-weight: 700;
  }
  ul {
    float: left;
    li {
      float: left;
      cursor: pointer;
      margin-right: 30px;
      color: #999;
    }
  }
}

.left {
  float: left;
}

.right {
  float: left;
  width: 350px;
}
</style>
