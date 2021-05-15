<template>
  <div>
    <!-- 头部 -->
    <Header></Header>
    <!-- 标题 -->
    <div class="title w">
      <h2>发帖站</h2>
    </div>
    <!-- 帖子信息 -->
    <el-card class="box-card w">
      <el-tabs v-model="activeName">
        <el-tab-pane label="地区帖" name="first">
          <el-select v-model="province" placeholder="请选择省份">
            <el-option
              v-for="item in provinceAry"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <!-- 标题 -->
          <h4>帖子标题</h4>
          <el-input v-model="input_first" placeholder="请帖子标题"></el-input>
          <!-- 编辑器 -->
          <Wang @func="getMsg1" style="margin-top: 20px"></Wang>
          <el-button type="primary" @click="submitFirst">发布</el-button>
        </el-tab-pane>
        <el-tab-pane label="主题帖" name="second">
          <el-radio-group v-model="theme" v-for="item in themeAry" :key="item" size="small">
            <el-radio-button style="margin-bottom: 10px" :label="item"></el-radio-button>
          </el-radio-group>
          <!-- 标题 -->
          <h4>帖子标题</h4>
          <el-input v-model="input_second" placeholder="请帖子标题"></el-input>
          <!-- 编辑器 -->
          <Wang @func="getMsg2" style="margin-top: 20px"></Wang>
          <el-button type="primary" @click="submitSecond">发布</el-button>
        </el-tab-pane>
        <el-tab-pane label="车型帖" name="third">
          <el-select v-model="brand" placeholder="请选择品牌" filterable @change="changeBrand">
            <el-option
              v-for="item in brandAry"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="series" placeholder="请选择车系" :disabled="disabledSeries" @visible-change="visibleSeries($event)">
            <el-option
              v-for="item in seriesAry"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <!-- 标题 -->
          <h4>帖子标题</h4>
          <el-input v-model="input_third" placeholder="请帖子标题"></el-input>
          <!-- 编辑器 -->
          <Wang @func="getMsg3" style="margin-top: 20px"></Wang>
          <el-button type="primary" @click="submitThird">发布</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Header from '../../../components/Header.vue'
import Wang from '../../../components/editor/Wang'
import Cookie from 'js-cookie'
const user = Cookie.get('ID')
export default {
  components: {
    Header,
    Wang
  },
  computed: {
    disabledSeries () {
      if (this.brand !== '') {
        return false
      }
      return true
    }
  },
  data () {
    return {
      activeName: 'first',
      // v-model绑定值
      province: '',
      brand: '',
      series: '',
      theme: '',
      // 省份
      provinceAry: [],
      // 城市
      cityAry: [],
      // 品牌
      brandAry: [],
      // 车系
      seriesAry: [],
      // 主题
      themeAry: [],
      // 标题
      input_first: '',
      input_second: '',
      input_third: '',
      // 编辑器
      content1: '',
      content2: '',
      content3: ''
    }
  },
  methods: {
    // 获取省份
    async getProvince () {
      const { data: res } = await this.$http.post('/Invit/getProvinceD')
      this.provinceAry = res
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/Invit/getBrandF')
      this.brandAry = res
    },
    // 获取车系
    async visibleSeries () {
      const { data: res } = await this.$http.post(`/Invit/getSeriesF`, {
        brand: this.brand
      })
      this.seriesAry = res
    },
    // 获取主题
    async getTheme () {
      const { data: res } = await this.$http.post('/Invit/getTheme')
      this.themeAry = res
    },
    // 改变品牌
    changeBrand () {
      this.series = ''
    },
    getMsg1 (data) {
      this.content1 = data
    },
    getMsg2 (data) {
      this.content2 = data
    },
    getMsg3 (data) {
      this.content3 = data
    },
    // 提交地区帖
    async submitFirst () {
      if (this.province === '') {
        return this.$message.error('请输入省份')
      }
      if (this.input_first.trim() === '' || this.content1.trim() === '') {
        return this.$message.error('请输入内容')
      }
      if (user === null) {
        return this.$message.error('请先登录哦')
      }
      const { data: res } = await this.$http.post(`/Invit/addInvitation`, {
        type: '地区贴',
        province: this.province,
        title: this.input_first,
        userId: +user,
        text: this.content1
      })
      // console.log(res)
      if (res !== true) {
        return this.$message.error('发布失败')
      }
      this.$message.success('发布成功')
      this.$router.go(0)
    },
    // 提交主题贴
    async submitSecond () {
      if (this.theme === '') {
        return this.$message.error('请选择主题')
      }
      if (this.input_second.trim() === '' || this.content2.trim() === '') {
        return this.$message.error('请输入内容')
      }
      if (user === null) {
        return this.$message.error('请先登录哦')
      }
      const { data: res } = await this.$http.post(`/Invit/addInvitation`, {
        type: '主题帖',
        theme: this.theme,
        title: this.input_second,
        userId: +user,
        text: this.content2
      })
      // console.log(res)
      if (res !== true) {
        return this.$message.error('发布失败')
      }
      this.$message.success('发布成功')
      this.$router.go(0)
    },
    // 车型贴
    async submitThird () {
      if (this.brand === '' || this.series === '') {
        return this.$message.error('请选择品牌车系')
      }
      if (this.input_third.trim() === '' || this.content3.trim() === '') {
        return this.$message.error('请输入内容')
      }
      if (user === null) {
        return this.$message.error('请先登录')
      }
      const { data: res } = await this.$http.post(`/Invit/addInvitation`, {
        type: '车型帖',
        brand: this.brand,
        series: this.series,
        title: this.input_third,
        userId: +user,
        text: this.content3
      })
      // console.log(res)
      if (res !== true) {
        return this.$message.error('发布失败')
      }
      this.$message.success('发布成功')
      this.$router.go(0)
    }
  },
  created () {
    // 获取省份
    this.getProvince()
    // 获取品牌
    this.getBrand()
    // 获取主题
    this.getTheme()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.title {
  height: 60px;
  line-height: 60px;
}
.el-card {
  .el-select {
    margin-right: 20px;
  }
  .el-radio-button {
    margin-right: 20px;
  }
  .el-button {
    margin-top: 20px;
    width: 400px;
    margin-left: 300px;
  }
  h4 {
    margin: 15px 0;
  }
}
// 编辑器
.edit_container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20px;
}
/* 头部 */
.ql-toolbar {
  width: 100%;
}
/* 输入区域 */
.ql-container {
  width: 100%;
  height: 300px;
}
</style>
