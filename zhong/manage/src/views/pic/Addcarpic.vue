<template>
  <div>
    <h3>新增汽车图片</h3>
    <ul>
      <li>
        <h4>车系</h4>
        <el-cascader filterable v-model="series" size="mini" :options="options" :props="{ value: 'label', label: 'label'}" @change="changeBrandSeries"></el-cascader>
      </li>
      <li>
        <h4>车型</h4>
        <el-select v-model="formInline.type" @visible-change="getType($event)" placeholder="请选择车型" size="mini" @change="changeType" :disabled="disabledType">
          <el-option v-for="item in typeList" :key="item.c" :label="item.c" :value="item.c"></el-option>
        </el-select>
      </li>
      <li>
        <h4>位置</h4>
        <el-select v-model="formInline.place" placeholder="请选择图片位置" size="mini" @change="changePlace">
          <el-option label="外观" value="外观"></el-option>
          <el-option label="内饰" value="内饰"></el-option>
          <el-option label="空间" value="空间"></el-option>
        </el-select>
      </li>
      <li>
        <h4>颜色</h4>
        <el-select v-model="formInline.color" @visible-change="getColor($event)" placeholder="请选择颜色" size="mini" :disabled="disabledColor">
          <el-option v-for="item in colorList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </li>
    </ul>
    <!-- 图片上传 -->
    <div style="margin-top: 50px; font-size: 14px; color: #555">(建议尺寸: 400 x 200)</div>
    <el-upload
      :on-success="handleSuccess"
      class="upload-demo"
      name="image_data"
      ref="upload"
      drag
      action="https://zhongdianqiche.com:447/upload/upload2"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <!-- 提交 -->
    <el-button style="width: 650px" @click="upLoad" type="primary">上传</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      series: [],
      // 表单
      formInline: {
        series: '',
        type: '',
        color: '',
        place: '',
        list: []
      },
      // 车系
      options: [],
      // 车型
      typeList: [],
      // 颜色
      colorList: [],
      // 图片集合
      imgList: []
    }
  },
  computed: {
    disabledType () {
      if (this.series.length === 0) {
        return true
      }
      return false
    },
    disabledColor () {
      if (this.formInline.series === '' || this.formInline.place === '') {
        return true
      }
      return false
    },
  },
  methods: {
    // 获取车系
    async getSeries () {
      const { data: res } = await this.$http.post('/car/jilian')
      this.options = res
    },
    // 获取车型
    async getType (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/getC', {
          series: this.series[1]
        })
        this.typeList = res
        this.formInline.series = this.series[1]
      }
    },
    // 获取颜色
    async getColor (callback) {
      if(callback === true) {
        const { data: res } = await this.$http.post('/pic/getColor', {
          series: this.formInline.series,
          type: this.formInline.type,
          place: this.formInline.place
        })
        this.colorList = res
      }
    },
    // 改变车系
    changeBrandSeries () {
      this.formInline.type = '',
      this.formInline.color = ''
    },
    // 改变车型
    changeType () {
      this.formInline.color = ''
    },
    // 改变位置
    changePlace () {
      this.formInline.color = ''
    },
    // 图片上传成功的回调函数
    handleSuccess (res) {
      this.formInline.list.push(res)
    },
    // 上传
    async upLoad () {
      if (this.formInline.series === '' || this.formInline.color === '' || this.formInline.type === '' || this.formInline.place === '' || this.formInline.list.length === 0) {
        return this.$message.error('请完善内容')
      }
      const res = await this.$http.post('/pic/addPic', this.formInline)
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('提交失败')
      }
      this.$message.success('上传成功')
      this.$refs.upload.clearFiles()
      this.formInline.list = []
    }
  },
  created () {
    // 获取车系
    this.getSeries()
  }
}
</script>

<style lang="less" scoped>
ul {
  li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    h4 {
      width: 100px;
    }
    .el-cascader, .el-input, .el-select {
      width: 300px;
    }
  }
}
</style>
