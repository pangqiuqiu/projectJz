<template>
  <div>
    <h3>焦点资讯</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input style="width: 300px;" v-model="formInline.title" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="资讯位置">
          <el-select v-model="formInline.home" placeholder="查看焦点图位置" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="首页焦点图" value="焦点图"></el-option>
            <el-option label="首页焦点标题" value="焦点资讯"></el-option>
            <el-option label="首页图片资讯1" value="首页图片资讯1"></el-option>
            <el-option label="首页图片资讯2-7" value="首页图片资讯2-7"></el-option>
            <el-option label="首页标题资讯" value="首页标题资讯"></el-option>
            <el-option label="导购轮播图" value="导购"></el-option>
            <el-option label="车讯轮播图" value="车讯"></el-option>
            <el-option label="技术轮播图" value="技术"></el-option>
            <el-option label="行业文化轮播图" value="行业文化"></el-option>
            <el-option label="试驾评测轮播图" value="试驾评测"></el-option>
            <el-option label="重点号首页轮播图" value="重点号首页轮播图"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="110">
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <span @click="title(scope.row.id)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="home"
        label="焦点图位置"
        width="180">
      </el-table-column>
      <el-table-column
        prop="issueDate"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">修改</el-button>
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
      :total="total">
    </el-pagination>
    <!-- 修改位置 -->
    <el-dialog title="修改资讯位置" :visible.sync="dialogFormVisible" :info="msg">
      <el-radio-group v-model="radio">
        <el-radio label="焦点图"></el-radio>
        <el-radio label="焦点资讯"></el-radio>
        <el-radio label="首页图片资讯1"></el-radio>
        <el-radio label="首页图片资讯2-7"></el-radio>
        <el-radio label="首页标题资讯"></el-radio>
        <el-radio label="导购"></el-radio>
        <el-radio label="车讯"></el-radio>
        <el-radio label="技术"></el-radio>
        <el-radio label="行业文化"></el-radio>
        <el-radio label="试驾评测"></el-radio>
        <el-radio label="普通资讯"></el-radio>
        <el-radio label="重点号首页轮播图" v-show="this.flag"></el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edtionInfo">确 定</el-button>
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
      // 搜索条件
      time: [],
      formInline: {
        home: '',
        issueDateS: '',
        issueDateE: '',
        title: '',
        pageSize: 15,
        pageNo: 1
      },
      // 表格
      tableData: [],
      total: 0,
      // 弹框
      dialogFormVisible: false,
      msg: '',
      radio: '',
      flag: '', // 如果是重点号资讯，才显示这一项
    }
  },
  methods: {
    // 获取焦点资讯
    async getToday () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.issueDateS = dateConversion(this.time[0])
      this.formInline.issueDateE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/Infor/jd', this.formInline)
      this.tableData = res.l
      this.total = res. num
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getToday()
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getToday()
    },
    // 查看详情
    handleEdit (row) {
      this.$router.push({
        path: '/information/inforDetails',
        query: { id: row.id }
      })
    },
    // 修改
    handleDelete (row) {
      this.msg = row.id
      this.radio = row.home
      if (row.type === '重点号资讯') {
        this.flag = true
      } else {
        this.flag = false
      }
      // if (row.home === '1') {
      //   this.radio = '首页资讯'
      // } else {
      //   this.radio = row.home
      // }
      this.dialogFormVisible = true
    },
    async edtionInfo () {
      // if (this.radio === '普通资讯') {
      //   this.radio = '0'
      // } else if (this.radio === '首页资讯') {
      //   this.radio = '1'
      // }
      const { data: res } = await this.$http.post('/Infor/updateHome', {
        id: this.msg,
        home: this.radio
      })
      if (res !== true) {
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
      this.dialogFormVisible = false
      this.submit()
    },
    // 表格操作按钮
    title (id) { // 标题
      window.open(`https://zhongdianqiche.com/car/#/automotivelnformation/details?id=${id}`)
      // window.open(`http://localhost:8080/#/automotivelnformation/details?id=${id}`)
    }
  },
  created () {
    // 获取焦点资讯
    this.getToday()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 15px;
}
span {
  cursor: pointer;
}
.el-card {
  margin: 15px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-radio {
  margin-bottom: 20px;
}
</style>
