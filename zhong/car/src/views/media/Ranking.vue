<template>
  <div class="w">
    <!-- 顶部封面图 -->
    <div class="image">
      <img src="../../assets/media/paihang.png" alt="">
    </div>
    <!-- 排行榜标题 -->
    <div class="title">
      <span>排序</span>
      <ul>
        <li :class="currentIndex === index ? 'select' : ''" v-for="(item,index) in title" :key="item" @click="changeTitle(index,item)">{{item}}</li>
      </ul>
    </div>
    <!-- 排行榜详情 -->
    <Effect v-show="this.selectTitle === '影响力'"></Effect>
    <InforVideo :title="this.selectTitle" v-show="this.selectTitle !== '影响力'"></InforVideo>
  </div>
</template>

<script>
import Effect from '../../components/media/rank/Effect'
import InforVideo from '../../components/media/rank/InforVideo'
export default {
  components: {
    Effect,
    InforVideo
  },
  data () {
    return {
      // 标题
      title: ['文章', '视频', '影响力'],
      // 当前索引
      currentIndex: 0,
      // 选中的标题
      selectTitle: '文章'
    }
  },
  methods: {
    // 切换标题时
    changeTitle (index, item) {
      this.currentIndex = index
      this.selectTitle = item
    }
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
.w {
  width: 1200px;
  margin: 0 auto;
}

// 封面图
.image {
  height: 345px;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}

// 标题
.select {
  color: rgb(43, 121, 255)!important;
}

.title {
  overflow: hidden;
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  padding-left: 20px;
  margin: 20px 0;
  span {
    float: left;
    margin-right: 50px;
    color: #333;
    font-weight: 700;
  }
  ul {
    float: left;
    li {
      float: left;
      cursor: pointer;
      margin-right: 30px;
      color: #999;
    }
  }
}

// 详情
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
