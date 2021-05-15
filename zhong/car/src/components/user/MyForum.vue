<template>
  <div>
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      style="width: 100%; border: 0">
      <el-table-column label="标题" width="600">
        <template slot-scope="scope">
          <span @click="postTitle(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="postDate"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.state !== '精华帖'" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDetele(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="this.form.pageNo"
      :page-size="this.form.pageSize"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // 表单
      form: {
        userId: '',
        pageSize: 6,
        pageNo: 1
      },
      total: 0,
      tableData: []
    }
  },
  created () {
    // 获取列表数据
    this.getTableList()
  },
  methods: {
    // 获取列表数据
    async getTableList () {
      this.form.userId = Cookie.get('ID')
      const { data: res } = await this.$http.post('/Invit/getMyInvit', this.form)
      this.tableData = res.l
      this.total = res.num
      this.$emit('myPost', this.total)
    },
    // 改变分页
    changePage (index) {
      this.form.pageNo = index
      this.getTableList()
    },
    // 帖子详情页
    postTitle (row) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: row.id }
      })
      window.open(href, '_blank')
    },
    // 删除
    async handleDetele (row) {
      const res = await this.$http.post('/Invit/delInvit', {
        id: row.id
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.$router.go(0)
    },
    // 编辑
    handleEdit (row) {
      this.$router.push({
        path: '/user/edit',
        query: { id: row.id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
  text-align: center;
}
span {
  cursor: pointer;
}
</style>
