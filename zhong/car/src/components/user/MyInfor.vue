<template>
  <div>
    <el-table
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      border
      style="width: 100%">
      <el-table-column label="发布人" width="130">
        <template slot-scope="scope">
          <img style="cursor: pointer;" @click="userMain(scope.row)" :src="scope.row.object.key.headPic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="userInfor(scope.row)">{{scope.row.object.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleted(scope.row)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      hide-on-single-page
      @current-change="changePage"
      layout="prev, pager, next"
      :page-size="this.formLine.pageSize"
      :current-page="this.formLine.pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      tableData: [],
      formLine: {
        pageNo: 1,
        pageSize: 5
      },
      total: 0
    }
  },
  created () {
    this.getTable()
  },
  methods: {
    // 获取表格
    async getTable () {
      const { data: res } = await this.$http.post('/user/colList', {
        userId: Cookie.get('ID'),
        type: '文章'
      })
      this.tableData = res.l
      this.total = res.num
    },
    // 分页
    changePage (index) {
      this.formLine.pageNo = index
      this.getTable()
    },
    // 取消收藏
    async deleted (row) {
      const res = await this.$http.post('/key/col', {
        userId: Cookie.get('ID'),
        type: row.type,
        nId: row.nId
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('操作失败')
      this.$message.success('取消成功')
      // this.getTable()
      this.$router.go(0)
    },
    // 自媒体个人主页面
    userMain (row) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: row.object.key.id }
      })
      window.open(href, '_blank')
    },
    // 详情
    userInfor (row) {
      if (row.type === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: row.nId }
        })
        window.open(href, '_blank')
      } else {
        const { href } = this.$router.resolve({
          path: '/automotivelnformation/details',
          query: { id: row.nId }
        })
        window.open(href, '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
  text-align: center;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
