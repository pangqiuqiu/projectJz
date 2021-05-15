<template>
  <div>
    <h3>新增优秀老师</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="老师姓名" prop="name">
        <el-input style="width: 400px" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input style="width: 400px" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="老师介绍" prop="intro">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="ruleForm.intro"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="老师照片">
        <div class="image">
          <div>
            <el-upload
              class="avatar-uploader1"
              :action="action"
              :show-file-list="false"
              name="image_data"
              :on-success="handleAvatarSuccessFormalPhoto"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.formalPhoto" :src="ruleForm.formalPhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
            </el-upload>
            <div>尺寸： 180 * 375</div>
          </div>
          <div>
            <el-upload
              class="avatar-uploader2"
              :action="action"
              :show-file-list="false"
              name="image_data"
              :on-success="handleAvatarSuccessHeadPic"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.headPic" :src="ruleForm.headPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
            </el-upload>
            <div>尺寸： 120 * 80</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width: 400px" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    // 验证手机号正则
    const mobile = /^[1]([3-9])[0-9]{9}$/
    const isMobile = (rule, value, callback) => {
      if (!mobile.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      // 标题
      title: '',
      // 图片上传接口
      action: 'https://www.zhongdianqiche.com:447/upload/upload5',
      // 参数
      ruleForm: {
        name: '', // 姓名
        intro: '', // 描述
        headPic: '', // 头像(小)
        formalPhoto: '', // 头像(大)
        phone: '' // 手机号
      },
      // 验证
      rules: {
        name: [
          { required: true, message: '请输入老师姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入老师联系方式', trigger: 'blur' },
          { validator: isMobile }
        ],
        intro: [
          { required: true, message: '请输入老师简介', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 图片上传
    handleAvatarSuccessFormalPhoto(res) {
      this.ruleForm.formalPhoto = res
    },
    handleAvatarSuccessHeadPic(res) {
      this.ruleForm.headPic = res
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) return this.$message.error('上传头像图片大小不能超过 2MB!')
    },
    // 提交
    submitForm (formName) {
      if (!this.ruleForm.headPic || !this.ruleForm.formalPhoto) return this.$message.error('请上传图片')
      this.$refs[formName].validate(async valid => {
        if (!valid) return this.$message.error('请完善相关内容')
        if (this.title === '新增优秀老师') {
          const { data: res } = await this.$http.post('/us/addTeacher', this.ruleForm)
          if (!res) return this.$message.error('提交失败')
          this.$message.success('提交成功')
          this.$router.go(-1)
        } else {
          const { data: res } = await this.$http.post('/us/updateTeachers', this.ruleForm)
          if (!res) return this.$message.error('提交失败')
          this.$message.success('提交成功')
          this.$router.go(-1)
        }
      })
    }
  },
  async created () {
    if (!this.$route.query.id) {
      this.title = '新增优秀老师'
    } else {
      this.title = '修改老师信息'
      const { data: res } = await this.$http.post('/us/getTeachers', { id: this.$route.query.id })
      this.ruleForm = res
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
.image {
  display: flex;
  justify-content: flex-start;
}
// 上传图片
.avatar-uploader1 {
  width: 220px;
  img {
    width: 180px;
    height: 375px;
  }
}
.avatar-uploader-icon1 {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 373px;
  line-height: 373px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

.avatar-uploader2 {
  width: 160px;
  img {
    width: 120px;
    height: 80px;
  }
}
.avatar-uploader-icon2 {
  font-size: 28px;
  color: #8c939d;
  width: 118px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
</style>
