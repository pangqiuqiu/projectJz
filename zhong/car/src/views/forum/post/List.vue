<template>
  <div>
    <div class="w">
      <img :src="this.obj1.pic ? this.obj1.pic : ''" alt="" @click="foreign1">
    </div>
    <div class="w top">
      <h2>{{this.title}}</h2>
      <el-button type="primary" @click="btn">我要发帖</el-button>
    </div>
    <!-- 列表 -->
    <el-card class="box-card w" shadow="never" style="min-height: 350px">
      <ul>
        <el-row :gutter="20">
          <el-col :span="16"><h3>帖子标题</h3></el-col>
          <el-col :span="5"><h3>发帖时间</h3></el-col>
          <el-col :span="3"><h3>回复数</h3></el-col>
        </el-row>
        <li v-for="item in postList" :key="item.id">
          <el-row :gutter="20">
            <el-col :span="16"><div class="title" @click="jump(item.id)">{{item.title}}</div></el-col>
            <el-col :span="5"><div class="time">{{item.postDate}}</div></el-col>
            <el-col :span="3"><div class="reply">{{item.replyNum}}</div></el-col>
          </el-row>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        hide-on-single-page
        @current-change="changePage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="pageNo"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 广告
      advertiseList: [],
      obj1: {},
      // 标题
      title: '',
      // 帖子列表
      postList: [],
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 20
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
          name: '帖子列表顶部通栏', area: sessionStorage.getItem('LocationProvince')
        }]
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
    // 帖子列表
    async getPost () {
      const id = this.$route.query.id
      const name = this.$route.query.name
      const { data: res } = await this.$http.post('/Invit/getInvitL', {
        forumId: id,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      this.title = name
      this.postList = res.l
      this.total = res.num
    },
    // 改变分页
    changePage (index) {
      this.pageNo = index
      this.getPost()
    },
    // 详情页
    jump (id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 发帖
    btn () {
      const token = Cookie.get('token')
      const ID = Cookie.get('ID')
      if (!token || !ID) {
        return this.$message.error('请先登录哦')
      }
      this.$router.push('/forum/post/release')
    }
  },
  created () {
    // 获取帖子列表
    this.getPost()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.top {
  display: flex;
  justify-content: space-between;
  h2 {
    height: 60px;
    line-height: 60px;
  }
  .el-button {
    margin: 7px 0;
  }
}
li {
  .title {
    font-size: 20px;
  }
  .title:hover {
    cursor: pointer;
    color: rgb(43, 121, 255);
  }
}
.el-row {
  height: 50px;
}
// 分页
.el-pagination {
  text-align: center;
}
</style>
