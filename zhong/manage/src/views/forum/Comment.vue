<template>
  <div>
    <!-- 面包屑 -->
    <h2>评论列表</h2>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户">
          <el-input size="mini" @input="ggg" v-model="formInline.userId" placeholder="输入评论人ID"></el-input>
        </el-form-item>
        <el-form-item label="回帖时间">
          <div class="block">
            <el-date-picker @change="ggg" size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <template>
      <el-table
        :default-sort = "{prop: 'issueDate', order: 'descending'}"
        :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
        :cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="评论人ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="invitation"
          label="帖子标题">
        </el-table-column>
        <el-table-column
          sortable
          prop="replyDate"
          label="回帖时间"
          width="180">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">审核</el-button>
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
    <!-- 对话框 -->
    <el-dialog title="评论审核" :visible.sync="dialogFormVisible" :info="msg">
      <h2>{{this.msg}}</h2>
      <div v-html="this.commentObj.reply"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="deleteBtn">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pickerOptions, dateConversion } from '../../assets/js/timer.js'
export default {
  data () {
    return {
      // 时间快捷键
      pickerOptions: pickerOptions,
      time: [],
      // 搜索条件
      formInline: {
        token: window.sessionStorage.getItem('token'),
        replyDateS: '',
        replyDateE: '',
        userId: '',
        invitId: '', // 从帖子页跳转过来
        pageNo: 1,
        pageSize: 20
      },
      // 总数
      total: 0,
      // 表格
      tableData: [],
      // 对话框
      dialogFormVisible: false,
      commentObj: {},
      msg: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 获取评论列表
    async getCommentList () {
      if (this.time === null) {
        this.time = []
      }
      const id = this.$route.query.id
      this.formInline.replyDateS = dateConversion(this.time[0])
      this.formInline.replyDateE = dateConversion(this.time[1])
      this.formInline.invitId = id
      const { data: res } = await this.$http.post('/invit/showReply', this.formInline)
      // console.log(res)
      this.tableData = res.l
      this.total = res.num
    },
    ggg (index) {
      if (index !== undefined) {
        this.formInline.pageNo = 1
      }
    },
    // 查询
    async submit () {
      this.ggg()
      if (this.time === null) {
        this.time = []
      }
      this.formInline.replyDateS = dateConversion(this.time[0])
      this.formInline.replyDateE = dateConversion(this.time[1])
      this.formInline.invitId = ''
      const { data: res } = await this.$http.post('/invit/showReply', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.submit()
    },
    // 审核
    async handleDelete (row) {
      // console.log(row.id)
      this.msg = row.invitation
      const { data: res } = await this.$http.post('/invit/getReply', {
        id: row.id
      })
      // console.log(res)
      this.commentObj = res
      this.dialogFormVisible = true
    },
    // 删除评论
    async deleteBtn () {
      const res = await this.$http.post('/invit/delReply', {
        id: this.commentObj.id
      })
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.dialogFormVisible = false
      this.submit()
    }
  },
  created () {
    // 获取评论列表
    this.getCommentList()
  }
}
</script>

<style lang="less">
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
// 对话框
.el-dialog {
  div {
    width: 92%;
  }
  .el-input {
    width: 92%;
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    .el-button {
      width: 100px;
    }
  }
}
</style>
