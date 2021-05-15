<template>
  <div>
    <header>
      <h3>重点号入驻审核</h3>
      <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="85px" class="demo-ruleForm">
        <el-form-item label="重点号名称">
          <el-input style="width: 200px" size="mini" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select size="mini" v-model="ruleForm.type" placeholder="请选择重点号类型">
            <el-option label="不限" value=""></el-option>
            <el-option label="个人" value="个人"></el-option>
            <el-option label="企业" value="企业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="mini" v-model="ruleForm.state" placeholder="请选择重点号状态">
            <el-option label="不限" value=""></el-option>
            <el-option label="已通过" value="已通过"></el-option>
            <el-option label="未审核" value="未审核"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" size="mini" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
        :cell-style="{ 'text-align': 'center' }"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="重点号名称"
          width="180">
        </el-table-column>
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.headPic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="worksNum"
          label="作品数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fansNum"
          label="粉丝数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="joinDate"
          label="加入时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">审核</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="changePage"
        hide-on-single-page
        :current-page="this.ruleForm.pageNo"
        :page-size="this.ruleForm.pageSize"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </main>
    <!-- 审核对话框 -->
    <el-dialog title="重点号审核" :visible.sync="dialogFormVisible">
      <ul>
        <li>
          <label>重点号名称</label>
          <span>{{this.form.name}}</span>
        </li>
        <li>
          <label>重点号简介</label>
          <span>{{this.form.intro}}</span>
        </li>
        <li>
          <label>重点号头像</label>
          <span>
            <img style="width: 200px; height: 200px" :src="this.form.headPic" alt="">
          </span>
        </li>
        <li v-if="this.form.type === '企业'">
          <label>机构名称</label>
          <span>{{this.form.organizationName}}</span>
        </li>
        <li v-if="this.form.type === '企业'">
          <label>机构代码</label>
          <span>{{this.form.organizationCode}}</span>
        </li>
        <li v-if="this.form.type === '企业'">
          <label>机构代码证</label>
          <span>
            <img style="width: 150px; height: 200px" :src="this.form.organizationCodeZ" alt="">
          </span>
        </li>
        <li>
          <label>运营者姓名</label>
          <span>{{this.form.yname}}</span>
        </li>
        <li>
          <label>居民身份证号</label>
          <span>{{this.form.number}}</span>
        </li>
        <li>
          <label>证件照(正)</label>
          <span>
            <img style="width: 300px; height: 200px" :src="this.form.photoz" alt="">
          </span>
        </li>
        <li>
          <label>证件照(反)</label>
          <span>
            <img style="width: 300px; height: 200px" :src="this.form.photof" alt="">
          </span>
        </li>
        <li>
          <label>所在城市</label>
          <span>{{this.form.province}} - {{this.form.city}}</span>
        </li>
        <li>
          <label>联系人电话</label>
          <span>{{this.form.phone}}</span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle('已通过')">通过审核</el-button>
        <el-button type="danger" @click="handle('未通过')">拒绝通过</el-button>
      </div>
      <el-input style="width: 100%" v-model="cause" type="textarea" placeholder="请输入拒绝原因"></el-input>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单项
      ruleForm: {
        name: '',
        state: '',
        type: '',
        pageSize: 15,
        pageNo: 1
      },
      // 表格
      tableData: [],
      total: 0,
      // 审核
      dialogFormVisible: false,
      form: {},
      cause: '' // 拒绝原因
    }
  },
  created () {
    // 获取数据
    this.getTable()
  },
  methods: {
    // 获取数据
    async getTable () {
      const { data: res } = await this.$http.post('/key/keyList', this.ruleForm)
      this.tableData = res.l
      this.total = res.num
    },
    // 查询数据
    submit () {
      this.ruleForm.pageNo = 1
      this.getTable()
    },
    // 改变分页
    changePage (index) {
      this.ruleForm.pageNo = index
      this.getTable()
    },
    // 审核对话框
    handleEdit (row) {
      this.dialogFormVisible = true
      this.form = row
    },
    // 是否通过
    async handle (index) {
      if (index === '未通过' && this.cause.trim().length === 0) return this.$message.error('请输入拒绝原因')
      const res = await this.$http.post('/key/sh', {
        id: this.form.id,
        state: index,
        cause: this.cause
      })
      if (res.status !== 200 || res.data !== true) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.cause = ''
      this.dialogFormVisible = false
      this.getTable()
    },
    // 删除
    handleDelete (row) {}
  }
}
</script>

<style lang="less" scoped>
header {
  margin-bottom: 15px;
  h3 {
    margin-bottom: 15px;
  }
  .el-form {
    box-sizing: border-box;
    padding-top: 10px;
    background-color: #fff;
    height: 60px;
  }
}

main {
  .el-table {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  ul {
    li {
      margin-bottom: 30px;
      label {
        font-weight: 700;
        display: inline-block;
        width: 120px;
      }
      img {
        vertical-align: middle;
      }
    }
  }
}
</style>
