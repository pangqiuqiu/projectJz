<template>
  <div>
    <!-- 广告位 -->
    <!-- <header>
      <img :src="this.advObj ? this.advObj.pic : ''" alt="" @click="foreign">
    </header> -->
    <!-- 主体区域 -->
    <div class="all">
      <!-- 左侧 -->
      <div class="left">
        <!-- 资讯内容 -->
        <div class="infor">
          <h2>{{this.inforObj.title}}</h2>
          <div class="vice">
            <span>{{this.inforObj.label}}</span>
            <span class="time">{{this.inforObj.postDate}}</span>
            <span>收藏 <img @click="collectInfor" :src="this.inforObj.collect ? require('../../../assets/media/yes.png'): require('../../../assets/media/no.png')" alt=""></span>
          </div>
          <video ref="mediaVideo" style="width: 100%; margin-top: 20px" controls autoplay loop data-setup="{'example_option':true}"></video>
          <div style="height: 10px"></div>
        </div>
        <!-- 视频评论 -->
        <footer>
          <!-- 发布评论 -->
          <!-- 发布评论 -->
          <div class="title">
            <h3>车友评论</h3>
            <div @click="login">注册 / 登录</div>
          </div>
          <div class="myComment">
            <el-input v-model="textarea" placeholder="请输入评论内容"></el-input>
            <el-button type="primary" @click="submit">提交评论</el-button>
          </div>
          <!-- 评论内容 -->
          <ul>
            <li v-for="(item,index) in commentList" :key="index">
              <!-- 头像 -->
              <img :src="item.headPic" alt="">
              <div class="right">
                <!-- 姓名 时间 -->
                <div>
                  <span>{{item.nikename}}</span>
                  <span>{{item.comDate}}</span>
                </div>
                <!-- 评论正文 -->
                <p>{{item.comment}}</p>
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
        </footer>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <!-- 个人信息 -->
        <div class="user">
          <div class="image"><img :src="this.user.headPic" alt=""></div>
          <h3>{{this.user.name}}</h3>
          <p>{{this.user.intro}}</p>
          <div class="author">
            <label>粉丝: </label>
            <span>{{this.user.fansNum}}</span>
            <label>作品: </label>
            <span>{{this.user.worksNum}}</span>
          </div>
          <div class="btn">
            <el-button type="primary" @click="clickFollow" size="mini" v-show="this.user.bgz === false">+ 关注</el-button>
            <el-button type="success" style="margin-left: 0;" @click="clickFollow" size="mini" v-show="this.user.bgz === true">已关注</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 相关作品 -->
        <div class="works">
          <h4>他的作品</h4>
          <ul>
            <li @click="clickWorks(item.id, item.type)" v-for="(item,index) in userWorks" :key="index">
              <img :src="item.object.coverPic" alt="">
              <div>{{item.object.title}}</div>
            </li>
          </ul>
        </div>
        <!-- 热门车型 -->
        <Weekhot></Weekhot>
        <!-- 热门内容 -->
        <Hotcontent></Hotcontent>
      </div>
    </div>
  </div>
</template>

