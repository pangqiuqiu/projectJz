<template>
  <div>
    <h3>分配列表</h3>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="店铺名称">
          <el-select v-model="formInline.dealerId" placeholder="请选择店铺名称" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.name4s" :value="item.id" v-for="item in store" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="mini"
            v-model="formInline.deductDate"
            type="date"
            placeholder="请选择选择日期">
          </el-date-picker>
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
      <el-table-column label="店铺名称">
        <template slot-scope="scope">
          <span v-if="scope.row.dealer">{{scope.row.dealer.name4s}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="clueNum"
        label="线索条数">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        label="每日消费价格(元)">
      </el-table-column>
      <el-table-column
        prop="avgPrice"
        label="线索平均价(元)">
      </el-table-column>
      <el-table-column
        prop="deductDate"
        label="消费日期">
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
export default {
  data () {
    return {
      // 参数
      formInline: {
        pageSize: 15,
        pageNo: 1,
        dealerId: '',
        deductDate: ''
      },
      // 表格
      tableData: [],
      total: 0,
      // 店铺
      store: []
    }
  },
  methods: {
    // 经销商名称
    async getStore () {
      const { data: res } = await this.$http.post('/dealer/deductionListDealer')
      this.store = res
    },
    // 表格数据
    async getTable () {
      const { data: res } = await this.$http.post('/dealer/getDeductionList', this.formInline)
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
    this.getTable()
    this.getStore()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
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
