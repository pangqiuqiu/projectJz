<template>
  <el-card class="hot_label" style="box-shadow: 0 0 0 0">
    <div slot="header" class="clearfix">
      <h3>热门标签</h3>
    </div>
    <ul>
      <li v-for="item in list" :key="item.label">
        <span @click="clickTitle(item.link)">{{item.label}}</span>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { label: '大咖评车', link: '/media/bigguy' },
        { label: '用车宝典', link: '/media/manual' },
        { label: '技术解读', link: '/media/technical' },
        { label: '车展', link: '/media/autoshow' },
        { label: '玩车行家', link: '/media/expert' },
        { label: '行业分析', link: '/media/analysis' },
        { label: '自驾旅行', link: '/media/travel' },
        { label: '精选', link: '/media/selected' },
        { label: '新能源车', link: '/media/energy' },
        { label: '热点聚焦', link: '/media/focusing' },
        { label: '汽车文化', link: '/media/culture' }
      ]
    }
  },
  methods: {
    clickTitle (link) {
      const { href } = this.$router.resolve(link)
      window.open(href, '_blank')
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
.hot_label {
  margin-top: 20px;
  padding-bottom: 13px;
}

li {
  float: left;
  margin-right: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    padding: 7px;
    border: 1px solid #ccc;
  }
  span:hover {
    border-color: rgb(43, 121, 255);
    background-color: rgb(43, 121, 255);
    color: #fff;
  }
}
</style>