<script>
import Weekhot from '../../../components/media/Weekhot'
import Hotcontent from '../../../components/media/Hotcontent'
import Cookie from 'js-cookie'
export default {
  components: {
    Weekhot,
    Hotcontent
  },
  data () {
    return {
      // 广告位
      // advObj: {},
      // 视频详情
      inforObj: {
        title: '',
        label: '',
        issueDate: '',
        collect: '',
        nId: '',
        keyId: ''
      },
      // 用户信息
      user: {},
      isfollow: '',
      // 个人作品推荐
      userWorks: [],
      // 评论列表
      commentList: [],
      textarea: '',
      // 分页
      pageSize: 10,
      pageNo: 1,
      total: 0 // 总数
    }
  },
  methods: {
    // // 广告位
    // async getAdv () {
    //   const { data: res } = await this.$http.post('/adv/getAdv', {
    //     name: [
    //       { name: '自媒体视频详情', area: sessionStorage.getItem('LocationCity') }
    //     ]
    //   })
    //   this.advObj = res[0]
    // },
    // foreign () {
    //   window.open(`http://${this.advObj.url}`)
    // },
    // 视频详情
    async getInfor () {
      const { data: res } = await this.$http.post('/key/getKeyN', {
        id: this.$route.query.id,
        userId: Cookie.get('ID') || ''
      })
      this.inforObj.issueDate = res.object.issueDate
      this.inforObj.label = res.label
      this.inforObj.title = res.object.title
      this.$refs.mediaVideo.src = res.object.src
      this.inforObj.collect = res.collect
      this.inforObj.nId = res.nId
      this.inforObj.keyId = res.keyId
      this.user = res.key
      // 获取个作品
      this.getUserWork()
    },
    // 点击收藏
    async collectInfor () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      const res = await this.$http.post('/key/col', {
        userId: Cookie.get('ID'),
        nId: this.$route.query.id,
        type: '重点号视频'
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.getInfor()
    },
    // 评论列表
    async getComment () {
      const { data: res } = await this.$http.post('/key/showCom', {
        pageSize: 10,
        pageNo: this.pageNo,
        id: this.$route.query.id
      })
      this.commentList = res.l
      this.total = res.num
    },
    // 发布评论
    async submit () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      if (this.textarea.length === 0) return this.$message.error('评论内容不可以为空')
      const res = await this.$http.post('/video/addVideoCom', {
        userId: Cookie.get('ID'),
        comment: this.textarea,
        videoId: this.inforObj.nId
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('评论发布失败')
      this.$message.success('评论发布成功')
      this.textarea = ''
      this.getComment()
    },
    // 分页
    changePage (index) {
      this.pageNo = index
      this.getComment()
    },
    // 关注当前重点号
    async clickFollow () {
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$message.error('请先登录哦')
      const res = await this.$http.post('/key/gz', {
        userId: Cookie.get('ID'),
        keyId: this.inforObj.keyId
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('操作失败')
      }
      this.getInfor()
    },
    // 获取个人作品
    async getUserWork () {
      const { data: res } = await this.$http.post('/key/KeyNList', {
        keyId: this.inforObj.keyId,
        pageSize: 8,
        clickNum: 0
      })
      this.userWorks = res
    },
    // 点击个人作品
    clickWorks (id, type) {
      if (type === '文章') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: id }
        })
        window.open(href, '_blank')
      } else {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: id }
        })
        window.open(href, '_blank')
      }
    },
    // 登录
    login () {
      this.$router.push('/login/login')
    }
  },
  created () {
    // 广告位
    // this.getAdv()
    // 资讯内容
    this.getInfor()
    // 评论
    this.getComment()
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
// 广告
// header {
//   height: 100px;
//   background-color: #fff;
//   cursor: pointer;
// }

// 文章详情
.all {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  .left {
    width: 830px;
    margin-right: 20px;
    .infor {
      background-color: #fff;
      padding: 0 20px;
      h2 {
        text-align: center;
        height: 60px;
        line-height: 60px;
      }
      video {
        height: 600px;
      }
      .vice {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #999;
        img {
          cursor: pointer;
          width: 13px;
          height: 13px;
        }
      }
    }
    footer {
      .title {
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
        h3 {
          color: rgb(43, 121, 255);
        }
        div {
          font-size: 13px;
          cursor: pointer;
        }
      }
      .myComment {
        width: 830px;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
      }
      ul {
        width: 830px;
        li {
          display: flex;
          justify-content: flex-start;
          border-bottom: 1px dashed #ddd;
          margin-top: 10px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 20px;
          }
          span {
            color: #999999;
            font-size: 12px;
            margin-right: 20px;
          }
          p {
            color: #333333;
            font-size: 12px;
            width: 760px;
          }
        }
      }
      .el-pagination {
        width: 830px;
        text-align: center;
        margin: 15px 0;
      }
    }
  }
  .right {
    width: 350px;
    // 个人
    .user {
      background-color: #fff;
      padding: 15px 0;
      .image {
        padding: 15px 0;
        text-align: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      h3 {
        text-align: center;
      }
      p {
        text-align: center;
        font-size: 13px;
        color: #999;
      }
      .author {
        text-align: center;
        font-size: 13px;
        color: #999;
        span {
          margin-right: 20px;
        }
      }
      .btn {
        text-align: center;
        margin-top: 20px;
      }
    }
    // 作品
    .works {
      padding: 1px 10px 0 10px;
      background-color: #fff;
      h4 {
        margin: 15px 0;
      }
      ul {
        overflow: hidden;
        li:nth-of-type(2n-1) {
          margin-right: 10px;
        }
      }
      li {
        float: left;
        width: 160px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #999;
        cursor: pointer;
        img {
          width: 100%;
          height: 80px;
        }
        div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
