<template>
  <div class="w">
    <el-steps :active="active" finish-status="success">
      <el-step title="选择类型"></el-step>
      <el-step title="填写资料"></el-step>
      <el-step title="等待审核"></el-step>
    </el-steps>
    <!-- 选择类型 -->
    <div class="type" v-show="active === 0">
      <div @click="clickType('个人')">
        <img src="../../assets/media/geren.png" alt="">
        <h2>个人/团队</h2>
        <p>适合垂直领域专家，意见领袖，评论家等个人/团队创作者申请，注入后不可更改运营者信息</p>
      </div>
      <div @click="clickType('企业')">
        <img src="../../assets/media/qiye.png" alt="">
        <h2>机构/企业</h2>
        <p>适合企业，公司及其分支机构，旗下品牌等申请，适合以公司形式注册，可以提供营业执照的自媒体机构申请</p>
      </div>
    </div>
    <!-- 公司/个人入驻申请 -->
    <div v-show="active === 1" class="apply">
      <el-form :rules="rules" :model="formInlink" label-width="130px" class="demo-ruleForm" label-position="left" ref="formInlink">
        <h2>基础信息</h2>
        <el-form-item label="重点号名称" prop="name">
          <el-input v-model="formInlink.name" placeholder="2-10个字，请使用汉字、字母、数字、下划线，字符中间不能有空格"></el-input>
        </el-form-item>
        <el-form-item label="重点号简介" prop="intro">
          <el-input type="textarea" v-model="formInlink.intro" placeholder="简介将显示在媒体主页，请勿发布个人手机号码、邮箱、广告营销信息，请勿超过60个字"></el-input>
        </el-form-item>
        <el-form-item label="重点号头像" class="image">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            name="image_data"
            :on-success="handleAvatarSuccessUser"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUserUrl" :src="imageUserUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div>
            建议图片比例为1:1，宽度不小于1080像素。能代表个人、机构或品牌形象，请勿使用低俗图片、二维码、其他机构企业等涉嫌误导用户的头像,大小不超过2M
          </div>
        </el-form-item>
        <div v-if="this.formInlink.type === '企业'">
          <h2>主体信息</h2>
          <el-form-item label="机构名称" prop="organizationName">
            <el-input v-model="formInlink.organizationName" placeholder="请输入机构名称, 一旦提交，机构名称不可修改"></el-input>
          </el-form-item>
          <el-form-item label="机构代码" prop="organizationCode">
            <el-input v-model="formInlink.organizationCode" placeholder="同一个主体只允许注册十个帐号"></el-input>
          </el-form-item>
          <el-form-item label="机构代码证" class="image">
            <el-upload
              class="avatar-uploader"
              :action="action"
              name="image_data"
              :show-file-list="false"
              :on-success="handleAvatarSuccessCompany"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageCompanyUrl" :src="imageCompanyUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div>
              请上传组织机构代码证扫描件，要求内容清晰可见,大小不超过2M
            </div>
          </el-form-item>
        </div>
        <h2>运营者信息</h2>
        <el-form-item label="运营者姓名" prop="yname">
          <el-input v-model="formInlink.yname" placeholder="请填写有效证件上的姓名，信息审核成功后身份证姓名不可修改"></el-input>
        </el-form-item>
        <el-form-item label="居民身份证号" prop="number">
          <el-input v-model="formInlink.number" placeholder="请确保证件号和运营者姓名对应，同一个证件允许申请3个车家号"></el-input>
        </el-form-item>
        <el-form-item label="手持证件照" class="hold">
          <div class="item">
            <el-upload
              class="avatar"
              :action="action"
              name="image_data"
              :show-file-list="false"
              :on-success="handleAvatarSuccessIDz"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageIDzUrl" :src="imageIDzUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-icon"></i>
            </el-upload>
            <span>上传正面</span>
          </div>
          <div class="item">
            <el-upload
              class="avatar"
              :action="action"
              name="image_data"
              :show-file-list="false"
              :on-success="handleAvatarSuccessIDf"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageIDfUrl" :src="imageIDfUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-icon"></i>
            </el-upload>
            <span>上传反面</span>
          </div>
        </el-form-item>
        <el-form-item label="所在城市" class="area" required>
          <el-form-item prop="province">
            <el-select @change="changeProvince" v-model="formInlink.province" placeholder="请选择省份" style="margin-right: 20px">
              <el-option v-for="item in provinceList" :key="item.provinceid" :label="item.province" :value="item.provinceid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city">
            <el-select @visible-change="getCity($event)" v-model="formInlink.city" placeholder="请选择城市">
              <el-option v-for="item in cityList" :key="item.cityid" :label="item.city" :value="item.cityid"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系人电话" prop="phone">
          <el-input v-model="formInlink.phone" placeholder="请填写本人常用手机，以作为日常联络使用"></el-input>
        </el-form-item>
        <el-form-item label="手机验证码" prop="code">
          <el-input v-model.number="formInlink.code" style="width: 200px; margin-right: 20px"></el-input>
          <el-button @click="getCode">{{!codetime?'发送验证码':codetime + 's后重新获取'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>
          我同意并遵守<el-button type="text">《重点汽车网重点号平台服务协议》</el-button>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="clickPreviousStep">上一步</el-button>
        <el-button type="success" :disabled="disabled" @click="submit('formInlink')">提交审核</el-button>
      </div>
    </div>
    <!-- 等待审核 -->
    <div v-show="active === 2">
      <h2 style="text-align: center">您的申请已提交，请耐心等待工作人员审核</h2>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 步骤条
      active: 0,
      // 图片上传接口
      action: 'http://39.100.156.125:8090/upload/upload2',
      // 用户照片
      imageUserUrl: '',
      imageCompanyUrl: '',
      imageIDzUrl: '',
      imageIDfUrl: '',
      // 表单
      formInlink: {
        type: '',
        name: '',
        intro: '',
        headPic: '',
        organizationName: '',
        organizationCode: '',
        organizationCodeZ: '',
        yname: '',
        number: '',
        photoz: '',
        photof: '',
        province: '',
        city: '',
        phone: '',
        code: '',
        userId: Cookie.get('ID')
      },
      // 城市
      provinceList: [],
      cityList: [],
      // 复选框
      checked: true,
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入重点号名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入重点号简介', trigger: 'blur' },
          { min: 1, max: 60, message: '长度在 不超过 60 个字符', trigger: 'blur' }
        ],
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 不超过 50 个字符', trigger: 'blur' }
        ],
        organizationCode: [
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 不超过 50 个字符', trigger: 'blur' }
        ],
        yname: [
          { required: true, message: '请输入运营者姓名', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入运营者身份证号码', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入常用手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      },
      // 验证码倒计时
      codetime: 0
    }
  },
  computed: {
    // 判断图片是否已经上传
    disabled () {
      if (this.formInlink.type === '个人' && (this.imageUserUrl || this.imageIDzUrl || this.imageIDfUrl)) return false
      if (this.formInlink.type === '企业' && (this.imageUserUrl || this.imageCompanyUrl || this.imageIDzUrl || this.imageIDfUrl)) return false
      return true
    }
  },
  created () {
    // 省份
    this.getProvince()
  },
  methods: {
    // 选择类型
    clickType (index) {
      this.formInlink.type = index
      this.active = 1
    },
    // 图片上传
    handleAvatarSuccessUser (res, file) {
      this.imageUserUrl = URL.createObjectURL(file.raw)
      this.formInlink.headPic = res
    },
    handleAvatarSuccessCompany (res, file) {
      this.imageCompanyUrl = URL.createObjectURL(file.raw)
      this.formInlink.organizationCodeZ = res
    },
    handleAvatarSuccessIDz (res, file) {
      this.imageIDzUrl = URL.createObjectURL(file.raw)
      this.formInlink.photoz = res
    },
    handleAvatarSuccessIDf (res, file) {
      this.imageIDfUrl = URL.createObjectURL(file.raw)
      this.formInlink.photof = res
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/showProvince')
      this.provinceList = res
    },
    changeProvince () {
      this.formInlink.city = ''
    },
    // 城市
    async getCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/showCity', {
          provinceid: this.formInlink.province
        })
        this.cityList = res
      }
    },
    // 获取短信验证码
    async getCode () {
      if (this.formInlink.phone === '' || this.formInlink.phone.length !== 11) {
        return alert('请输入手机号')
      }
      if (this.codetime > 0) {
        return
      }
      // 发送AJAX请求，成功时设置定时器 console.log('获取验证码')
      this.codetime = 60
      const timer = setInterval(() => {
        this.codetime--
        if (this.codetime < 1) {
          clearInterval(timer)
          this.codetime = 0
        }
      }, 1000)
      await this.$http.post('/user/sendCode', {
        phone: this.formInlink.phone
      })
    },
    // 回到上一步
    clickPreviousStep () {
      this.active = 0
      // 重置表单项
      this.$refs.formInlink.resetFields()
    },
    // 提交审核
    submit (formInlink) {
      // 判断用户是否登录
      if (!Cookie.get('ID') || !Cookie.get('token')) return this.$router.push('/login/login')
      // 判断是否勾选复选框
      if (this.checked === false) {
        return this.$message.error('请勾选相关协议')
      }
      this.$refs[formInlink].validate(async valid => {
        if (!valid) return this.$message.error('请完善表单内容')
        const res = await this.$http.post('/key/addKey', this.formInlink)
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('提交数据失败')
        }
        this.active = 2
      })
    }
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color: #f5f5f5')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #fff;
  box-sizing: border-box;
  min-height: 300px;
}

