<template>
  <div>
    <h3>视频上传</h3>
    <el-form :model="formInline">
      <el-form-item label="车系">
        <el-cascader :props="{ value: 'label', label: 'label'}" filterable v-model="value" :options="options" placeholder="请选择车系" size="mini"></el-cascader>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择类型" size="mini">
          <el-option label="原创视频" value="原创视频"></el-option>
          <el-option label="新车视频" value="新车视频"></el-option>
          <el-option label="试驾视频" value="试驾视频"></el-option>
          <el-option label="技术视频" value="技术视频"></el-option>
          <el-option label="车展视频" value="车展视频"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置">
        <el-select v-model="formInline.home" placeholder="请选择视频位置" size="mini">
          <el-option label="普通视频" value="普通视频"></el-option>
          <el-option label="首页焦点图" value="首页焦点图"></el-option>
          <el-option label="首页焦点标题" value="首页焦点标题"></el-option>
          <el-option label="首页专栏图1" value="首页专栏图1"></el-option>
          <el-option label="首页专栏图2-7" value="首页专栏图2-7"></el-option>
          <el-option label="视频首页列表图" value="视频首页列表图"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input style="width: 500px" v-model="formInline.title" placeholder="请输入标题" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
        <div style="font-size: 12px;color: #999;">尺寸为200x100; 图片格式为png/gif/jpeg, 大小不大于2M</div>
      </el-form-item>
      <el-form-item label="视频上传">
        <div class="pic_img_box">
          <el-upload
            class="avatar-uploader"
            :action="action"
            v-bind:on-progress="uploadVideoProcess"
            v-bind:on-success="handleVideoSuccess"
            v-bind:before-upload="beforeUploadVideo"
            v-bind:show-file-list="false"
          >
            <video
              v-if="videoForm.showVideoPath != '' && !videoFlag"
              v-bind:src="videoForm.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <i
              v-else-if="videoForm.showVideoPath == '' && !videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              v-bind:percentage="videoUploadPercent"
              style="margin-top:7px;"
            ></el-progress>
          </el-upload>
        </div>
        <p class="Upload_pictures">每次最多上传1个视频，建议小于500M，不超过2GB,推荐格式mp4 ( 收到视频上传成功提示后在提交 )</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 550px" size="mini" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单属性
      value: [],
      options: [],
      formInline: {
        series: '',
        title: '',
        home: '普通视频',
        type: '',
        coverPic: '',
        src: '',
        token: sessionStorage.getItem('token')
      },
      // 上传接口
      action: 'https://zhongdianqiche.com:447/upload/upload4',
      // action: 'http://39.100.156.125:8091/upload/addImage',
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: '',
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ''
      }
    }
  },
  created () {
    // 获取品牌车系
    this.getBrandSeries()
  },
  methods: {
    // 获取品牌车系
    async getBrandSeries () {
      const { data: res } = await this.$http.post('/car/jilian')
      this.options = res
    },
    //上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 / 4 < 500
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message.error('视频大小不能超过2GB')
        return false
      }
      this.isShowUploadVideo = false
    },
    //进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    //上传成功回调
    async handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (file.status !== 'success') {
        return this.$message.error('视频上传失败')
      }
      this.$message.success('视频上传成功')
      this.formInline.src = res
    },
    // 提交
    async onSubmit () {
      this.formInline.series = this.value[1]
      if (this.formInline.series === '' || this.formInline.type === '' || this.formInline.home === '' || this.formInline.title === '' || this.$refs.new_image.files[0] === undefined || this.formInline.src === '') {
        return this.$message.error('请完善内容')
      }
      // 封面图
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image.files[0])
      const res = await this.$http.post('/upload/upload5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status !== 200 || res.data === '图片上传失败！') {
        return this.$message.error('图片上传失败')
      }
      this.formInline.coverPic = res.data
      const rew = await this.$http.post('/video/addVideo', this.formInline)
      if (rew.status !== 200 || rew.data !== true) {
        return this.$message.error('提交失败')
      }
      this.$message.success('提交成功')
      this.$router.push('/video/home')
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
</style>
