<template>
  <div>
    <!-- 面包屑 -->
    <div class="HeadTitle">
      <h2>合同列表</h2>
      <el-button size="small" style="margin-top:7px;margin-bottom: 7px;" type="primary" class="addInformation" @click="addContract" >新建合同</el-button>
    </div>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item v-if="level === 2" label="经销商名称">
          <el-input v-model="formInline.dealerName" placeholder="经销商名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select @change="ggg" v-model="formInline.type" placeholder="请选择合同类型" size="mini">
            <el-option label="充值" value="充值"></el-option>
            <el-option label="软件使用" value="软件使用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同创建时间">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
      <el-table-column v-if="level === 2" prop="dealerName" label="经销商名称" ></el-table-column>
      <el-table-column prop="type" label="合同类型" ></el-table-column>
      <el-table-column prop="edition" label="版本" ></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="contacts" label="联系人"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="address" label="联系地址"></el-table-column>
      <el-table-column prop="startDate" label="合同开始时间"></el-table-column>
      <el-table-column prop="endDate" label="合同结束时间"></el-table-column>
      <el-table-column prop="payDate" label="预计付款时间"></el-table-column>
      <el-table-column v-if="level != 2" prop="createDate" label="合同创建时间"></el-table-column>
      <el-table-column prop="contractState" label="合同状态"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">详情</el-button>
          <el-button v-if="scope.row.contractState === '正在执行'" size="mini" type="success" @click="lookEdit(scope.row)">预览</el-button>
          <el-button v-if="scope.row.contractState === '待审核'" size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          <el-button v-if="level === 2 && scope.row.contractState === '待审核'" size="mini" type="warning" @click="agreen(scope.row)">审核</el-button>
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
    <el-dialog title="合同审核" :visible.sync="dialogFormVisible">
      <li style="margin-bottom: 20px; color: red;">只有已经付款的前提下，才需要选择合同开始及结束时间，以及修改状态为正在执行</li>
      <el-form :model="form">
        <el-form-item label="合同时间：" >
          <div class="block">
            <el-date-picker size="mini" v-model="contractTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="合同状态：" >
           <el-select v-model="form.contractState" placeholder="请选择合同状态" size="mini">
            <el-option label="已拒绝" value="已拒绝"></el-option>
            <el-option label="正在执行" value="正在执行"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitState()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pickerOptions, dateConversion } from '../../assets/js/timer'
export default {
  data() {
    return {
      // 当前人等级
      level: 0,
      // 时间快捷键
      pickerOptions: pickerOptions,
      time: [],
      contractTime:[],
      // 搜索条件
      formInline: {
        createDateS:'',
        createDateE:'',
        type: '',
        dealerName: '',
        //token:'',
        pageNo: 1,
        pageSize: 20,
      },
      form:{
        id:'',
        contractState:'',
        startDate:'',
        endDate:''
      },
      dialogFormVisible:false,
      // 总数
      total: 0,
      // 表格
      tableData: [],
    }
  },
  methods: {
    // 获取经销商列表
    async getContractList() {
      if (this.time === null || this.time.length===0 ) {
        this.time = []
      }else{
        this.formInline.createDateS = dateConversion(this.time[0])
        this.formInline.createDateE = dateConversion(this.time[1])
      }      
      //this.formInline.token = window.sessionStorage.getItem('token')
      const { data: res } = await this.$http.post('/contract/showContract',this.formInline)
      this.tableData = res.l
      this.total = this.tableData.length
    },
    addContract() {
      this.$router.push(`/contract/ContractDetail?id=${-1}`)
    },
    handleEdit (row) {
        this.$router.push(`/contract/ContractDetail?id=${row.id}`)
    },
    lookEdit (row) {
      window.open(row.url,"_blank");
      return false;
    },
    async del (row) {
      const { data: res } = await this.$http.post('/contract/del',{
        id: row.id
      })
      if (res) {
        this.$message.success('删除成功')
        this.submit ()
      } else {
        this.$message.success('删除失败')
      }
    },
    agreen (row) {
      this.dialogFormVisible = true
      this.form.id = row.id
    },
    async submitState () {
       if (this.contractTime === null && this.contractTime.length === 0 ) {
        this.contractTime = []
      }else{
        this.form.startDate = dateConversion(this.contractTime[0])
        this.form.endDate = dateConversion(this.contractTime[1])
      } 
      const { data: res } = await this.$http.post('/contract/examine',this.form)
      if (res) {
        this.$message.success('审核成功')
        this.submit ()
      } else {
        this.$message.success('审核失败')
      }
      this.dialogFormVisible = false
    },
    // 获取当前登陆人的等级
    async getLevel() {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    // // 查询
    ggg (index) {
      if (index !== undefined) {
        this.formInline.pageNo = 1
      }
    },
    submit () {
      this.formInline.pageNo = 1
      this.getContractList()
    },
    // 编辑
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.getContractList()
    },
  },
  computed: {},
  created() {
    // 获取特卖列表
    this.getContractList()
    // 等级
    this.getLevel()
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
