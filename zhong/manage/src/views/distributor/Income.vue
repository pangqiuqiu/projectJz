<template>
  <div>
    <div class="operation">
      <h3>经销商最新进账</h3>
      <el-button type="primary" size="small" @click="dialogFormVisible = true" v-if="level == 1 || level == 2">操作进账</el-button>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="打款信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="经销商账号" :label-width="formLabelWidth">
          <el-select
            style="width: 100%"
            v-model="form.dealerId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打款方" :label-width="formLabelWidth">
          <el-input v-model="form.payer"></el-input>
        </el-form-item>
        <el-form-item label="进账金额" :label-width="formLabelWidth">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="进账时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="form.incomeDate"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="进账方式" :label-width="formLabelWidth">
          <el-select v-model="form.way" placeholder="请选择" style="width: 100%">
            <el-option label="银行" value="银行"></el-option>
            <el-option label="扫码" value="扫码"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="payment('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品牌">
          <el-select filterable v-model="formInline.brand" placeholder="请选择品牌" size="mini">
            <el-option label="所有品牌" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="4S店账户">
          <el-input v-model="formInline.dealerName" size="mini"></el-input>
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
        label="经销商账号">
      </el-table-column>
      <el-table-column
        prop="payer"
        label="打款方">
      </el-table-column>
      <el-table-column
        prop="money"
        label="进账金额">
      </el-table-column>
      <el-table-column
        prop="unallocatedBalance"
        label="未分配余额">
      </el-table-column>
      <el-table-column
        prop="incomeDate"
        label="进账时间">
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
import { dateConversion } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 品牌
      brandAry: [],
      // 搜索条件
      formInline: {
        pageSize: 20,
        pageNo: 1,
        brand: '',
        dealerName: ''
      },
      // 总数量
      total: 0,
      // 表格
      tableData: [],
      // 用户等级
      level: '',
      // 对话框
      dialogFormVisible: false,
      form: {
        dealerId: '',
        payer: '',
        money: '',
        incomeDate: '',
        way: '',
        remarks: ''
      },
      formLabelWidth: '120px',
      // 远程搜索
      options: [],
      list: [],
      loading: false,
      states: []
    }
  },
  created () {
    // 获取最近进账表格
    this.getTable()
    // 品牌
    this.getBrand()
  },
  mounted () {
    // 用户等级
    this.getLevel()
    // 获取经销商
    this.getDistorList()
  },
  methods: {
    // 获取最近进账表格
    async getTable () {
      const { data: res } = await this.$http.post('/dealer/newIncome', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandAry = res
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
    },
    // 获取用户等级
    async getLevel () {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    // 获取经销商列表
    async getDistorList () {
      const { data: res } = await this.$http.post('/dealer/getAllDealer')
      this.states = res
      // 分配经销商数据
      this.list = this.states.map(item => {
        return { value: `${item.id}`, label: `${item.name4s}` }
      })
    },
    // 远程搜索
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 确认输入框
    async payment (formName) {
      this.form.incomeDate = dateConversion(this.form.incomeDate)
      const res = await this.$http.post('/dealer/addIncome', this.form)
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.dialogFormVisible = false
      // 清空对话框
      this.form.dealerId = ''
      this.form.payer = ''
      this.form.money = ''
      this.form.incomeDate = ''
      // this.$refs[formName].resetFields()
      this.getTable()
    }
  }
}
</script>

<style scoped lang="less">
// 操作
.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
