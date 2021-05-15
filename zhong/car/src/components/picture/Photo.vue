<template>
  <div class="w">
    <!-- 标题 -->
    <ul class="title">
      <li @click="changeIndex(item,index)" :class="currentIndex === index ? 'current' : 'list'" v-for="(item,index) in titleAry" :key="item">{{item}}</li>
    </ul>
    <ul class="photo">
      <!-- {{this.message}}
      {{this.title}} -->
      <li style="width: 300px; height: 240px; float: left; margin-right: 5px" v-for="item in photoList" :key="item">
        <el-image style="width: 100%;" :preview-src-list="photoList" :src="item" class="image" alt=""></el-image>
      </li>
    </ul>
  </div>
</template>

<script>
// style="width: 300px; height: 240px" fit="none"
export default {
  props: ['message', 'title'],
  data () {
    return {
      titleAry: ['外观', '内饰', '空间'],
      // 小标题当前索引
      currentIndex: 0,
      photoList: [],
      // 参数
      formIndex: {
        type: '实拍',
        series: '', // 车系
        title: '外观' // 分类
      }
    }
  },
  methods: {
    // 获取图片
    async getPhoto () {
      this.formIndex.series = window.sessionStorage.getItem('photo')
      const { data: res } = await this.$http.post('/Pic/carPic', this.formIndex)
      this.photoList = res
      // this.getHandle()
    },
    // 处理图片
    getHandle () {
      const image = document.getElementsByClassName('image')
      if (image.offsetWidth > image.offsetHeight) {
        image.className = ' imgH'
      } else {
        image.className = ' imgW'
      }
    },
    // 改变车系选择时，从新发送请求
    getMseeage () {
      window.sessionStorage.setItem('photo', this.message)
      this.getPhoto()
    },
    // 切换标题
    changeIndex (item, index) {
      this.currentIndex = index
      this.formIndex.title = item
      this.getPhoto()
    }
  },
  created () {
    this.getPhoto()
  },
  watch: {
    // message (val) {
    //   if (this.message === '') {
    //     return
    //   }
    //   this.getMseeage()
    // },
    // 监听路由
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}

</style>
