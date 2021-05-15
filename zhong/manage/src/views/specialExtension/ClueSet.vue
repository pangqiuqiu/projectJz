<template>
  <div>
    <h3>线索设置</h3>
    <!-- 账号余额 -->
    <div class="account">
      <div class="left">
        <span class="left2">1.独家线索利润率:  {{sole}} %</span>
        <el-button type="text" @click="updateProfitOne">修改利润率</el-button>
        <span class="left2">2.单条线索利润率:  {{single}} %</span>
        <el-button type="text" @click="updateProfitTwo">修改利润率</el-button>
        <span class="left2">3.多家线索折扣:  {{discount}} 折</span>
        <el-button type="text" @click="updateProfitMore">修改折扣</el-button>
        <span class="left2">4.单条线索最多可分配:  {{fpNum}}家 </span>
        <el-button type="text" @click="updateProfitCount">修改</el-button>
      </div>
    </div>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="经销商">
           <dropdown @item-click="dropDownClick" :isNeedSearch="true" :itemlist="itemlist"></dropdown>
        </el-form-item>
        <el-form-item label="品牌">
          <dropdown @item-click="dropDownBrand" :isNeedSearch="false" :itemlist="brandlist"></dropdown>
        </el-form-item>
        <el-form-item style="line-height: 32px;">
          <el-button type="primary" @click="submit" size="small" >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button size="mini" type="success" @click="creatPlan" style="margin-top: 15px;margin-bottom: 15px;">生成独家推广计划</el-button>
    <el-button size="mini" type="danger" @click="clearSelect" style="margin-top: 15px">清空所有选择</el-button>
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
      <el-table-column prop="dealerName" label="店名"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="brand" label="品牌" ></el-table-column>
      <el-table-column prop="series" label="车系" ></el-table-column>
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
import Dropdown from '@/components/dropdown/dropdown.vue'
export default {
  data() {
    return {
      brandAry: [],
      // 复选框集合
      checkBoxData: [],
      idList:[],
      //独家利润
      sole: 0,
      //每条利润
      single: 0,
      //多条折扣
      discount: 0,
      //最多分配数量
      fpNum: 0,
      time: [],
      // 搜索条件
      formInline: {
        dealerId:'',
        brand:'',
        pageNo: 1,
        pageSize: 20,
      },
      // 总数
      total: 0,
      // 表格
      tableData: [],
      brandlist:{
        cur: {
          val: "",
          name: "所有品牌"
        },
       data: [
         {
          val: "",
          name: "所有品牌"
        },
       ]
      },
      itemlist: {
        cur: {
          val: "",
          name: ""
        },
       data: []
      },
    }
  },
  components: {
    Dropdown
  },
  methods: {
      // 获取账户余额和限额
    async getCount () {
      const { data: res } = await this.$http.post('/dealer/getProfit')
      this.sole = res.sole * 100
      this.single = res.single * 100
      this.discount = res.discount * 10
      this.fpNum = res.fpNum
    },
    async getAllDealer () {
      const { data: res } = await this.$http.post('/dealer/getAllDealer')
      this.itemlist.cur.val=res[0].id
      this.itemlist.cur.name=res[0].name4s
      this.getBrand(res[0].id)
      res.forEach(item => {
          var itemData = {}
          itemData.val=item.id
          itemData.name=item.name4s
          this.itemlist.data.push(itemData)
        })
      this.formInline.dealerId = res[0].id
          // 获取特卖列表
      this.getExtensionList()
    },
    async getBrand (id) {
        const { data: res } = await this.$http.post('/dealer/oneDealerBrand', {
          id: id
        })
        
        res.forEach(item => {
          var itemData = {}
          itemData.val=item.trim()
          itemData.name=item.trim()
          this.brandlist.data.push(itemData)
        })

    },
    // 修改每日限额
    updateProfitOne () {
      this.$prompt('独家线索利润率', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/dealer/updateProfit', {
          sole: value/100
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    updateProfitTwo () {
      this.$prompt('单条线索利润率', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/dealer/updateProfit', {
          single: value/100
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    updateProfitMore () {
      this.$prompt('多家线索折扣', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/dealer/updateProfit', {
          discount: value/10
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    updateProfitCount () {
      this.$prompt('单条线索最多可分配', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).catch(() => {
        console.log('取消')
      }).then(async ({ value }) => {
        const res = await this.$http.post('/dealer/updateProfit', {
          fpNum: value
        })
        if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
        this.$message.success('修改成功')
        this.getCount()
      })
    },
    dropDownClick (e) {
      this.$refs.multipleTable.clearSelection(); 
      this.formInline.dealerId = e.val
      this.brandlist.cur.name ="所有品牌";
      this.brandlist.cur.val ="";
      var count =  this.brandlist.data.length
      if(count>1){
         this.brandlist.data.splice(1, count-1) 
      }
      this.getBrand(e.val);
    },
    dropDownBrand (e) {
      console.log(e.name, e.val)
      this.formInline.brand = e.val
    },
    // 监听复选框
    changeFun (val) {
      this.checkBoxData = val
    },
    // 获取经销商列表
    async getExtensionList() { 
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
    clearSelect () {
     this.$refs.multipleTable.clearSelection(); 
    },
    async creatPlan () {
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

      const { data: res } = await this.$http.post('/extension/addSinglePlan', {
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
  },
  computed: {},
  created() {
    // 获取账户余额和限额
    this.getCount()
    this.getAllDealer ()
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
  .left2 {

      margin: 20px;
    
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
