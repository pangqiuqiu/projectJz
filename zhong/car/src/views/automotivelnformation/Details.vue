<template>
  <div>
    <!-- 首页导航 -->
    <Header></Header>
    <!-- 广告 -->
    <div class="w">
      <img style="width: 1050px" :src="this.objAdv.pic ? this.objAdv.pic : ''" alt="" @click="foreign1">
    </div>
    <!-- 详细文章 -->
    <div class="w rgn">
      <div class="left">
        <h2>{{this.obj.title}}</h2>
        <div class="smallTitle">
          <span>{{this.obj.issueDate}}</span>
          <span style="margin: 0 30px;">作者：{{this.obj.username}}</span>
          <span>评论：<span style="color: red;">{{this.obj.comNum}}</span></span>
        </div>
        <el-divider></el-divider>
        <!-- word-break:break-all;英文换行 -->
        <div ref="wang" id="wang" style="word-wrap: break-word" v-html="this.obj.text">
          <div>{{this.obj.text}}</div>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="w commentuio">
      <div class="title">
        <h4>我来说两句</h4>
        <span @click="login">注册/登录</span>
      </div>
      <div style="padding-right: 5px">
        <textarea
          placeholder="请输入评论内容"
          v-model="textarea">
        </textarea>
      </div>
      <div class="btn-release">
        <el-button size="small" type="primary" @click="release">发表评论</el-button>
      </div>
      <el-divider></el-divider>
      <h5>精彩评论</h5>
      <ul>
        <li v-for="item in commentList" :key="item.id">
          <!-- 头像 -->
          <div class="left">
            <img :src="item.user.headPic" alt="">
          </div>
          <div class="right">
            <!-- 用户名 时间 -->
            <div class="username">{{item.user.nikename}}</div>
            <div class="time">{{item.issueDate}}</div>
            <!-- 评论内容 -->
            <div class="text">{{item.text}}</div>
          </div>
        </li>
      </ul>
      <div @click="more" class="btn-more">加载更多</div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Cookie from 'js-cookie'
export default {
  components: {
    Header
  },
  data () {
    return {
      // 广告
      advertiseList: [],
      objAdv: {},
      // 资讯
      obj: {},
      // 文本框
      textarea: '',
      // 点击数
      count: 0,
      // 评论列表
      commentList: []
    }
  },
  created () {
    // 获取资讯
    this.getInformation()
    // 获取评论
    this.getComment()
  },
  mounted () {
    this.getAdvertisement()
  },
  methods: {
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [{
          name: '资讯详情顶部通栏', area: sessionStorage.getItem('LocationProvince')
        }]
      })
      this.advertiseList = res
      this.objAdv = this.advertiseList[0] || {}
    },
    foreign1 () {
      if (this.objAdv.url.indexOf('https://') > -1) {
        window.open(`${this.objAdv.url}`)
      } else {
        window.open(`http://${this.objAdv.url}`)
      }
    },
    // 获取资讯
    async getInformation () {
      // 获取资讯id
      const id = this.$route.query.id
      // console.log(id)
      const { data: res } = await this.$http.post(`/Infor/Information`, {
        id: id
      })
      this.obj = res
    },
    // 获取评论
    async getComment () {
      // 获取资讯id
      const id = this.$route.query.id
      const { data: res } = await this.$http.post(`/Infor/InforComment`, {
        id: id,
        clilkNum: this.count
      })
      // console.log(res)
      this.commentList = res
    },
    // 加载更多
    more () {
      this.count++
      this.getComment()
    },
    // 登录注册
    login () {
      this.$router.push('/login/login')
    },
    // 发表评论
    async release () {
      // 先判断是否登录
      const user = Cookie.get('ID')
      const token = Cookie.get('token')
      if (!user || !token) {
        return this.$message.warning('请先登录')
      }
      // 如果评论为空则返回
      if (this.textarea.trim() === '') {
        return this.$message({
          message: '发布评论不可以为空',
          type: 'warning',
          duration: 1000
        })
      }
      const res = await this.$http.post(`/Infor/addComment`, {
        text: this.textarea,
        userId: user,
        informationId: this.$route.query.id
      })
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('评论失败')
      }
      this.$router.go(0)
      this.$message.success('评论成功')
    }
  }
}
</script>

<style lang="less">
.w {
  width: 1050px;
  margin: auto;
}
// 文章
.rgn {
  .left {
    border: 1px solid #ccc;
    padding: 10px;
    h2 {
      text-align: center;
    }
    .smallTitle {
      text-align: center;
      color: #bbb;
      margin: 20px 0;
    }
    .el-divider {
      margin-bottom: 20px!important;
    }
    img {
      margin: 20px 0;
      width: 100%;
    }
    h4 {
      margin: 40px 0 20px 0;
      color: orange;
    }
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    th {
      word-break: break-all;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
      border-bottom: 1px solid #ccc;
      text-align: center;
    }
    td {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
  }
}
// 评论
.commentuio {
  margin-top: 25px;
  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .time {
    display: flex;
    justify-content: space-between;
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    h4 {
      color: rgb(43, 121, 255);
    }
    span {
      font-size: 13px;
      cursor: pointer;
    }
  }
  textarea {
    width: 100%;
    height: 200px;
    resize: none;
  }
  .btn-release {
    text-align: right;
    margin-bottom: 10px;
  }
  // .el-button {
  //   margin: 10px 0;
  //   width: 100%;
  //   text-align: center;
  // }
  h5 {
    margin-top: 15px;
    display: inline-block;
    border-bottom: 2px solid rgb(43, 121, 255);
    padding-bottom: 3px;
    color: rgb(43, 121, 255);
  }
  li {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px dashed #ddd;
    padding: 10px 0;
    .left {
      width: 60px;
      height: 50px;
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .right {
      width: 980px;
      .username {
        color: #0777DD;
        font-size: 14px;
      }
      .time {
        margin: 5px 0 8px 0;
        font-size: 10px;
        color: #ccc;
      }
      .text {
        color: #333;
        font-size: 12px;
      }
    }
  }
  ul li:last-of-type {
    border-bottom: 0;
  }
  .btn-more {
    padding: 10px 0;
    background-color: #eee;
    color: #0777DD;
    text-align: center;
    cursor: pointer;
  }
}
</style>
