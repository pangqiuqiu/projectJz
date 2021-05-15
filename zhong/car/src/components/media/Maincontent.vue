<template>
  <div>
    <ul class="left">
      <li v-for="item in mainList" :key="item.id">
        <el-card style="box-shadow: 0 0 0 0">
          <h3 @click="clickInforTitle(item.id, item.type)">{{item.object.title}}</h3>
          <div class="info" @click="clickInforTitle(item.id, item.type)">
            <img :src="item.object.coverPic" alt="">
            <p>{{item.object.intro}}</p>
          </div>
          <div style="clear: both"></div>
          <el-divider></el-divider>
          <div class="floot">
            <div class="type">
              <span>{{item.label}} </span>
              <span style="margin: 30px" >{{item.clickNum}}浏览</span>
              <span>{{item.postDate}}</span>
            </div>
            <div class="user">
              <div><img :src="item.key.headPic" alt="" @click="clickUserMain(item.key.id)"></div>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <el-button type="primary" style="width: 800px" @click="clickMore">加载更多</el-button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  props: ['title'],
  data () {
    return {
      mainList: [],
      num: 0
    }
  },
  created () {
    this.getMainList()
  },
  methods: {
    // 获取列表详情
    async getMainList () {
      const { data: res } = await this.$http.post('/key/KeyNList', {
        label: this.title,
        clickNum: this.num,
        userId: Cookie.get('ID') || ''
      })
      this.mainList = res
    },
    // 加载更多
    clickMore () {
      this.num++
      this.getMainList()
    },
    // 点击跳转详情
    clickInforTitle (id, type) {
      if (type === '重点号资讯') {
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
    // 点击跳转个人主页面
    clickUserMain (id) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}

.left {
  width: 800px;
  margin-right: 50px;
  margin-bottom: 20px;
  li {
    height: 280px;
    margin-top: 20px;
  }
  .el-card {
    height: 100%;
    color: #333;
    h3 {
      margin-bottom: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .info {
      cursor: pointer;
      p {
        color: #999999;
        font-size: 13px;
      }
      img {
        float: left;
        width: 240px;
        height: 120px;
        margin-bottom: 20px;
        margin-right: 20px;
      }
    }
    .floot {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .type {
        color: #999999;
        font-size: 13px;
      }
      .user {
        display: flex;
        justify-content: flex-start;
        img {
          vertical-align: middle;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}

.right {
  width: 350px;
}
</style>
