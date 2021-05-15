<template>
  <el-container>
    <el-header>
      <!-- logo -->
      <div><img src="../../assets/logo.png" alt="" /></div>
      <!-- 注册 -->
      <h2>欢迎入驻</h2>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>统一社会信用代码</label>
          <el-input
            v-model="formLabelAlign.tyshxydm"
            placeholder="请输入统一社会信用代码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>营业执照副本</label>
          <input
            type="file"
            id="saveImage1"
            name="myphoto1"
            accept="image/png,image/gif,image/jpeg"
            ref="new_image1"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>经销商认证</label>
          <el-select v-model="formLabelAlign.dealerRz" placeholder="请选择">
            <el-option label="一级经销商" value="一级经销商"></el-option>
            <el-option label="二级经销商" value="二级经销商"></el-option>
            <el-option label="城市展厅" value="城市展厅"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>厂商品牌授权书</label>
          <input
            type="file"
            id="saveImage2"
            name="myphoto2"
            accept="image/png,image/gif,image/jpeg"
            ref="new_image2"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>厂家门店编码</label>
          <el-input
            v-model="formLabelAlign.cjmdbm"
            placeholder="请输入厂家门店编码"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>店门口照片</label>
          <input
            type="file"
            id="saveImage3"
            name="myphoto3"
            accept="image/png,image/gif,image/jpeg"
            ref="new_image3"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label>联系人电话</label>
          <el-input
            v-model="formLabelAlign.phone"
            placeholder="请输入联系人电话"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <label></label>
          <el-button
            type="primary"
            style="width: 400px"
            @click="submit"
            :disabled="isDisabledForm"
            >提交审核</el-button
          >
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 表单
      formLabelAlign: {
        yyzz: '',
        csppsqs: '',
        dmkzp: '',
        id: '',
        tyshxydm: '', // 统一社会信用代码
        dealerRz: '', // 经销商认证
        cjmdbm: '', // 门店编码
        phone: '', // 联系人
      },
    }
  },
  computed: {
    // 判断提交按钮
    isDisabledForm() {
      if (
        this.formLabelAlign.tyshxydm !== '' &&
        this.formLabelAlign.dealerRz !== '' &&
        this.formLabelAlign.cjmdbm !== '' &&
        this.formLabelAlign.phone !== ''
      ) {
        return false
      }
      return true
    },
  },
  methods: {
    // 提交表单
    submit() {
      if (
        this.$refs.new_image1.files[0] === undefined ||
        this.$refs.new_image2.files[0] === undefined ||
        this.$refs.new_image3.files[0] === undefined
      ) {
        return this.$message.warning('请上传照片')
      }
      this.uploadYyzz();
    },
    uploadYyzz() {
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image1.files[0])
      this.$http.post('/upload/upload2', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      }).then((req) => {
        this.formLabelAlign.yyzz = req.data;
        this.uploadCsppsqs();
      })
    },
    uploadCsppsqs() {
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image2.files[0])
      this.$http.post('/upload/upload2', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      }).then((res) => {
        this.formLabelAlign.csppsqs = res.data;
        this.uploadDmkzp();
      })
    },
    uploadDmkzp() {
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image3.files[0])
      this.$http.post('/upload/upload2', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
      }).then((rew) => {
        this.formLabelAlign.dmkzp = rew.data
        if (rew.status !== 200) {
          this.$$message.warning('提交失败')
          return
        }
        this.updateDealer();
      })
    },
    updateDealer() {
      this.formLabelAlign.id = this.$route.query.id
      this.$http.post('/dealer/updateDealer', this.formLabelAlign).then((rey) => {
        // 提交信息
        if (rey.data !== true) {
            this.$$message.warning('提交失败')
            return
        }
        this.$message.success('您已经提交成功，请等待审核')
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: flex-start;
  padding: 0 100px;
  background-color: #f6f6f6;
  height: 100px !important;
  line-height: 100px;
  img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin-right: 40px;
  }
}
.el-main {
  margin-top: 40px;
  .el-row {
    margin-bottom: 20px;
  }
  label {
    display: inline-block;
    width: 150px;
  }
  .el-input {
    width: 400px;
  }
  .el-select {
    width: 400px;
  }
  // 图片上传
}
</style>
