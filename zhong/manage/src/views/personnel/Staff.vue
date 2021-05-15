<template>
  <div>
    <!-- 面包屑 -->
    <h3>员工管理</h3>
    <!-- 新增员工 -->
    <el-button size="small" style="margin-bottom: 15px;" type="primary" class="addInformation" @click="addUser">新增员工</el-button>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="role"
        label="职位"
        >
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
      :current-page="this.formInline.pageNo"
      :page-size="this.formInline.pageSize"
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
      // 搜索条件
      formInline: {
        pageNo: 1,
        pageSize: 20
      },
      // 总数
      total: 0,
      // 表格
      tableData: []
    }
  },
  methods: {
    // 新增员工
    addUser () {
      this.$router.push({
        path: '/personnel/admin',
        query: {
          key: this.$Base64.encode(JSON.stringify({
            title: '新增员工'
          }))
        }
      })
    },
    // 获取员工列表
    async getUserList () {
      const { data: res } = await this.$http.post('/user/showUser', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getUserList()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getUserList()
    },
    // 删除
    handleDelete (row) {
      this.$confirm('确定要删除该员工信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await this.$http.post('/user/delUser', {
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('操作失败')
        }
        this.$message.success('操作成功')
        this.submit()
      }).catch(() => {
      })
    },
    // 编辑
    handleEdit (row) {
      this.$router.push({
        path: "/personnel/admin",
        query: {
          key: this.$Base64.encode(JSON.stringify({
            id: row.id
          }))
        }
      })
    }
  },
  created () {
    // 获取用户列表
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
.el-dialog {
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
  .el-button {
    width: 150px;
  }
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
