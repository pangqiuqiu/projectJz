<template>
  <ul>
    <li>
      <h4>标题</h4>
      <el-input placeholder="请输入标题" v-model="formInline.title" size="mini"></el-input>
    </li>
    <li>
      <h4>车系</h4>
      <el-cascader v-model="value" filterable size="mini" :options="options" :props="{ value: 'label', label: 'label'}"></el-cascader>
    </li>
    <li>
      <h4>位置</h4>
      <el-select v-model="formInline.type" placeholder="请选择位置" size="mini">
        <el-option label="图片1" value="图片1"></el-option>
        <el-option label="图片2-7" value="图片2-7"></el-option>
      </el-select>
    </li>
    <li>
      <h4>图片上传</h4>
      <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
      <div style="color: #999; font-size: 12px; line-height: 26px;margin-left: 20px">图片尺寸：建议上传 500 x 300, 图片格式为png/gif/jpeg, 大小不大于2M</div>
    </li>
    <el-button type="primary" size="mini" @click="submit">上传</el-button>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      formInline: {
        title: '',
        type: '',
        series: '',
        pic: ''
      },
      // 车系
      value: [],
      options: []
    }
  },
  created () {
    this.getSeries()
  },
  methods: {
    // 品牌车系
    async getSeries () {
      const { data: res } = await this.$http.post('/car/jilian')
      this.options = res
    },
    // 上传
    async submit () {
      if (this.formInline.title === '' || this.formInline.type === '' || this.value.length === 0 || this.$refs.new_image.files[0] === undefined) {
        return this.$message.error('请完善内容')
      }
      this.formInline.series = this.value[1]
      // 上传图片
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image.files[0])
      const rew = await this.$http.post('/upload/upload5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (rew.status !== 200 || rew.data === '图片上传失败！') {
        return this.$message.error('图片上传失败, 请重新上传')
      }
      this.formInline.pic = rew.data
      const res = await this.$http.post('/pic/addHotSeries', this.formInline)
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('提交失败')
      }
      this.$message.success('提交成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.el-input, .el-cascader, .el-select, .el-button {
  width: 300px;
}

.el-button {
  margin-top: 30px;
}

ul {
  li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    h4 {
      width: 100px;
    }
  }
}
</style>
