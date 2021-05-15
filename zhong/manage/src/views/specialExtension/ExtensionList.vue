<template>
  <div>
    <h3>推广设置</h3>
    <!-- 账号余额 -->
    <div class="account">
      <div class="left">
        <h4>账户余额: <span> {{count}} </span>元</h4>
        <span class="limit">(每日限额: {{limit}}元)</span>
        <el-button type="text" @click="everyDay">修改每日限额</el-button>
      </div>
      <div>
        <el-button type="primary" size="small" @click="recharge">账号充值</el-button>
      </div>
    </div>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品牌">
          <el-select @visible-change="dropDownBrand($event)"  v-model="formInline.brand" placeholder="请选择品牌" size="mini">
             <el-option label="不限" value=""></el-option>
             <el-option v-for="(item,index) in brandAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-button size="mini" type="primary" @click="allOpen" style="margin-top: 15px;margin-bottom: 15px;">批量开启</el-button>
    <el-button size="mini" type="danger" @click="allClosed" style="margin-top: 15px">批量关闭</el-button> -->
    <el-button size="mini" type="success" @click="creatPlan" style="margin-top: 15px;margin-bottom: 15px;">生成推广计划</el-button>
    <el-button size="mini" type="danger" @click="clearSelect" style="margin-top: 15px">清空所有选择</el-button>
    <el-button size="mini" type="warning" @click="lookPlan" style="margin-top: 15px">查看推广计划</el-button>
    <!-- 搜索结果 -->
    <el-table
      @selection-change="changeFun"
      :row-key="(row)=>{ return row.id}"
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      ref="multipleTable"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="brand" label="品牌" ></el-table-column>
      <el-table-column prop="series" label="车系" ></el-table-column>
      <!-- <el-table-column label="推广状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state" style="color: green">开启</span>
          <span v-else style="color: red">关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" :type="scope.row.state?'danger':'primary'" @click="handleEdit(scope.row)"
            >{{scope.row.state?'关闭':'开启'}}</el-button
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
      brandAry: [],
      // 复选框集合
      checkBoxData: [],
      idList:[],
      // 账号余额
      count: 0,
      // 每日限额
      limit: 0,
      // 当前人等级
      level: 0,
      time: [],
      // 搜索条件
      formInline: {
        brand:'',
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
      // 获取账户余额和限额
    async getCount () {
      const { data: res } = await this.$http.post('/money/getOneConsume')
      this.count = res.balance
      this.limit = res.norm
    },
    // 修改每日限额
    everyDay () {
      this.$prompt('每日限额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/money/norm', {
          norm: value
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    // 获取品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/dealer/oneDealerBrand')
        this.brandAry = res
      }
    },
    // 账户充值
    recharge () {
      this.$router.push('/finance/recharge')
    },
    // 监听复选框
    changeFun (val) {
      this.checkBoxData = val
    },
    clearSelect () {
     this.$refs.multipleTable.clearSelection(); 
    },
    // 获取经销商列表
    async getExtensionList() { 
      //this.formInline.token = window.sessionStorage.getItem('token')
      const { data: res } = await this.$http.post('/extension/extensionList',this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    submit () {

      this.formInline.pageNo = 1
 
      this.getExtensionList()
    },
    // 编辑
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.getExtensionList()
    },
    // 开启所有选中项
    // async allOpen () {
    //   if (this.checkBoxData.length === 0) {
    //     return this.$message.error('至少选择其中一项哦')
    //   }
    //   this.checkBoxData = this.checkBoxData.map(item => {
    //     return item.id
    //   })
    //   const res = await this.$http.post('/extension/plOnOff', {
    //     list: this.checkBoxData,
    //     state:1
    //   })
    //   if (res.status !== 200 || res.data !== true) {
    //     return this.$message.error('开启失败')
    //   }
    //   this.$message.success('开启成功')
    //   this.getExtensionList()
    // },
    // 开启所有选中项
    // async allClosed () {
    //   if (this.checkBoxData.length === 0) {
    //     return this.$message.error('至少选择其中一项哦')
    //   }
    //   this.checkBoxData = this.checkBoxData.map(item => {
    //     return item.id
    //   })
    //   const res = await this.$http.post('/extension/plOnOff', {
    //     list: this.checkBoxData,
    //     state:0
    //   })
    //   if (res.status !== 200 || res.data !== true) {
    //     return this.$message.error('关闭失败')
    //   }
    //   this.$message.success('关闭成功')
    //   this.getExtensionList()
    // },
     lookPlan () {
      this.$router.push(`/specialExtension/extensionPlanList`)
    },
    async creatPlan () {
      // const { data: res } = await this.$http.post('/extension/addPlan')
      // if (res === 520 ) {
      //   return this.$message.error('请选择车系开启推广')
      // }else if(res === 530){
      //   return this.$message.error('生成计划失败')
      // }
      // this.$message.success('生成计划成功')
      if (this.checkBoxData.length === 0) {
        return this.$message.error('请勾选品牌车系')
      }
      var count = this.idList.length
      if ( count > 0) {
        this.idList.splice(0, count) 
      }
      this.checkBoxData.forEach(item => {
        this.idList.push(item.id)
      })

      const { data: res } = await this.$http.post('/extension/addPlan', {
          idList: this.idList
      })
      if (res === 520 ) {
        return this.$message.error('请选择车系开启推广')
      }else if(res === 530){
        return this.$message.error('生成计划失败')
      }
      this.$refs.multipleTable.clearSelection(); 
      this.$message.success('生成计划成功')
    },
    async handleEdit(row) {
        const res = await this.$http.post('/extension/onOff', {
            id: row.id,
        })
        if (res){
          this.$message.success('修改成功')
        }else{
          this.$message.success('修改失败')
        }
        
        this.getExtensionList()
    },
  },
  computed: {},
  created() {
    // 获取特卖列表
    this.getExtensionList()
    // 获取账户余额和限额
    this.getCount()
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
// 账户余额
.account {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 30px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .limit {
      margin: 20px;
    }
  }
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
