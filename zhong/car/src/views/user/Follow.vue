<template>
  <div>
    <h3>我的关注</h3>
    <el-divider></el-divider>
    <el-button style="margin-bottom: 20px" size="mini" @click="changeFollow">我的关注</el-button>
    <el-button size="mini" @click="changeFans">我的粉丝</el-button>
    <!-- 关注列表 -->
    <div v-show="this.flag">
      <h2 v-show="this.total_follow === 0">暂时还没有关注的人哦！</h2>
      <ul class="follow">
        <li v-for="item in followList" :key="item.id">
          <img :src="item.key.headPic" alt="" @click="userMain(item.key.id)">
          <div>{{item.key.name}}</div>
          <el-button size="mini" type="danger" @click="deleted(item.key.id)">取消关注</el-button>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        @current-change="changePageFollow"
        :current-page="this.form_follow.pageNo"
        :page-size="this.form_follow.pageSize"
        hide-on-single-page
        layout="prev, pager, next"
        :total="total_follow">
      </el-pagination>
    </div>
    <!-- 粉丝列表 -->
    <div v-show="!this.flag">
      <h2 v-show="this.total_fans === 0">暂时还没有人关注你哦！</h2>
      <ul class="fans follow">
        <li v-for="item in fansList" :key="item.id">
          <img :src="item.user.headPic" alt="">
          <div>{{item.user.name}}</div>
        </li>
      </ul>
      <el-pagination
        background
        @current-change="changePageFans"
        :current-page="this.form_fans.pageNo"
        :page-size="this.form_fans.pageSize"
        hide-on-single-page
        layout="prev, pager, next"
        :total="total_fans">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 关注列表
      followList: [],
      total_follow: 0,
      form_follow: {
        pageSize: 18,
        pageNo: 1,
        userId: Cookie.get('ID')
      },
      // 粉丝列表
      fansList: [],
      total_fans: 0,
      form_fans: {
        userId: Cookie.get('ID')
      },
      // 控制关注和粉丝列表
      flag: true
    }
  },
  methods: {
    // 关注列表
    async getFollow () {
      const { data: res } = await this.$http.post('/user/showgz', this.form_follow)
      this.followList = res.l
      this.total_follow = res.num
    },
    // 粉丝列表
    async getFans () {
      const { data: res } = await this.$http.post('/user/showFans', this.form_fans)
      this.fansList = res.l
      this.total_fans = res.num
    },
    // 取消关注
    async deleted (id) {
      const res = await this.$http.post('/key/gz', {
        userId: Cookie.get('ID'),
        keyId: id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.getFollow()
    },
    // 点击头像跳转个人主页
    userMain (id) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 切换展示的列表
    changeFollow () {
      this.flag = true
    },
    changeFans () {
      this.flag = false
    },
    // 改变页面
    changePageFollow (index) {
      this.form_follow.pageNo = index
      this.getFollow()
    },
    changePageFans (index) {
      this.form_fans.pageNo = index
      this.getFans()
    }
  },
  created () {
    // 获取关注列表
    this.getFollow()
    // 获取粉丝列表
    this.getFans()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}

.follow {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    width: 150px;
    text-align: center;
    div {
      margin: 5px 0;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
    }
    margin-bottom: 15px;
  }
}

// 分页
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
