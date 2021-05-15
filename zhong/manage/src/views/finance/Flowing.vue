<template>
  <div>
    <h3>我的流水</h3>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="交易流水号">
          <el-input v-model="formInline.serial" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="打款方信息" v-if="level === 5">
          <el-input v-model="formInline.payer" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间查询">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="serial"
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="payer"
        label="打款方信息">
      </el-table-column>
      <el-table-column
        prop="money"
        width="120"
        label="交易金额">
      </el-table-column>
      <el-table-column
        prop="incomeDate"
        label="交易时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="way"
        label="进账途径"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
      >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="formInline.pageNo"
      :page-size="formInline.pageSize"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { dateConversion, pickerOptions } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 等级
      level: 0,
      // 搜索条件
      formInline: {
        serial: '',
        payer: '',
        pageNo: 1,
        pageSize: 20,
        incomeDateS: '',
        incomeDateE: ''
      },
      time: [],
      // 时间快捷键
      pickerOptions: pickerOptions,
      // 表格
      tableData: [],
      total: 0
    }
  },
  methods: {
    // 用户等级
    async getUserLevel () {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    // 获取表格数据
    async getTable () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.incomeDateS = dateConversion(this.time[0])
      this.formInline.incomeDateE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/money/serial', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getTable()
    }
  },
  created () {
    // 获取用户等级
    this.getUserLevel()
    // 获取表格数据
    this.getTable()
  }
}
</script>

<style scoped lang="less">
// 搜索卡片区域
.el-card {
  margin: 15px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
