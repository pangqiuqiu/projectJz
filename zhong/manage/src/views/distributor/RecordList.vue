<template>
  <div>
    <!-- 面包屑 -->
    <div class="HeadTitle">
      <h2>跟踪记录列表</h2>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 搜索区域 -->
    <!-- <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品牌">
          <el-select @change="ggg" v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{
        'text-align': 'center',
        'font-size': '14px',
        color: '#000',
      }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
     <el-table-column prop="recordLevel" label="客户意向等级" ></el-table-column>
     <el-table-column prop="record" label="跟踪记录" ></el-table-column>
     <el-table-column prop="followDate" label="记录时间"></el-table-column>
      
      <!-- <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column> -->
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
      flag: true,
      // 对话框
      dialogFormVisible: false,
      msg: '',
      formLabelWidth: '150px',
      // 搜索条件
      formInline: {
        userId: '',
        xjId: '',
        pageNo: 1,
        pageSize: 20,
      },
      // 总数
      total: 0,
      // 表格
      tableData: [],
    }
  },
  methods: {
    // 获取经销商列表
    async getRecordList() {
      const { data: res } = await this.$http.post('/dealer/getAllRecord',this.formInline)
      this.tableData = res
      this.total = this.tableData.length
    },
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    // 获取品牌
    // async dropDownBrand (callback) {
    //   if (callback === true) {
    //     const { data: res } = await this.$http.post('/dealer/getDealerAllBrand', {
    //         dealerId: this.formInline.dealerId
    //     })
    //     this.brandAry = res
    //   }
    // },
    // // 查询
    // ggg (index) {
    //   if (index !== undefined) {
    //     this.formInline.pageNo = 1
    //   }
    // },
    // submit () {
    //   if (this.flag === false) {
    //     this.formInline.pageNo = 1
    //   }
    //   this.ggg()
    //   this.getSpecialSale()
    //   this.flag = true
    // },
    // 编辑
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.getRecordList()
    },
  },
  computed: {},
  created() {
    this.formInline.userId = this.$route.query.userId
    this.formInline.xjId = this.$route.query.xjId
    // 获取特卖列表
    this.getRecordList()
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
