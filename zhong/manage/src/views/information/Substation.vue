<template>
  <div>
    <h3>分站资讯</h3>
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
          <el-select v-model="formInline.subHome" placeholder="查看焦点图位置" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="分站焦点图" value="分站焦点图"></el-option>
            <el-option label="分站焦点资讯" value="分站焦点资讯"></el-option>
            <el-option label="商家促销" value="商家促销"></el-option>
            <el-option label="行情优惠" value="行情优惠"></el-option>
            <el-option label="商家动态" value="商家动态"></el-option>
            <el-option label="普通资讯" value="普通资讯"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" v-if="level === 4">
          <el-select v-model="formInline.city" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in cityAry" :key="item" :label="item" :value="item"></el-option>
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
        prop="subHome"
        label="资讯位置"
        width="150">
      </el-table-column>
      <el-table-column
        prop="issueDate"
        label="发布时间"
        width="160">
      </el-table-column>
      <el-table-column label="操作" width="150">
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
    <el-dialog title="修改资讯位置" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="radio">
        <el-radio label="分站焦点图"></el-radio>
        <el-radio label="分站焦点资讯"></el-radio>
        <el-radio label="商家促销" :disabled="business"></el-radio>
        <el-radio label="行情优惠" :disabled="discount"></el-radio>
        <el-radio label="商家动态" :disabled="dynamic"></el-radio>
        <el-radio label="普通资讯"></el-radio>
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
      // 城市
      cityAry: [],
      // 获取等级
      level: 0,
      // 搜索条件
      time: [],
      formInline: {
        subHome: '',
        issueDateS: '',
        issueDateE: '',
        title: '',
        city: '',
        pageSize: 20,
        pageNo: 1
      },
      // 表格
      tableData: [],
      total: 0,
      // 弹框
      dialogFormVisible: false,
      row: {},
      radio: '',
      // 单选框状态
      business: false,
      discount: false,
      dynamic: false
    }
  },
  methods: {
    // 获取分站资讯
    async getToday () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.issueDateS = dateConversion(this.time[0])
      this.formInline.issueDateE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/Infor/subInfor', this.formInline)
      this.tableData = res.l
      this.total = res. num
    },
    // 城市
    async getCity () {
      const { data: res } = await this.$http.post('/Infor/subCity')
      this.cityAry = res
    },
    // 获取登陆等级
    async getLevel () {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
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
      this.row = row
      this.radio  = row.subHome
      // 判断单选框显示哪些选项
      switch(row.type) {
        case '店铺活动':
          this.business = true
          this.discount = true
          this.dynamic = false
          break
        case '团购活动':
          this.business = false
          this.discount = false
          this.dynamic = true
          break
        case '品牌新闻':
          this.business = false
          this.discount = false
          this.dynamic = false
          break
      }
      this.dialogFormVisible = true
    },
    // 提交修改
    async edtionInfo () {
      const res = await this.$http.post('/Infor/updateSubHome', {
        subHome: this.radio,
        id: this.row.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.dialogFormVisible = false
      this.getToday()
    },
    // 表格操作按钮
    title (id) { // 标题
      window.open(`https://zhongdianqiche.com/car/#/automotivelnformation/details?id=${id}`)
    }
  },
  created () {
    // 获取焦点资讯
    this.getToday()
    // 城市
    this.getCity()
    // 等级
    this.getLevel()
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
