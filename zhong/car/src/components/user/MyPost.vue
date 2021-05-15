<template>
  <div>
    <el-table
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      border
      style="width: 100%">
      <el-table-column
        prop="prop"
        label="发布人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="label"
        label="标题">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delete(scope.row)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          prop: '2016-05-02',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          prop: '2016-05-04',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          prop: '2016-05-01',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          prop: '2016-05-03',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          prop: '2016-05-02',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          prop: '2016-05-04',
          label: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ],
      formLine: {
        pageNo: 1,
        pageSize: 8
      },
      total: 0
    }
  },
  created () {
  },
  methods: {
    // 获取表格
    async getTable () {
      const { data: res } = await this.$http.post()
      this.tableData = res.l
      this.total = res.num
      console.log(res)
    },
    // 分页
    changePage (index) {
      this.formLine.pageNo = index
      this.getTable()
    },
    // 取消收藏
    async delete (row) {
      const res = await this.$http.post()
      if (res.status !== 200 || res.data !== true) return this.$message.error('操作失败')
      this.$message.success('取消成功')
      this.getTable()
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
