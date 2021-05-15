<template>
  <div>
    <h3>招贤纳士</h3>
    <!-- 新增职位 -->
    <el-button style="margin: 10px 0" type="primary" size="small" @click="addWork">新增职位</el-button>
    <!-- 职位表格 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="岗位"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="工作地点"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="性质">
      </el-table-column>
      <el-table-column
        prop="years"
        label="年限">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
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
export default {
  data () {
    return {
      // 表格数据
      tableData: [],
      total: 0,
      formAlign: {
        pageSize: 20,
        pageNo: 1
      }
    }
  },
  methods: {
    // 获取表格数据
    async getTable () {
      const { data: res } = await this.$http.post('/us/job', this.formAlign)
      this.tableData = res.l
      this.total = res.num
    },
    // 新增职位
    addWork () {
      this.$router.push({
        path: '/us/joinDetails',
        query: { row: JSON.stringify({}) }
      })
    },
    // 编辑
    handleEdit (row) {
      this.$router.push({
        path: '/us/joinDetails',
        query: { row: JSON.stringify(row) }
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除此职位吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await this.$http.post('/us/delJob', { id: row.id })
        if (res.status === 200 && res.data === true) {
          this.getTable()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      }).catch(() => {
      })
    },
    // 分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getTable()
    }
  },
  created () {
    // 获取表格数据
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
