<template>
  <div>
    <!-- 面包屑 -->
    <h3>资讯审核</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="资讯类型">
          <el-select v-model="formInline.type" placeholder="选择资讯类型" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="车讯" value="车讯"></el-option>
            <el-option label="试驾评测" value="试驾评测"></el-option>
            <el-option label="技术" value="技术"></el-option>
            <el-option label="导购" value="导购"></el-option>
            <el-option label="行业文化" value="行业文化"></el-option>
            <el-option label="重点号资讯" value="重点号资讯"></el-option>
            <el-option label="团购活动" value="团购活动"></el-option>
            <el-option label="店铺活动" value="店铺活动"></el-option>
            <el-option label="品牌新闻" value="品牌新闻"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input style="width: 300px;" v-model="formInline.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <template>
      <el-table
        :header-cell-style="{ 'text-align': 'center', 'font-size': '16px', 'color': '#000' }"
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
          label="标题">
          <template slot-scope="scope">
            <span @click="title(scope.row.id)">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="issueDate"
          label="发布日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="160">
        </el-table-column>
        <el-table-column
          label="申请上首页"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.ishome === '1'">已申请</span>
            <span v-if="scope.row.ishome === '0'">未申请</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.row.id)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
        title: '',
        type: '',
        token: '',
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
    // 获取资讯列表
    async getInformationList () {
      this.formInline.token = window.sessionStorage.getItem('token')
      const { data: res } = await this.$http.post('/Infor/shList', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getInformationList()
    },
    // 表格操作按钮
    handleEdit (id) { // 审核
      this.$router.push({
        path: '/information/details',
        query: { id: id }
      })
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getInformationList()
    },
    // 表格操作按钮
    title (id) { // 标题
      window.open(`https://zhongdianqiche.com/car/#/automotivelnformation/details?id=${id}`)
      // window.open(`http://localhost:8080/#/automotivelnformation/details?id=${id}`)
    },
  },
  created () {
    // 获取资讯列表
    this.getInformationList()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
// 新建资讯
.addInformation {
  margin-bottom: 20px;
  border-radius: 10px;
}
span {
  cursor: pointer;
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
