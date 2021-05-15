<template>
  <div>
    <!-- 头部标题 -->
    <h3>特卖咨询</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="品牌">
          <el-select @visible-change="dropDownBrand($event)" v-model="formInline.brand" placeholder="请选择品牌" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系列">
          <el-select :disabled="disabled" @visible-change="dropDownSeries($event)" v-model="formInline.series" placeholder="请选择系列" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="(item,index) in seriesAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询时间">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格展示 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData" border 
      style="width: 100%">
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="name" label="用户姓名" width="180"></el-table-column>
      <el-table-column prop="consultDate" label="咨询时间" width="160"></el-table-column>
      <el-table-column prop="origin" label="来源"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="fpUser" label="销售顾问"></el-table-column>
      <el-table-column prop="brand" label="品牌" width="180"></el-table-column>
      <el-table-column prop="series" label="系列" width="220"></el-table-column>
      <el-table-column label="操作" width="80" v-if="level === 5">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">分配</el-button>
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
    <!-- 分配信息给销售顾问 -->
    <el-dialog title="分配" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="radio">
        <el-radio v-for="item in xiaoshouAry" :key="item.id" :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogRadio">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pickerOptions, dateConversion } from '../../assets/js/timer'
export default {
  data () {
    return {
      // 用户等级
      level: 0,
      // 时间快捷键
      pickerOptions: pickerOptions,
      time: [],
      // 表单
      formInline: {
        brand: '',
        series: '',
        consultDateS: '',
        consultDateE: '',
        pageSize: 15,
        pageNo: 1
      },
      brandAry: [],
      seriesAry: [],
      // 表格
      tableData: [],
      total: 0,
      // 对话框
      dialogFormVisible: false,
      xiaoshouAry: [], // 销售顾问数组
      row: {},
      radio: '' // 被选择的销售顾问
    }
  },
  computed: {
    disabled () {
      if (this.formInline.brand !== '') {
        return false
      }
      return true
    }
  },
  methods: {
    // 获取用户咨询列表
    async getList () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.consultDateS = dateConversion(this.time[0])
      this.formInline.consultDateE = dateConversion(this.time[1])
      const { data: res} = await this.$http.post('/sale/saleTableList', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showAddSaleBrand', {
          token: window.sessionStorage.getItem('token')
        })
        this.brandAry = res
      }
    },
    // 系列
    async dropDownSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showSaleSeries', {
          brand: this.formInline.brand
        })
        this.seriesAry = res
      }
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getList()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getList()
    },
    // 获取用户等级
    async getLevel () {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    // 分配
    async handleEdit(row) {
      const { data: res } = await this.$http.post('/dealer/xsgw')
      this.xiaoshouAry = res
      this.row = row
      this.radio = row.fpUserId
      this.dialogFormVisible = true
    },
    // 确认分配
    async dialogRadio () {
      const res = await this.$http.post('/sale/fp', {
        userId: this.radio,
        clueId: this.row.id
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('分配失败')
      this.$message.success('分配成功')
      this.radio = ''
      this.dialogFormVisible = false
      this.getList()
    }
  },
  created () {
    // 获取用户咨询列表
    this.getList()
    // 等级
    this.getLevel()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
// 表格
.el-table {
  margin: 20px 0;
}
// 分页
.el-pagination {
  text-align: center;
}
</style>
