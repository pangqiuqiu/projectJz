<template>
  <div>
    <!-- 标题 -->
    <h3>新建集客活动</h3>
    <!-- 填写表单信息 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="参与活动的品牌" prop="brand">
        <el-select multiple v-model="ruleForm.brand" placeholder="请选择">
          <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与活动的logo">
        <el-upload
          class="avatar-uploader1"
          :action="action"
          name="image_data"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
        </el-upload>
        <div style="font-size: 12px; color: #999;">尺寸 100 * 100</div>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="avatar-uploader2"
          :action="action"
          name="image_data"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.coverPic" :src="ruleForm.coverPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
        </el-upload>
        <div style="font-size: 12px; color: #999;">比例2 : 1</div>
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker v-model="ruleForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动充值" prop="price">
        <el-input v-model="ruleForm.price"></el-input>元
      </el-form-item>
      <el-form-item label="返现金额或礼品名称" prop="gift">
        <el-input v-model="ruleForm.gift"></el-input>
      </el-form-item>
      <el-form-item label="重点汽车标识">
        <el-radio v-model="ruleForm.keyIs" label="显示">显示</el-radio>
        <el-radio v-model="ruleForm.keyIs" label="隐藏">隐藏</el-radio>
      </el-form-item>
      <el-form-item label="活动保障" prop="ensure">
        <el-checkbox-group v-model="ruleForm.ensure">
          <el-checkbox label="底价购车" name="checkList"></el-checkbox>
          <el-checkbox label="保证金可退" name="checkList"></el-checkbox>
          <el-checkbox label="正规4S店" name="checkList"></el-checkbox>
          <el-checkbox label="旧车置换" name="checkList"></el-checkbox>
          <el-checkbox label="可贷款" name="checkList"></el-checkbox>
          <el-checkbox label="就近保养" name="checkList"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动流程">
        <el-radio v-model="ruleForm.procedureIs" label="显示">显示</el-radio>
        <el-radio v-model="ruleForm.procedureIs" label="隐藏">隐藏</el-radio>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="优惠活动详情">
        <Wangeditor @func="getMsg"></Wangeditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 二维码 -->
    <div id="qrCode" ref="qrCodeDiv" style="display: none"></div>
  </div>
</template>

<script>
import Wangeditor from '../../../components/editor/Wangeditor'
import { dateConversion } from '../../../assets/js/timer.js'
import QRCode from 'qrcodejs2'
export default {
  components: {
    Wangeditor
  },
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
      // 图片上传接口
      action: 'https://www.zhongdianqiche.com:447/upload/upload5',
      // 品牌
      brandList: [],
      // 参数
      ruleForm: {
        name: '',
        brand: [],
        logo: '',
        coverPic: '',
        // 时间
        time: [],
        startDate: '',
        endDate: '',
        price: '',
        gift: '',
        keyIs: '显示',
        ensure: [],
        procedureIs: '显示',
        phone: '',
        details: ''
      },
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请选择活动参与品牌', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入充值金额', trigger: 'blur' }
        ],
        gift: [
          { required: true, message: '请输入返现金额或礼品名称', trigger: 'blur' }
        ],
        ensure: [
          { type: 'array', required: true, message: '请至少选择一个活动保障', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '手机号不可以为空', trigger: 'blur' },
          { validator: isMobile }
        ]
      },
      // 二维码
      qrcode: null
    }
  },
  methods: {
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/gather/gatherBrand')
      this.brandList = res
    },
    // 图片上传前的回调函数
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) this.$message.error('上传图片大小不能超过 2MB!')
      return isLt2M
    },
    // 图片上传成功的回调
    handleAvatarSuccess1 (res) {
      this.ruleForm.logo = res
    },
    handleAvatarSuccess2 (res) {
      this.ruleForm.coverPic = res
    },
    // 活动详情
    getMsg (data) {
      this.ruleForm.details = data
    },
    // 创建
    submitForm (formName) {
      setTimeout(() => {
        this.$refs[formName].validate(async valid => {
          if (!valid) return this.$message.error('请完善表单信息')
          this.ruleForm.startDate = dateConversion(this.ruleForm.time[0])
          this.ruleForm.endDate = dateConversion(this.ruleForm.time[1])
          const { data: res } = await this.$http.post('/gather/addGather', this.ruleForm)
          if (!res) return this.$message.error('创建失败')
          this.qrcode = new QRCode(this.$refs.qrCodeDiv, {
            text: `https://www.zhongdianqiche.com/mobile/#/gathering?id=${res}`, // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
          setTimeout(() => {
            const imgUrl = this.$refs.qrCodeDiv.lastChild.src
            const bytes = window.atob(imgUrl.split(',')[1])
            const array = []
            for(let i = 0; i < bytes.length; i++) {
              array.push(bytes.charCodeAt(i))
            }
            const blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
            const formData = new FormData()
            formData.append('image_data', blob, Date.now() + '.jpg')
            this.$http.post('https://www.zhongdianqiche.com:447/upload/upload5', formData).then(rew => {
              if (rew.status === 200) {
                this.$http.post('/gather/addTwoCode', {
                  twoCode: rew.data,
                  id: res
                }).then(req => {
                  if (req.status === 200) {
                    this.$message.success('创建成功')
                  }
                })
              }
            })
          }, 1000)
        })
      }, 500)
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
.demo-ruleForm {
  margin-top: 30px;
  .el-input, .el-select {
    width: 400px;
  }
  .el-button {
    width: 300px;
  }
  // logo上传
  .avatar-uploader1 {
    width: 100px;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  // 封面图
  .avatar-uploader2 {
    width: 400px;
    img {
      width: 400px;
      height: 200px;
    }
  }
  .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 398px;
    height: 198px;
    line-height: 198px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
}
</style>
