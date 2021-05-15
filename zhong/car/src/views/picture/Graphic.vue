<template>
  <div class="contain w">
    <!-- 侧边汽车列表 -->
    <CarSideList class="w side" @func="getCarName"></CarSideList>
    <!-- 右侧图片展示 -->
    <Photo class="main w" :message="message" :title="title"></Photo>
  </div>
</template>

<script>
import CarSideList from '../../components/picture/CarSideList.vue'
import Photo from '../../components/picture/Photo.vue'
export default {
  components: {
    CarSideList,
    Photo
  },
  data () {
    return {
      // 传递给子组件的
      message: '',
      title: '图解'
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
// 右侧
.main {
  width: 950px;
}
</style>
