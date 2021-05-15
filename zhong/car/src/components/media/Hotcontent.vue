<template>
  <el-card class="hot" style="box-shadow: 0 0 0 0">
    <div slot="header" class="clearfix">
      <h3>热门内容</h3>
    </div>
    <ul>
      <li @click="handle(item.type, item.id)" v-for="(item,index) in hotContent" :key="index">
        <div><img :src="item.object.coverPic" alt=""></div>
        <div class="titled">{{item.object.title}}</div>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 热门内容
      hotContent: []
    }
  },
  methods: {
    // 热门内容
    async getHotContent () {
      const { data: res } = await this.$http.post('/key/tj')
      this.hotContent = res
    },
    // 跳转详情
    handle (type, id) {
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
    }
  },
  created () {
    this.getHotContent()
  }
}
</script>

<style lang="less" scoped>
// 热门内容
.hot {
  margin-top: 20px;
  h3 {
    color: #333;
  }
}
ul {
  overflow: hidden;
  li {
    float: left;
    width: 45%;
    margin-bottom: 10px;
    img {
      width: 140px;
      height: 70px;
    }
    .titled {
      font-size: 12px;
      color: #999999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    cursor: pointer;
  }
  li:nth-of-type(2n-1) {
    margin-right: 28px;
  }
}
</style>
