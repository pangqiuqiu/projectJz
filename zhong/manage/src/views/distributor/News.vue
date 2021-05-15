<template>
  <div>
    <h3>消费报表</h3>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="经销商名称">
          <el-input v-model="formInline.dealerName" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间范围">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <!-- <el-form-item label="版本">
          <el-select v-model="formInline.banben" size="mini">
            <el-option label="全部版本" value=""></el-option>
            <el-option label="免费版" value="免费版"></el-option>
            <el-option label="标准版" value="标准版"></el-option>
            <el-option label="豪华版" value="豪华版"></el-option>
            <el-option label="旗舰版" value="旗舰版"></el-option>
            <el-option label="汽贸店" value="汽贸店"></el-option>
            <el-option label="车展版" value="车展版"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="品牌">
          <el-select v-model="formInline.brand" size="mini">
            <el-option label="全部品牌" value=""></el-option>
            <el-option v-for="item in brandList" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="4s店状态">
          <el-select v-model="formInline.state4s" size="mini">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="试用" value="试用"></el-option>
            <el-option label="年单" value="年单"></el-option>
            <el-option label="过期" value="过期"></el-option>
            <el-option label="试用过期" value="试用过期"></el-option>
            <el-option label="年单过期" value="年单过期"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="推广状态">
          <el-select v-model="formInline.extensionState" size="mini">
            <el-option label="全部状态" value=""></el-option>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="预计余额不足5天" value="预计余额不足5天"></el-option>
            <el-option label="预计余额不足2天" value="预计余额不足2天"></el-option>
            <el-option label="超日限额" value="超日限额"></el-option>
            <el-option label="未开推广需求" value="未开推广需求"></el-option>
            <el-option label="余额不足" value="余额不足"></el-option>
            <el-option label="到期关闭" value="到期关闭"></el-option>
            <el-option label="店未充值" value="店未充值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="dealerName"
        label="经销商"
        width="250">
      </el-table-column>
      <el-table-column
        prop="name"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cumulativeRecharge"
        label="累计充值">
      </el-table-column>
      <el-table-column
        prop="cumulativeConsume"
        label="累计消费">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="4S店状态">
      </el-table-column>
      <el-table-column
        prop="cycle"
        label="周期">
      </el-table-column>
      <el-table-column
        prop="extensionState"
        label="推广状态">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="消费"
        width="100">
      </el-table-column>
      <el-table-column
        prop="joinNum"
        label="报名"
        width="80">
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
      // 时间快捷键
      pickerOptions: pickerOptions,
      // 时间数组
      time: [],
      // 搜索条件
      formInline: {
        dealerName: '', // 经销商名称
        cycleS: '', // 开始时间
        cycleE: '', // 结束时间
        brand: '', // 品牌
        extensionState: '', // 推广状态
        pageNo: 1,
        pageSize: 20
      },
      // 品牌列表
      brandList: [],
      // 总数
      total: 0,
      // 表格
      tableData: []
    }
  },
  created () {
    // 获取表格数据
    this.getTable()
    // 获取品牌
    this.getBrand()
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
      this.tableData = res.l
      this.total = res.num
      console.log(res)
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    },
    // 点击查询按钮
    submit () {
      this.formInline.pageNo = 1
      this.getTable()
    }
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
