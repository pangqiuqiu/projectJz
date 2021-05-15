<template>
  <div>
    <h3>推广报表</h3>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属品牌">
          <el-select v-model="formInline.brand" placeholder="请选择品牌" size="mini">
            <el-option label="所有品牌" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="formInline.name" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="所属4S店">
          <el-select v-model="formInline.name4s" placeholder="请选择" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in store" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { dateConversion, pickerOptions } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 时间快捷键
      pickerOptions: pickerOptions,
      // 搜索条件
      formInline: {
        brand: '',
        name: '',
        name4s: '',
        cycleS: '',
        cycleE: ''
      },
      time: [],
      // 品牌数组
      brandAry: [],
      // 4S店数组
      store: []
    }
  },
  created () {
    // 获取表格数据
    this.getTable()
  },
  methods: {
    // 获取表格数据
    async getTable () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.cycleS = dateConversion(this.time[0])
      this.formInline.cycleE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/dealer/getConsumeList', this.formInline)
      console.log(res)
    },
    // 查询
    submit () {}
  }
}
</script>

<style scoped lang="less">
h3 {
  margin-bottom: 15px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
</style>
