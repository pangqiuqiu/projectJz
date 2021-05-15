<template>
  <el-card class="week" style="box-shadow: 0 0 0 0">
    <div slot="header" class="clearfix">
      <h3>一周热门车型</h3>
    </div>
    <ul>
      <li v-for="(item,index) in weekHot" :key="index" @click="clickSeries(item.series)">{{item.series}}</li>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 周热门车型
      weekHot: []
    }
  },
  methods: {
    // 一周热门车型
    async getWeekHot () {
      const { data: res } = await this.$http.post('/key/showHotS')
      this.weekHot = res
    },
    // 跳转车系
    clickSeries (item) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', item)
      window.open(href, '_blank')
    }
  },
  created () {
    this.getWeekHot()
  }
}
</script>

<style lang="less" scoped>
// 一周热门车型
.week {
  margin-top: 20px;
  box-sizing: border-box;
  h3 {
    color: #333;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  li {
    cursor: pointer;
    margin-bottom: 10px;
    width: 50%;
  }
  li:hover {
    color: rgb(43, 121, 255);
  }
}
</style>