// 步骤条
.el-steps {
  margin-bottom: 30px;
}

// 选择类型
.type {
  display: flex;
  justify-content: space-around;
  text-align: center;
  div {
    width: 460px;
    height: 330px;
    border: 1px solid #EDEDED;
    img {
      margin: 20px 0;
    }
    h2 {
      color: #2B77FF;
    }
    p {
      padding: 20px;
      font-size: 14px;
      color: #999999;
    }
  }
  div:hover {
    border: 1px solid rgb(43, 121, 255);
    cursor: pointer;
  }
}

// 图片上传
.avatar-uploader {
  width: 220px;
  img {
    width: 180px;
    height: 180px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

// 身份证上传
.avatar {
  width: 340px;
  img {
    width: 300px;
    height: 150px;
  }
}
.avatar-icon {
  font-size: 28px;
  color: #8c939d;
  width: 298px;
  height: 148px;
  line-height: 148px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}

// 入驻申请
.apply {
  h2 {
    margin-bottom: 15px;
  }
  textarea {
    width: 100%;
    height: 80px;
    resize: none;
  }
  // 头像
  .image {
    overflow: hidden;
    .el-upload {
      float: left;
      .avatar-uploader {
        width: 220px;
      }
    }
    div {
      float: left;
      width: 310px;
    }
  }
  // 证件照
  .hold {
    overflow: hidden;
    .item {
      float: left;
    }
  }
  // 城市
  .area {
    overflow: hidden;
    .el-form-item {
      float: left;
    }
  }
  // 按钮
  .btn {
    display: flex;
    justify-content: center;
    .el-button {
      width: 200px;
    }
  }
}
</style>
