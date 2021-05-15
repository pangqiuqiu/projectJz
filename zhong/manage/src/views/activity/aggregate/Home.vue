<template>
  <div>
    <!-- 标题 -->
    <h3>集客活动</h3>
    <!-- 按钮 -->
    <div class="btn">
      <el-button type="primary" size="mini" @click="add">新建</el-button>
      <el-button type="primary" size="mini" @click="statistics">集客活动统计</el-button>
    </div>
    <!-- 表格展示 -->
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column label="二维码" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.twoCode" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="活动标题"></el-table-column>
      <el-table-column label="优惠详情">
        <template slot-scope="scope">
          <div>{{scope.row.price}}</div>
          <div>{{scope.row.gift}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间" width="170"></el-table-column>
      <el-table-column label="集客人数" width="120">
        <template slot-scope="scope">
          <span @click="num(scope.row.id)" class="num">{{scope.row.peopleNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="80"></el-table-column>
      <el-table-column prop="address" label="管理" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
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
      // 表格信息
      tableData: [],
      // 参数
      formAlign: {
        pageSize: 15,
        pageNo: 1
      },
      // 总数
      total: 0
    }
  },
  methods: {
    // 获取表格数据
    async getTable () {
      const { data: res } = await this.$http.post('/gather/gatherList', this.formAlign)
      this.tableData = res.l
      this.total = res.num
    },
    // 分页
    changePage (index) {
      this.formAlign.pageNo = index
      this.getTable()
    },
    // 新建
    add () {
      this.$router.push('/activity/aggregate/add')
    },
    // 统计
    statistics () {
      this.$router.push('/activity/aggregate/count')
    },
    // 单个集客活动
    num (id) {
      this.$router.push(`/activity/aggregate/num?id=${id}`)
    },
    // 编辑
    edit (id) {
      this.$router.push(`/activity/aggregate/edit?id=${id}`)
    }
  },
  created () {
    // 获取表格数据
    this.getTable()
  }
}
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
// 集客人数
.num:hover {
  cursor: pointer;
  color: red;
}
</style>
