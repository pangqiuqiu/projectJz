<template>
  <div>
    <!-- 头部标题 -->
    <h3>发布视频</h3>
    <!-- 新增资讯表单 -->
    <el-form label-position="right" label-width="80px" :model="form" :rules="rules" ref="rulesForm">
      <el-form-item label="品牌">
        <el-select filterable v-model="form.brand" placeholder="请选择" @change="changeBrand">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in brandList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车系">
        <el-select filterable v-model="form.series" placeholder="请选择" @visible-change="getSeries($event)" :disabled="disabledSeries">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in seriesList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-select filterable v-model="form.province" placeholder="请选择" @change="changeProvince">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.province"
            :value="item.provinceid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select filterable v-model="form.area" placeholder="请选择" @visible-change="getCity($event)" :disabled="disabledCity">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.city"
            :value="item.cityid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题,不超过10个字符"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="intro">
        <el-input style="width: 400px" placeholder="不超过200字" type="textarea" :rows="2" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="标签" style="width: 600px">
        <el-checkbox-group
          v-model="form.label"
          :min="1"
          :max="3">
          <el-checkbox v-for="item in labelAry" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 上传封面图 -->
      <el-form-item label="封面图">
        <div style="color: #999; font-size: 12px">封面图尺寸：建议上传尺寸800x400; 图片格式为png/gif/jpeg, 大小不大于2M</div>
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
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
        <p class="Upload_pictures">每次最多上传1个视频，建议小于500M， 不超过2GB， 推荐格式mp4 ( 收到视频上传成功提示后在提交 )</p>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 400px;" type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 品牌车系
      brandList: [],
      seriesList: [],
      // 省份城市
      provinceList: [],
      cityList: [],
      // 标签数组
      labelAry: [
        { label: '大咖评车', link: '/media/bigguy' },
        { label: '用车宝典', link: '/media/manual' },
        { label: '技术解读', link: '/media/technical' },
        { label: '车展', link: '/media/autoshow' },
        { label: '玩车行家', link: '/media/expert' },
        { label: '行业分析', link: '/media/analysis' },
        { label: '自驾旅行', link: '/media/travel' },
        { label: '精选', link: '/media/selected' },
        { label: '新能源车', link: '/media/energy' },
        { label: '热点聚焦', link: '/media/focusing' },
        { label: '汽车文化', link: '/media/culture' }
      ],
      // 表单数据
      form: {
        keyId: Cookie.get('mediaID'),
        type: '重点号视频',
        coverPic: '', // 封面图
        title: '', // 标题
        intro: '', // 摘要
        brand: '', // 品牌
        series: '', // 车系
        province: '', // 省份
        area: '', // 城市
        src: '', // 视频
        sc: '', // 时长
        label: ['大咖评车']
      },
      // 表单验证
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 10, message: '标题不超过10个字符' }
        ],
        intro: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
          { min: 1, max: 200, message: '不超过200字', trigger: 'blur' }
        ]
      },
      // 视频上传
      action: 'https://zhongdianqiche.com:446/upload/upload4',
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      }
    }
  },
  computed: {
    disabledSeries () {
      if (this.form.brand !== '') {
        return false
      }
      return true
    },
    disabledCity () {
      if (this.form.province !== '') {
        return false
      }
      return true
    }
  },
  methods: {
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/getBrand')
      this.brandList = res
    },
    changeBrand () {
      this.form.series = ''
    },
    // 获取车系
    async getSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/getSeries', {
          brand: this.form.brand
        })
        this.seriesList = res
      }
    },
    // 省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/showProvince')
      this.provinceList = res
    },
    changeProvince () {
      this.form.area = ''
    },
    async getCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/showCity', {
          provinceid: this.form.province
        })
        this.cityList = res
      }
    },
    // 上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 / 4 < 500
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb',
          'video/mov'
        ].indexOf(file.type) === -1
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message.error('视频大小不能超过500MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    async handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (file.status !== 'success') {
        return this.$message.error('视频上传失败')
      }
      this.$message.success('视频上传成功')
      this.form.src = res.src
      this.form.sc = res.sc
    },
    // 表单提交
    submit () {
      if (this.form.src === '' || this.$refs.new_image.files[0] === undefined) return this.$message.error('请完善封面图和视频内容')
      this.$refs.rulesForm.validate(async valid => {
        if (!valid) return this.$message.error('请完善内容')
        // 上传封面图
        const formData = new FormData()
        formData.append('image_data', this.$refs.new_image.files[0])
        // 单个文件进行上传
        const rew = await this.$http.post('/upload/upload5', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.form.coverPic = rew.data
        // 提交数据
        const res = await this.$http.post('/key/addKeyN', this.form)
        if (res.status !== 200 || res.data !== true) return this.$message.error('提交失败')
        this.$message.success('提交成功')
      })
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
    // 获取省份
    this.getProvince()
  }
}
</script>

<style lang="less" scoped>
// 头部标题
h3 {
  margin-bottom: 20px;
}
// 新增表单
.el-form {
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-select {
    margin-bottom: 10px;
    width: 400px;
  }
  .el-input {
    margin-bottom: 10px;
    width: 400px;
  }
  .el-button {
    margin-top: 20px;
  }
}
// 编辑器
.w-e-text-container {
  height: 600px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
.w-e-text {
  height: 600px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
