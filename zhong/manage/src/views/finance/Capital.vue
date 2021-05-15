<template>
  <div>
    <h3>资金账户</h3>
    <!-- 统计 -->
    <div class="tit">统计</div>
    <div class="statistics">
      <div class="item">
        <div>
          <img src="../../assets/capital/3.png" alt="">
        </div>
        <div>
          <div class="title">充值总额</div>
          <div class="money">{{count.cumulativeRecharge}}</div>
        </div>
      </div>
      <div class="item">
        <div>
          <img src="../../assets/capital/4.png" alt="">
        </div>
        <div>
          <div class="title">账户余额</div>
          <div class="money">{{count.balance}}</div>
        </div>
      </div>
      <div class="item">
        <div>
          <img src="../../assets/capital/2.png" alt="">
        </div>
        <div>
          <div class="title">消费总额</div>
          <div class="money">{{count.cumulativeConsume}}</div>
        </div>
      </div>
      <div class="item">
        <div>
          <img src="../../assets/capital/1.png" alt="">
        </div>
        <div>
          <div class="title">本月消费</div>
          <div class="money">{{count.thisMonth}}</div>
        </div>
      </div>
    </div>
    <!-- 分配表格 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="dealerName"
        label="进账流水号">
      </el-table-column>
      <el-table-column
        prop="payer"
        label="打款方信息">
      </el-table-column>
      <el-table-column
        prop="money"
        width="120"
        label="进账金额">
      </el-table-column>
      <el-table-column
        prop="incomeDate"
        label="进账时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="way"
        label="进账途径"
        width="100">
      </el-table-column>
      <el-table-column
        prop="unallocatedBalance"
        width="100"
        label="可用余额">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row)">分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配弹出层 -->
    <el-dialog title="资金分配" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="推广" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.money" autocomplete="off" placeholder="请输入金额" style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 统计
      count: {},
      // 表格
      tableData: [],
      // 当前行的信息
      row: {},
      // 对话框
      dialogFormVisible: false,
      form: {
        money: '',
        id: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 获取分配表格
    async getTable () {
      const { data: res } = await this.$http.post('/money/getOneConsume')
      this.tableData = res.list
      this.count = res
    },
    // 分配
    handleEdit (row) {
      this.dialogFormVisible = true
      this.row = row
    },
    // 确认分配
    async dialogVisible () {
      if (+this.form.money > this.row.unallocatedBalance) return this.$message.error('资金不足哦')
      this.form.id = this.row.id
      const res = await this.$http.post('/dealer/fpIncome', this.form)
      if (res.data !== true || res.status !== 200) return this.$message.error('分配失败')
      this.$message.success('分配成功')
      this.dialogFormVisible = false
      this.form.money = ''
      this.getTable()
    }
  },
  created () {
    // 获取分配表格
    this.getTable()
  }
}
</script>

<style scoped lang="less">
// 统计
.tit {
  margin-top: 15px;
  height: 50px;
  line-height: 50px;
  background-color: #ddd;
  padding-left: 20px;
}
.statistics {
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  .item {
    display: flex;
    justify-content: flex-start;
    margin: 15px 0;
    img {
      margin-right: 10px;
    }
    .title {
      color: #666;
      font-size: 14px;
    }
    .money {
      font-size: 20px;
      color: red;
    }
  }
}
</style>
