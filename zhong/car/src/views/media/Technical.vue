<template>
  <div class="all">
    <div class="left">
      <!-- 左侧列表 -->
      <Maincontent :title="title"></Maincontent>
    </div>
    <div class="right">
      <!-- 一周热门车型 -->
      <Weekhot></Weekhot>
      <!-- 重点号推荐 -->
      <Keynumber></Keynumber>
      <!-- 热门内容 -->
      <Hotcontent></Hotcontent>
      <!-- 热门标签 -->
      <Label></Label>
    </div>
  </div>
</template>

<script>
import Maincontent from '../../components/media/Maincontent'
import Weekhot from '../../components/media/Weekhot'
import Keynumber from '../../components/media/Keynumber'
import Hotcontent from '../../components/media/Hotcontent'
import Label from '../../components/media/Label'
export default {
  components: {
    Maincontent,
    Weekhot,
    Keynumber,
    Hotcontent,
    Label
  },
  data () {
    return {
      title: '技术解读'
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
.all {
  display: flex;
  justify-content: flex-start;
  .right {
    width: 350px;
  }
}
</style>
