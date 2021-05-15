<template>
  <div>
    <h3>新车上市</h3>
    <!-- 发布新车 -->
    <el-button @click="add" type="primary" size="mini">发布新车</el-button>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formAlign">
        <el-form-item label="发布时间">
          <el-date-picker v-model="formAlign.months" size="mini" type="month" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据列表 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="brand"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="series"
        label="车系">
      </el-table-column>
      <el-table-column
        prop="months"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="label"
        label="标签">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="确定要删除吗？" v-model="visible" @onConfirm="dels(scope.row)">
            <el-button slot="reference" size="mini" type="danger" @click="del">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="formAlign.pageNo"
      :page-size="formAlign.pageSize"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { dateConversionMonth } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 确认删除
      visible: false,
      // 表格数据
      tableData: [],
      total: 0,
      formAlign: {
        pageSize: 20,
        pageNo: 1,
        months: ''
      }
    }
  },
  methods: {
    // 获取列表
    async getTable () {
      this.formAlign.months = dateConversionMonth(this.formAlign.months)
      const { data: res } = await this.$http.post('/rank/showNewCar', this.formAlign)
      this.tableData = res.l
      this.total = res.num
    },
    // 发布新车
    add () {
      this.$router.push('/app/addRelease')
    },
    // 删除对话框
    del () {
      this.visible = true
    },
    // 确认删除
    async dels (row) {
      const res = await this.$http.post('/rank/delNewCar', {
        id: row.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getTable()
    },
    // 查询
    submit () {
      this.formAlign.pageNo = 1
      this.getTable()
    },
    // 分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getTable()
    }
  },
  created () {
    // 获取品牌
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 15px;
}
.el-card {
  margin: 15px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}

// 分页
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
