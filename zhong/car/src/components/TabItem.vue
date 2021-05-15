<template>
  <div>
    <h5>填写信息给商家</h5>
    <el-form :model="ruleForm" label-width="100px">
      <el-form-item label="意向车型">
        <el-select style="width: 615px" v-model="ruleForm.type" placeholder="请选择意向车型" @visible-change="changeType($event)">
          <el-option
            v-for="item in TypeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在城市" :inline="true">
        <el-select v-model="ruleForm.province" placeholder="选择省份" @visible-change="changeProvince($event)" @change="change">
          <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="ruleForm.city" placeholder="选择城市" :disabled="disabledCity" @visible-change="changeCity($event)">
          <el-option :label="item.city" :value="item.cityid" v-for="item in cityAry" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="您的姓名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{this.btn}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 手机号正则
let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
let id = window.sessionStorage.getItem('carDetails')
export default {
  props: ['btn'],
  data () {
    return {
      ruleForm: {
        // 意向车型
        type: '',
        province: '', // 省
        city: '', // 市
        county: '', // 县
        username: '', // 姓名
        mobile: '' // 手机号
      },
      TypeList: [],
      provinceAry: [],
      cityAry: []
    }
  },
  methods: {
    // 获取车型信息
    async changeType (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post(`/car/getCType`, {
          series: id
        })
        this.TypeList = res
      }
    },
    // 获取省份
    async changeProvince (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/showProvince')
        this.provinceAry = res
      }
    },
    change () {
      this.ruleForm.city = ''
    },
    // 获取城市
    async changeCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post(`/area/showCity`, {
          provinceid: this.ruleForm.province
        })
        this.cityAry = res
      }
    },
    // 提交表单
    async submit () {
      // 判断信息是否填写完毕
      if (this.ruleForm.type === '' || this.ruleForm.province === '' || this.ruleForm.city === '' || this.ruleForm.username === '' || this.ruleForm.mobile === '') {
        return this.$message.warning('请将信息填写完整')
      }
      // 判断手机号填写是否合法
      if (!phoneReg.test(this.ruleForm.mobile)) {
        return this.$message.warning('请填写正确的手机号')
      }
      const res = await this.$http.post(`/table/addTable`, {
        yixiangchexing: this.ruleForm.type,
        area: this.ruleForm.city,
        name: this.ruleForm.username,
        phone: this.ruleForm.mobile,
        type: this.btn
      })
      if (res.data === true && res.status === 200) {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '提交失败',
          type: 'error'
        })
      }
    }
  },
  computed: {
    // 判断城市下拉框
    disabledCity () {
      if (this.ruleForm.province !== '') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
h5 {
  color: #ddd;
  margin-bottom: 20px;
}
.el-select {
  width: 300px;
  margin-right: 15px;
}
.el-input {
  width: 615px;
}
.el-button {
  width: 615px;
}
</style>
