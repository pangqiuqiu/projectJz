<template>
  <div>
    <!-- 面包屑 -->
    <div class="HeadTitle">
      <h2>推广车系列表</h2>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="brandSeries" label="品牌车系" ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="this.formInline.pageNo"
      :page-size="this.formInline.pageSize"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总数
      total: 0,
      // 表格
      tableData: [],
    }
  },
  methods: {
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
   
  },
  computed: {},
  created() {
    var brands = this.$route.query.brand
    this.tableData = brands.split(',')
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
// 头部标题
.HeadTitle {
  display: flex;
  justify-content: space-between;
  background-color: #f7f8f9;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
}
h2 {
  margin-bottom: 20px;
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

.img {
  width: 500px;
}
.admin {
  ul {
    overflow: hidden;
  }
  li {
    float: left;
    .el-checkbox {
      margin-right: 7px;
    }
    span {
      margin-right: 20px;
    }
  }
}
</style>
