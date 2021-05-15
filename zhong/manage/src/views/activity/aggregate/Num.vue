<template>
  <div>
    <h3>活动报名列表</h3>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="报名时间">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" size="mini" v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格数据展示 -->
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="signDate" label="报名时间"></el-table-column>
      <el-table-column label="是否支付">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row.price"></i>
          <i class="el-icon-close" v-else></i>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="date" label="订单号"></el-table-column> -->
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
import { dateConversion } from '../../../assets/js/timer'
export default {
  data () {
    return {
      // 时间
      time: [],
      // 参数
      formInline: {
        gatherId: '',
        pageNo: 1,
        pageSize: 15,
        phone: '', // 手机号
        startDate: '', // 开始时间
        endDate: '' // 结束时间
      },
      // 表格
      tableData: [],
      // 总数
      total: 0
    }
  },
  methods: {
    // 获取表格数据
    async getTable () {
      this.formInline.startDate = dateConversion(this.time[0])
      this.formInline.endDate = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/gather/showSign', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 搜索
    submit () {
      this.formInline.pageNo = 1
      this.getTable()
    },
    // 分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    }
  },
  created () {
    this.formInline.gatherId = this.$route.query.id
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin: 20px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
