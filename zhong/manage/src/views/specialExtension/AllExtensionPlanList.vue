<template>
  <div>
    <!-- 面包屑 -->
    <div class="HeadTitle">
      <h2>推广计划列表</h2>
    </div>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审核状态">
          <el-select @change="ggg" v-model="formInline.state" placeholder="请选择审核状态" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="正在执行" value="正在执行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经销商">
           <el-input @change="ggg" v-model="formInline.dealerName" placeholder="店铺名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="dealerName" label="店铺名称" ></el-table-column>
      <el-table-column prop="brandSeries" label="品牌车系" ></el-table-column>
      <el-table-column prop="limit" label="每日限额" ></el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==='正在执行'" style="color: green">{{scope.row.state}}</span>
          <span v-else style="color: red">{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="提交时间"></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==='待审核'" size="mini" type="primary" @click="handleYes(scope.row)">通过</el-button>
          <el-button v-if="scope.row.state==='待审核'" size="mini" type="danger" @click="handleNo(scope.row)">拒绝</el-button>
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
        state:'',
        dealerName: '',
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
    async getPlanList() {
      const { data: res } = await this.$http.post('/extension/planList',this.formInline)
      this.tableData = res.l
      this.total = this.num
    },
    ggg (index) {
      if (index !== undefined) {
        this.formInline.pageNo = 1
      }
    },
    // 编辑
    async handleYes(row) {
        const { data: res } = await this.$http.post('/extension/shPlan', {
            state: "正在执行",
            id: row.id,
            dealerId:row.dealerId
        })
        if(res){
          this.$message.success('审核成功')
          this.formInline.pageNo = 1
          this.getPlanList()
        }else{
          this.$message.success('审核失败')
        }
    },
     async handleNo(row) {
        const { data: res } = await this.$http.post('/extension/shPlan', {
            state: "已拒绝",
            id: row.id,
            dealerId:row.dealerId
        })
        if(res){
          this.$message.success('审核成功')
          this.formInline.pageNo = 1
          this.getPlanList()
        }else{
          this.$message.success('审核失败')
        }
    },
    handleDetail(row) {
      this.dialogFormVisible = true;
      this.brandData = row.brandSeries.split(',')

    },
    close(){
      this.dialogFormVisible = false;
    },
    submit () {
      this.formInline.pageNo = 1
      this.getPlanList()
    },
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.submit()
    },
  },
  computed: {},
  created() {
    this.getPlanList()
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
