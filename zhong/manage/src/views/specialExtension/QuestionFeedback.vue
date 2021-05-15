<template>
  <div>
    <h2>问题反馈列表</h2>
    <!-- 搜索区域 -->
     <el-card v-if="level===2" body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="问题状态">
          <el-select @change="ggg" v-model="formInline.isAnswer" placeholder="请选择问题状态" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="未答复" value="0"></el-option>
            <el-option label="已答复" value="1"></el-option>
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
    <el-button v-if="level===5" size="mini" type="primary" @click="creatProblem" style="margin-top: 15px;margin-bottom: 15px;">新建问题</el-button>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column v-if="level===2" prop="dealerName" label="店铺名称"></el-table-column>
      <el-table-column prop="problem" label="问题" ></el-table-column>
      <el-table-column prop="answer" label="答复" ></el-table-column>
      <el-table-column prop="problemDate" label="提出时间" ></el-table-column>
      <el-table-column prop="answerDate" label="答复时间" ></el-table-column>
      <el-table-column v-if="level===2" label="操作">
        <template slot-scope="scope">
          <el-button  size="mini" type="primary" @click="creatAnswer(scope.row)">答复</el-button>
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
    <el-dialog title="问题反馈" :visible.sync="dialogProblemVisible">
        <el-input v-model="txtproblem" style="width: 100%" placeholder="请填写问题"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogProblemVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitProblem()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="问题答复" :visible.sync="dialogAnswerVisible">
        <el-input v-model="txtanswer" style="width: 100%"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAnswerVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitAnswer()">确 定</el-button>
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
      // 搜索条件
      formInline: {
        isAnswer:'',
        dealerName:'',
        pageNo: 1,
        pageSize: 20,
      },
      // 总数
      total: 0,
      // 表格
      tableData: [],
      dialogProblemVisible: false,
      dialogAnswerVisible: false,
      txtproblem:'',
      txtanswer:'',
      id:''
    }
  },
  methods: {
    // 获取经销商列表
    async getExtensionList() { 
      const { data: res } = await this.$http.post('/extension/problemList',this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    submit () {

      this.formInline.pageNo = 1

      this.getExtensionList()
    },
    // 切换页数
    changePage(index) {
      this.formInline.pageNo = index
      this.getExtensionList()
    },
    ggg (index) {
      if (index !== undefined) {
        this.formInline.pageNo = 1
      }
    },
    // 获取当前登陆人的等级
    async getLevel() {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    async creatProblem () {
        this.dialogProblemVisible = true;
    },
    async creatAnswer (row) {
        this.dialogAnswerVisible = true;
        this.id = row.id;
    },
    async submitProblem() {
        const { data: res } = await this.$http.post('/extension/problem', {
            problem:this.txtproblem
        })
        if(res){
          this.$message.success('提交成功')
          this.dialogProblemVisible = false;
          this.formInline.pageNo = 1
          this.getExtensionList()
        }else{
          this.$message.success('提交失败')
        }
    },
    async submitAnswer() {
        const { data: res } = await this.$http.post('/extension/answer', {
            id: this.id,
            answer:this.txtanswer
        })
        if(res){
          this.$message.success('提交成功')
          this.dialogAnswerVisible = false;
          this.formInline.pageNo = 1
          this.getExtensionList()
        }else{
          this.$message.success('提交失败')
        }
    },
  },
  computed: {},
  created() {
    // 获取特卖列表
    this.getExtensionList()
    // 等级
    this.getLevel()
  },
  mounted() {},
}
</script>

<style lang="less" scoped>

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
