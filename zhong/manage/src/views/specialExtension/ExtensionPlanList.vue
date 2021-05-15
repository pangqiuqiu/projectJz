<template>
  <div>
    <!-- 面包屑 -->
    <div class="HeadTitle">
      <h2>推广计划列表</h2>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 搜索区域 -->
    <!-- <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审核状态">
          <el-select @change="ggg" v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <!-- 搜索结果 -->
    <el-table
      @selection-change="changeFun"
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="brandSeries" label="品牌车系" ></el-table-column>
      <el-table-column prop="limit" label="每日限额" ></el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==='正在执行'" style="color: green">{{scope.row.state}}</span>
          <span v-else-if="scope.row.state==='独家'" style="color: blue">{{scope.row.state}}</span>
          <span v-else style="color: red">{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="审核状态" ></el-table-column>
      <el-table-column prop="createDate" label="提交时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='已取消' || scope.row.state==='已拒绝'" size="mini" type="primary" @click="handleYes(scope.row)">重新提交审核</el-button>
          <el-button v-if="scope.row.state==='已取消' || scope.row.state==='已拒绝'" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          <el-button v-if="scope.row.state==='待审核'" size="mini" type="primary" @click="handleNo(scope.row)">取消审核</el-button>
          <el-button size="mini" type="warning" @click="handleDetail(scope.row)">详情</el-button>
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
      :total="total"
    >
    </el-pagination>
    <el-dialog :info='msg' title="品牌车系列表" :visible.sync="dialogFormVisible">
      <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="brandData"
      border
      style="width: 100%"
    > 
    <el-table-column label="品牌" >
      <template slot-scope="scope">
        {{ scope.row.split('/')[0] }}
      </template>
      </el-table-column> 
    <el-table-column label="车系" >
      <template slot-scope="scope">
        {{ scope.row.split('/')[1] }}
      </template>
      </el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible:false,
      msg: '',
      // 搜索条件
      formInline: {
        id: '',
        brand: '',
        pageNo: 1,
        pageSize: 20,
      },
      // 总数
      total: 0,
      // 表格
      tableData: [],
      brandData: [],
    }
  },
  methods: {
    // 获取经销商列表
    async getSpecialSale() {
      const { data: res } = await this.$http.post('/extension/myPlan')
      this.tableData = res
      this.total = this.num
    },
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    // 编辑
   async handleYes(row) {
        const { data: res } = await this.$http.post('/extension/shPlan', {
            state: "待审核",
            id: row.id
        })
        if(res){
          this.$message.success('重新提交成功')
          this.formInline.pageNo = 1
          this.getSpecialSale()
        }else{
          this.$message.success('重新提交失败')
        }
    },
    async handleNo(row) {
        const { data: res } = await this.$http.post('/extension/shPlan', {
            state: "已取消",
            id: row.id
        })
        if(res){
          this.$message.success('取消成功')
          this.formInline.pageNo = 1
          this.getSpecialSale()
        }else{
          this.$message.success('取消失败')
        }
    },
    async handleDel(row) {
        const { data: res } = await this.$http.post('/extension/delPlan', {
            id: row.id
        })
        if(res){
          this.$message.success('删除成功')
          this.formInline.pageNo = 1
          this.getSpecialSale()
        }else{
          this.$message.success('删除失败')
        }
    },
    handleDetail(row) {
      this.dialogFormVisible = true;
      this.brandData = row.brandSeries.split(',')

    },
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.submit()
    },
  },
  computed: {},
  created() {
    // 获取特卖列表
    this.getSpecialSale()
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
