<template>
  <div>
    <h3>线索设置</h3>
    <!-- 账号余额 -->
    <div class="ClueSet">
        <div class="clue">
        <span class="demo">线索自动分配</span>
        <el-switch class="demo" v-model="isOwn"
          active-text="开启"
          active-value="1"
          inactive-text="关闭"
          inactive-value="0"
          @change="changeSwitch()">
        </el-switch>

        <span v-if="averageVisible" class="demo">平均分配线索</span>
        <el-switch v-if="averageVisible" class="demo" v-model="isAverage"
          active-text="是"
          active-value="1"
          inactive-text="否"
          inactive-value="0"
          @change="changeAverageSwitch()">
        </el-switch>
     
        </div>
    </div>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column  prop="id" label="编号" width="100"></el-table-column>
      <el-table-column  prop="name" label="员工姓名" width="200"> </el-table-column>
      <el-table-column  prop="phone" label="手机号"  width="150"> </el-table-column>
      <el-table-column  prop="role"  label="职位" > </el-table-column>
      <el-table-column  prop="chance"  label="线索分配比例" >
        <template slot-scope="scope">
          <span v-if="isOwn==='0'" style="color: green">手动分配</span>
          <span v-else-if="isAverage==='1'" style="color: green">平均分配</span>
          <span v-else-if="scope.row.chance===null" >待设置</span>
          <span v-else >{{scope.row.chance+'/'+ scope.row.allChance}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isAverage==='0' && isOwn==='1'" label="操作" width="180"> 
          <template slot-scope="scope">
          <el-button  size="mini"  type="primary"  @click="handleEdit(scope.row)">比例设置</el-button>
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
    <el-dialog title="线索分配比例设置" :visible.sync="dialogVisible">
        <el-input v-model="txtClue" style="width: 100%" placeholder="请填写比例(100以内的数字)"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitChance()">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //是否自动
      isOwn: '0',
      //是否平均分配
      isAverage: '1',
      averageVisible:false,
      dialogVisible:false,
      txtClue:'',
      userId:'',
      // 总数
      total: 0,
      // 表格
      tableData: [],
      // 搜索条件
      formInline: {
        pageNo: 1,
        pageSize: 20
      },
    }
  },
  methods: {

    // 获取员工列表
    async getUserList () {
      const { data: res } = await this.$http.post('/user/showUserByClue')
      this.tableData = res
      this.total = res.length
    },
    // 获取员工列表
    async getUserState () {
      const { data: res } = await this.$http.post('/user/getIs')
      this.isOwn = res.isOwn
      this.isAverage = res.isAverage
      if (this.isOwn==='1') {
        this.averageVisible = true
      } else {
        this.averageVisible = false
      }
     },
    // 编辑
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.getUserList()
    },
    async changeSwitch () {
        if(this.isOwn==='0'){
            this.averageVisible = false
        }else{
            this.isAverage = '1'
            this.averageVisible = true
        }
        const { data: res } = await this.$http.post('/user/updateIs',{
            isOwn:this.isOwn,
            isAverage:this.isAverage,
        })
    },
    async changeAverageSwitch () {
      const { data: res } = await this.$http.post('/user/updateIs',{
            isOwn:this.isOwn,
            isAverage:this.isAverage,
        })
    },
    handleEdit (row) {
        this.txtClue = ''
        this.dialogVisible = true
        this.userId = row.id
    },
    async submitChance () {
      if (this.txtClue ===''){
        this.$message.success('请输入100以内的数字')
        return
      }
      const { data: res } = await this.$http.post('/user/updateChance',{
            chance:parseInt(this.txtClue),
            userId:this.userId
      })
      if (res) {
        this.dialogVisible = false
        this.$message.success('设置成功')
        this.getUserList()
      } else {
        this.dialogVisible = false
        this.$message.success('设置失败')
      }    
    }
  },
  computed: {},
  created() {
    this.getUserList()
    this.getUserState()
  },
  mounted() {},
}
</script>


<style >
.ClueSet {
    background-color: #fff;
    height: 50px;
    border: 1px solid #ccc;
    padding: 0 20px;
    margin-top: 20px;
    margin-bottom: 30px;
}
.clue {
    line-height: 50px;
}
.demo{
    margin-left: 15px;
}
.demo .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /*打开时文字位置设置*/
  .demo .el-switch__label--right {
    z-index: 1;
   right: -3px;
 }
 /*关闭时文字位置设置*/
 .demo .el-switch__label--left {
   z-index: 1;
   left: 19px;
 }
 /*显示文字*/
 .demo .el-switch__label.is-active {
   display: block;
 }
 .demo.el-switch .el-switch__core,
 .el-switch .el-switch__label {
   width: 50px !important;
 }
</style>
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
