<template>
  <div>
    <!-- 标题 -->
    <h3>{{this.title}}</h3>
    <!-- 表单项 -->
    <el-form ref="form" :model="formAlign" label-width="80px">
      <el-form-item label="岗位">
        <el-input v-model="formAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-select filterable v-model="formAlign.city" placeholder="请选择">
          <el-option label="不限" value="不限"></el-option>
          <el-option v-for="item in cityAry" :key="item.cityid" :label="item.city" :value="item.city"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性质">
        <el-select v-model="formAlign.type" placeholder="请选择">
          <el-option label="全职" value="全职"></el-option>
          <el-option label="兼职" value="兼职"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年限">
        <el-input v-model="formAlign.years"></el-input>
      </el-form-item>
      <el-form-item label="岗位职责">
        <el-input v-for="(item,index) in formAlign.duty" :key="index" v-model="formAlign.duty[index]" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="add('duty')">增加一项</el-button>
      </el-form-item>
      <el-form-item label="任职要求">
        <el-input v-for="(item,index) in formAlign.ask" :key="index" v-model="formAlign.ask[index]" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="add('ask')">增加一项</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width: 600px" @click="submit">确认提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import citylist from '../../assets/js/city.js'
export default {
  data () {
    return {
      // 页面title
      title: '',
      // 页面ID
      id: '',
      // 提交后端数据
      formAlign: {
        city: '',
        name: '',
        type: '',
        years: '',
        duty: [],
        ask: []
      },
      // 省份城市
      cityAry: citylist
    }
  },
  methods: {
    // 判断路由中是否有信息
    getRouter () {
      const row = JSON.parse(this.$route.query.row)
      // 为空 新增
      if (JSON.stringify(row) === '{}') {
        this.title = '新增岗位'
      } else {
        // 不为空 修改
        this.title = '修改岗位'
        this.id = row.id
        // 获取岗位信息详情
        this.getJobDetail()
      }
    },
    // 获取岗位信息详情
    async getJobDetail () {
      const { data: res } = await this.$http.post('/us/getJob', {
        id: this.id
      })
      this.formAlign = res
    },
    // 增加一项
    add (title) {
      this.formAlign[title].push('')
    },
    // 提交
    async submit () {
      if (this.title === '修改岗位') {
        const res = await this.$http.post('/us/updateJob', this.formAlign)
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.$router.go(0)
      } else {
        const res = await this.$http.post('/us/addJob', this.formAlign)
        if (res.data !== true || res.status !== 200) return this.$message.error('新增失败')
        this.$message.success('新增成功')
        this.$router.go(-1)
      }
    }
  },
  created () {
    // 判断路由中是否有信息
    this.getRouter()
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
  .el-form-item {
    .el-select, .el-input {
      width: 600px;
    }
    .el-input {
      display: block;
    }
  }
}
</style>
