<template>
  <div class="w">
    <ul>
      <li @click="video(item.id)" v-for="item in videoList" :key="item.id">
        <div><img :src="item.coverPic" alt=""></div>
        <h5>{{item.title}}</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoList: []
    }
  },
  created () {
    // 获取车系视频
    this.getCarVideo()
  },
  methods: {
    // 获取车系视频
    async getCarVideo () {
      const { data: res } = await this.$http.post('/video/getVideoBySeries', {
        series: window.sessionStorage.getItem('carDetails')
      })
      this.videoList = res
    },
    // 详情
    video (id) {
      const { href } = this.$router.resolve({
        path: '/video/details',
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
ul {
  overflow: hidden;
  li {
    float: left;
    width: 200px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    h5 {
      text-align: center;
    }
    div {
      width: 100%;
      height: 100px;
      background-color: red;
      img {
        width: 100%;
      }
    }
  }
}
</style>
