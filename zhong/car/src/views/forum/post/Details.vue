<template>
  <div>
    <!-- 头部 -->
    <Header></Header>
    <!-- 广告 -->
    <div class="w">
      <img :src="this.obj1.pic ? this.obj1.pic : ''" alt="" @click="foreign1">
    </div>
    <!-- 帖子详情 -->
    <div class="w main">
      <!-- 发布人信息 -->
      <div class="publisher">
        <div><img :src="this.user.headPic" alt=""></div>
        <div>
          <span>{{this.user.nikename}}</span>
        </div>
        <div>
          <label>性别：</label>
          <span>{{this.user.sex}}</span>
        </div>
        <div>
          <label>地区：</label>
          <span>{{this.user.area}}</span>
        </div>
      </div>
      <!-- 帖子内容 -->
      <div class="information">
        <!-- 标题 -->
        <div class="title">
          <h3> <span>{{this.postObj.type}}</span>{{this.postObj.title}}</h3>
        </div>
        <!-- 发布事件 -->
        <div class="time">发表于: {{this.postObj.postDate}}</div>
        <!-- 正文 -->
        <div v-html="this.postObj.text" class="text"></div>
      </div>
    </div>
    <!-- 用户评论信息 -->
    <ul class="w">
      <li v-for="item in contentAry" :key="item.id">
        <div class="left">
          <div><img :src="item.user.headPic" alt=""></div>
          <div>
            <label>性别：</label>
            <span>{{item.user.sex}}</span>
          </div>
          <div>
            <label>地区：</label>
            <span>{{item.user.area}}</span>
          </div>
        </div>
        <div class="right" v-html="item.reply"></div>
      </li>
    </ul>
    <!-- 加载更多 -->
    <div class="more w" @click="more">加载更多 》》</div>
    <!-- 发表评论 -->
    <Wang class="w" @func="getMsg"></Wang>
    <div class="w">
      <el-button style="width: 100%" @click="saveHtml" type="primary">发布评论</el-button>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/Header.vue'
import Wang from '../../../components/editor/Wang'
import Cookie from 'js-cookie'
export default {
  components: {
    Header,
    Wang
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  data () {
    return {
      // 广告
      advertiseList: [],
      obj1: {},
      // 帖子详情
      postObj: {},
      user: {},
      // 加载更多点击次数
      clickNum: 0,
      // 获取回复列表
      contentAry: [],
      // 发布评论
      content: ''
    }
  },
  mounted () {
    this.getAdvertisement()
  },
  methods: {
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [
          { name: '帖子详情顶部通栏', area: sessionStorage.getItem('LocationProvince') }
        ]
      })
      this.advertiseList = res
      this.obj1 = this.advertiseList[0] || {}
    },
    foreign1 () {
      if (this.obj1.url.indexOf('https://') > -1) {
        window.open(`${this.obj1.url}`)
      } else {
        window.open(`http://${this.obj1.url}`)
      }
    },
    // 获取帖子详情
    async getPostDetails () {
      const id = this.$route.query.id
      // console.log(id)
      const { data: res } = await this.$http.post(`/Invit/getInvit`, {
        id: id
      })
      this.postObj = res
      this.user = res.user
    },
    // 获取帖子的评论信息
    async getCommon () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post(`/Invit/getReply`, {
        clickNum: this.clickNum,
        id: id
      })
      // console.log(res)
      this.contentAry = res
    },
    // 加载更多
    more () {
      this.clickNum++
      this.getCommon()
    },
    // 组件传值 获取富文本内容
    getMsg (data) {
      this.content = data
    },
    // 用户发布评论
    async saveHtml (event) {
      const user = Cookie.get('ID') // 用户id
      const token = Cookie.get('token')
      const id = this.$route.query.id // 帖子id
      if (!user || !token) {
        return this.$message.error('请先完成登录')
      }
      if (this.content === '') {
        return this.$message.error('发布内容不可以为空')
      }
      const res = await this.$http.post(`/Invit/huifu`, {
        userId: user,
        invitId: id,
        reply: this.content
      })
      if (res.data === true && res.status === 200) {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
        this.content = ''
        this.$router.go(0)
      } else {
        this.$message({
          message: '发布失败',
          type: 'error'
        })
      }
    }
  },
  created () {
    // 获取帖子详情
    this.getPostDetails()
    // 获取帖子的评论信息
    this.getCommon()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 帖子详情
.main {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #ccc;
  // 发布人
  .publisher {
    width: 200px;
    background-color: #ddd;
    min-height: 500px;
    img {
      width: 100px;
      height: 120px;
      margin-top: 70px;
    }
    div {
      margin-bottom: 10px;
      text-align: center;
      span {
        color: #333;
      }
      label {
        color: #999;
        font-size: 13px;
      }
    }
  }
  // 发布信息
  .information {
    width: 1000px;
    .title {
      height: 50px;
      line-height: 50px;
      border-bottom: 3px solid #ddd;
      span {
        font-size: 13px;
        font-weight: 400;
        padding: 3px;
        border: 1px solid orange;
        color: orange;
        margin: 0 10px;
      }
    }
    .time {
      height: 50px;
      line-height: 50px;
      margin: 0 10px;
      border-bottom: 1px dashed #ccc;
      font-size: 12px;
      color: #999;
    }
    .text {
      margin-left: 10px;
      overflow-x: scroll;
      min-height: 396px;
    }
  }
}
// 已经发布的内容
li {
  display: flex;
  justify-content: flex-start;
  .left {
    width: 200px;
    background-color: #ddd;
    border-bottom: 1px solid #ccc;
    img {
      width: 100px;
      height: 120px;
      margin-top: 70px;
    }
    div {
      margin-bottom: 10px;
      text-align: center;
      span {
        color: #333;
      }
      label {
        color: #999;
        font-size: 13px;
      }
    }
  }
  .right {
    width: 1000px;
    border: 1px solid #ccc;
    min-height: 500px;
  }
}
// 加载更多
.more {
  text-align: center;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  background-color: #f4f4f4;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
// 编辑器
.edit_container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
/* 头部 */
.ql-toolbar {
  width: 100%;
}
/* 输入区域 */
.ql-container {
  width: 100%;
  height: 300px;
}
</style>
