<template>
  <div class="contain w">
    <!-- 侧边汽车列表 -->
    <CarSideList2 class="w side" @func="getCarName"></CarSideList2>
    <!-- 右侧图片展示 -->
    <div class="main">
      <!-- 车型 -->
      <h4>车型</h4>
      <ul class="type">
        <li @click="changeType(item,index)" :class="currentType === index ? 'selected' : ''" v-for="(item,index) in typeList" :key="item">{{item}}</li>
      </ul>
      <!-- 位置 -->
      <h4>位置</h4>
      <ul class="title">
        <li @click="changePlace(item,index)" :class="currentPlace === index ? 'selected' : ''" v-for="(item,index) in titleAry" :key="item">{{item}}</li>
      </ul>
      <!-- 颜色 -->
      <h4 v-show="isColor">颜色</h4>
      <ul class="color">
        <li @click="changeColor(item,index)" :class="currentColor === index ? 'selected' : ''" v-for="(item,index) in colorList" :key="item">{{item}}</li>
      </ul>
      <!-- 图片展示 -->
      <ul class="photo">
        <li style="width: 300px; height: 240px; float: left; margin-right: 5px" v-for="item in photoList" :key="item">
          <el-image style="width: 100%;" :preview-src-list="photoList" :src="item" class="image" alt=""></el-image>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CarSideList2 from '../../components/picture/CarSideList2.vue'
export default {
  components: {
    CarSideList2
  },
  data () {
    return {
      // 车型
      typeList: [],
      // 颜色
      colorList: [],
      // 位置
      titleAry: ['外观', '内饰', '空间'],
      // 当前索引
      currentType: '',
      currentColor: '',
      currentPlace: '',
      // 图片数组
      photoList: [],
      // 参数
      formIndex: {
        series: sessionStorage.getItem('photo'), // 车系
        color: '', // 颜色
        type: '', // 车型
        place: '外观' // 位置
      }
    }
  },
  computed: {
    // 判断是否有颜色
    isColor () {
      if (this.colorList.length === 0) {
        return false
      }
      return true
    }
  },
  methods: {
    // 车型
    async getType () {
      const { data: res } = await this.$http.post('/car/getCType2', {
        series: window.sessionStorage.getItem('photo')
      })
      this.typeList = res
      this.currentType = 0
      this.currentPlace = 0
      this.formIndex.type = res[0]
      this.formIndex.place = '外观'
      // 获取车型颜色
      this.getColor()
    },
    // 颜色
    async getColor () {
      const { data: res } = await this.$http.post('/Pic/getColor', this.formIndex)
      this.colorList = res
      this.formIndex.color = res[0]
      this.currentColor = 0
      // 获取图片
      this.getPhoto()
    },
    // 获取图片
    async getPhoto () {
      const { data: res } = await this.$http.post('/Pic/carPic', {
        ...this.formIndex, series: window.sessionStorage.getItem('photo')
      })
      this.photoList = res
    },
    // 改变车系选择时，从新发送请求
    getCarName (data) {
      if (data.children !== null) {
        return
      }
      window.sessionStorage.setItem('photo', data.label)
      // 改变车系
      this.currentType = ''
      this.currentColor = ''
      this.currentPlace = 0
      this.formIndex.type = '车型参考图'
      this.formIndex.color = ''
      this.formIndex.place = '外观'
      this.getType()
    },
    // 切换标题
    changeType (item, index) {
      this.currentType = index
      // 改变车型 重新获取颜色
      this.formIndex.type = item
      this.formIndex.place = '外观'
      this.currentPlace = 0
      this.getColor()
    },
    changePlace (item, index) {
      this.currentPlace = index
      this.formIndex.place = item
      this.getColor()
    },
    changeColor (item, index) {
      this.currentColor = index
      this.formIndex.color = item
      this.getPhoto()
    }
  },
  created () {
    // 车型
    this.getType()
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
// 被选中的颜色
.selected {
  color: rgb(43, 121, 255)!important;
}
// 左侧
.side {
  width: 250px;
}
// 右侧
.main {
  width: 950px;
  padding: 10px;
  h4 {
    margin-bottom: 10px;
  }
  // 车型
  .type {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 40%;
      margin-right: 10%;
      margin-bottom: 7px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }
  }
  // 颜色
  .color {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 180px;
      margin-bottom: 7px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }
  }
  // 位置
  .title {
    display: flex;
    justify-content: flex-start;
    li {
      width: 60px;
      margin-bottom: 7px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .photo {
    overflow: hidden;
    overflow-y: scroll;
    // height: 790px;
  }
  .imgW {
    width: 100%;
  }
  .imgH {
    height: 100%;
  }
}
</style>
