<template>
  <div>
    <h3>合作列表</h3>
    <!-- 新增案例 -->
    <el-button class="btn" @click="add" type="primary" size="mini">新增合作案例</el-button>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="intro" label="合作简述"></el-table-column>
      <el-table-column label="封面图">
        <template slot-scope="scope">
          <img :src="scope.row.coverPic" alt="">
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          <el-popconfirm
            title="您确定要删除吗?"
            cancel-button-type="primary"
            confirm-button-type="danger"
            @onConfirm="del(scope.row.id)"
          >
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
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
export default {
  data () {
    return {
      // 参数
      formAlign: {
        pageNo: 1,
        pageSize: 15
      },
      // 合作列表
      tableData: [],
      total: 0
    }
  },
  methods: {
    // 获取合作列表
    async getTable () {
      const { data: res } = await this.$http.post('/us/showCase', this.formAlign)
      this.tableData = res.l
      this.total = res.num
    },
    // 改变分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getTable()
    },
    // 新增合作案例
    add () {
      this.$router.push('/us/cooperation/casedetails')
    },
    // 编辑
    edit (id) {
      this.$router.push(`/us/cooperation/casedetails?id=${id}`)
    },
    // 删除
    async del (id) {
      const { data: res } = await this.$http.post('/us/delCase', { id })
      if (!res) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getTable()
    }
  },
  created () {
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
// 新增按钮
.btn {
  margin: 10px 0;
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
