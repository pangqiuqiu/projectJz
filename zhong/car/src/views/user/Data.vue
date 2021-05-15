<template>
  <div>
    <h4>个人信息</h4>
    <ul>
      <li>
        <label class="title">用户名:</label>
        <span>{{this.formJava.username}}</span>
      </li>
      <li>
        <label class="title">昵称:</label>
        <el-input size="mini" v-model="formJava.nikename" placeholder="请输入昵称"></el-input>
      </li>
      <li>
        <label class="title">性别:</label>
        <el-radio v-model="formJava.sex" label="男">男</el-radio>
        <el-radio v-model="formJava.sex" label="女">女</el-radio>
        <el-radio v-model="formJava.sex" label="未知">未知</el-radio>
      </li>
      <li>
        <label class="title">生日:</label>
        <div class="block" style="display: inline-block">
          <el-date-picker
            size="mini"
            v-model="formJava.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </li>
    </ul>
    <h4>联系方式</h4>
    <ul>
      <li>
        <label class="title">真实姓名:</label>
        <el-input size="mini" v-model="formJava.name" placeholder="请输入姓名"></el-input>
      </li>
      <li>
        <label class="title">手机号:</label>
        <el-input size="mini" v-model="formJava.phone" placeholder="请输入手机号"></el-input>
      </li>
      <li>
        <label class="title">所在地区:</label>
        <el-cascader size="mini" :props="{ value: 'id', label: 'label'}" v-model="value" :options="options"></el-cascader>
      </li>
      <li>
        <label class="title">街道地址:</label>
        <el-input size="mini" v-model="formJava.street" placeholder="请输入地址"></el-input>
      </li>
    </ul>
    <h4>头像设置</h4>
    <img :src="formJava.headPic" alt="" style="margin-right: 50px">
    <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
    <!-- 提交 -->
    <div>
      <el-button type="primary" @click="submit" style="margin-top: 10px">保存资料</el-button>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
const ID = Cookie.get('ID')
export default {
  data () {
    return {
      // 省份城市
      options: [],
      value: [],
      formJava: {
        id: '',
        username: '',
        nikename: '',
        birthday: '',
        provinceId: '',
        cityId: '',
        province: '',
        city: '',
        sex: '',
        name: '',
        phone: '',
        street: '',
        headPic: ''
      }
    }
  },
  methods: {
    // 获取用户信息
    async getUserinfo () {
      const { data: res } = await this.$http.post('/user/getUser', {
        id: ID
      })
      this.formJava = res
      this.value = [this.formJava.provinceId, this.formJava.cityId]
    },
    // 省份城市
    async getCity () {
      const { data: res } = await this.$http.post('/area/showProvinceCity')
      this.options = res
    },
    // 提交
    async submit () {
      if (this.$refs.new_image.files[0] === undefined) {
        this.submitUserInfo()
      } else {
        const formData = new FormData()
        formData.append('image_data', this.$refs.new_image.files[0])
        const res = await this.$http.post('/upload/upload2', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (res.status !== 200 || res.data === '图片上传失败！') {
          return this.$message.success('头像上传失败')
        }
        this.formJava.headPic = res.data
        this.submitUserInfo()
      }
    },
    async submitUserInfo () {
      this.formJava.id = ID
      this.formJava.cityId = this.value[1]
      this.formJava.provinceId = this.value[0]
      const res = await this.$http.post('/user/updateUser', this.formJava)
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('保存失败')
      }
      this.$message.success('保存成功')
      this.$router.go(0)
    }
  },
  created () {
    // 用户信息
    this.getUserinfo()
    // 省份
    this.getCity()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1100px;
  margin: 0 auto;
}
h4 {
  margin-bottom: 13px;
}
ul {
  li {
    margin-bottom: 15px;
    .title {
      display: inline-block;
      text-align: right;
      padding-right: 10px;
      width: 80px;
    }
  }
}
img {
  width: 120px;
  height: 120px;
}
.el-input, .el-cascader {
  width: 300px;
}
.el-select {
  margin-right: 20px;
}
.el-button {
  width: 400px;
}
</style>
