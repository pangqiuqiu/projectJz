<template>
  <div>
    <!-- 头部 -->
    <Header></Header>
    <!-- 广告 -->
    <!-- <div class="w">
      <img :src="this.advObj.pic ? this.advObj.pic : ''" alt="" @click="foreign">
    </div> -->
    <!-- 视频主体 -->
    <div class="w index">
      <main>
        <h2>{{this.obj.title}}</h2>
        <video ref="index" type="video/mp4" controls autoplay loop data-setup="{'example_option':true}">
        </video>
      </main>
      <ul>
        <li @click="asideVideo(item.id)" v-for="item in list" :key="item.id">
          <img style="width: 100px; height: 50px" :src="item.coverPic" alt="">
          <div style="float: left">
            <div class="title">{{item.title}}</div>
            <div class="subsidiary">
              <div>
                <span class="iconfont icon-bofang"></span>
                <span>{{item.clickNum}}</span>
              </div>
              <div>
                <span class="iconfont icon-xinxi"></span>
                <span>{{item.comNum}}</span>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </li>
      </ul>
    </div>
    <!-- 视频评论 -->
    <footer class="w">
      <!-- 发布评论 -->
      <h3>车友评论</h3>
      <div class="myComment">
        <el-input v-model="comment" placeholder="请输入评论内容"></el-input>
        <el-button type="primary" @click="submit">提交评论</el-button>
      </div>
      <!-- 评论内容 -->
      <ul>
        <li v-for="(item,index) in commentList" :key="index">
          <!-- 头像 -->
          <img :src="item.user.headPic" alt="">
          <div class="right">
            <!-- 姓名 时间 -->
            <div>
              <span>{{item.user.nikename}}</span>
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
</template>

<script>
import Header from '../../components/Header'
import Cookie from 'js-cookie'
const token = Cookie.get('token')
const ID = Cookie.get('ID')
export default {
  components: {
    Header
  },
  data () {
    return {
      // 视频详细
      obj: {},
      // 侧边列表
      list: [],
      // 广告位置
      // advertiseList: [],
      // advObj: {},
      // 评论
      comment: '',
      commentList: [],
      // 分页
      pageSize: 10,
      pageNo: 1,
      total: 0 // 总数
    }
  },
  created () {
    // 获取视频
    this.getVideoDetails()
    // // 获取广告位置
    // this.getAdv()
  },
  methods: {
    // // 获取广告位置
    // async getAdv () {
    //   const { data: res } = await this.$http.post('/adv/getAdv', {
    //     name: [{ name: '视频详情顶部封栏', area: sessionStorage.getItem('LocationCity') }]
    //   })
    //   this.advertiseList = res
    //   if (res[0] === null) {
    //     return
    //   }
    //   this.advObj = this.advertiseList[0]
    // },
    // foreign () {
    //   window.open(`http://${this.advObj.url}`)
    // },
    // 获取视频
    async getVideoDetails () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post('/video/getVideo', {
        id: id
      })
      this.obj = res
      this.$refs.index.src = this.obj.src
      // 获取侧边视频列表
      this.getVideoAside()
      // 评论内容
      this.getComment()
    },
    // 获取侧边视频列表
    async getVideoAside () {
      const { data: res } = await this.$http.post('/video/getVideoByType', {
        type: this.obj.type,
        pageSize: 10,
        pageNo: 1
      })
      this.list = res.l
    },
    // 点击侧边视频
    asideVideo (id) {
      const { href } = this.$router.resolve({
        path: '/video/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 发布评论
    async submit () {
      if (!token || !ID) return this.$message.error('请先登录哦')
      if (this.comment === '') return this.$message.error('评论内容不可以为空')
      const res = await this.$http.post('/video/addVideoCom', {
        comment: this.comment,
        userId: ID,
        videoId: this.obj.id
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('评论提交失败')
      this.$message.success('评论提交成功')
      this.getComment()
      this.comment = ''
    },
    // 评论内容
    async getComment () {
      const { data: res } = await this.$http.post('/video/showVideoCom', {
        videoId: this.obj.id,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      this.commentList = res.l
      this.total = res.num
    },
    // 改变分页
    changePage (index) {
      this.pageNo = index
      this.getComment()
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 广告
img {
  width: 1200px;
  height: 100px;
}

.index {
  display: flex;
  justify-content: flex-start;
  h2 {
    margin-bottom: 10px;
    color: rgb(43, 121, 255);
  }
  // 侧边视频
  ul {
    box-sizing: border-box;
    margin-left: 10px;
    margin-top: 42px;
    border: 1px solid #ccc;
    width: 250px;
    height: 100%;
    padding: 10px;
    height: 670px;
  }

  li {
    cursor: pointer;
    margin-bottom: 15px;
    img {
      margin-right: 5px;
      float: left;
    }
    .title {
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subsidiary {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      color: #999;
    }
  }

  li:hover {
    color: rgb(43, 121, 255);
  }
}

main {
  width: 940px;
  height: 700px;
}

video {
  width: 100%;
  height: 670px;
  background-color: #000;
}

// 精彩评论
footer {
  h3 {
    color: rgb(43, 121, 255);
    margin: 20px 0;
  }
  .myComment {
    width: 940px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  ul {
    width: 940px;
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
      }
    }
  }
  .el-pagination {
    width: 940px;
    text-align: center;
    margin: 15px 0;
  }
}
</style>
