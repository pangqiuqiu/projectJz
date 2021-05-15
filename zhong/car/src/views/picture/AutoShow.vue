<template>
  <div class="contain w">
    <!-- 侧边汽车列表 -->
    <!-- <CarSideList class="w side" @func="getCarName"></CarSideList> -->
    <!-- 右侧图片展示 -->
    <div class="w right"></div>
  </div>
</template>

<script>
// import CarSideList from '../../components/picture/CarSideList.vue'
export default {
  components: {
    // CarSideList
  },
  data () {
    return {
      // 传递给子组件的
      message: ''
      // title: '车展'
    }
  },
  methods: {
    // 获取左侧汽车列表的名称
    getCarName (data) {
      this.message = data
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.contain {
  display: flex;
  justify-content: flex-start;
}
// 左侧
.side {
  width: 250px;
}
.right {
  width: 950px;
}
</style>
