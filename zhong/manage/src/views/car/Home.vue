<template>
  <div>
    <h3>车辆列表</h3>
    <!-- 新增 -->
    <el-button size="small" @click="add" type="primary" style="margin-top: 15px">新增车辆</el-button>
    <!-- 新增对话框 -->
    <el-dialog title="新增车辆" :visible.sync="addCar">
      <el-radio-group v-model="radio">
        <el-radio :label="1">新增品牌</el-radio>
        <el-radio :label="2">新增车系</el-radio>
        <el-radio :label="3">新增车型</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCar = false">取 消</el-button>
        <el-button type="primary" @click="addCarSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="品牌">
          <el-select filterable  v-model="formInline.brand" placeholder="请选择品牌" size="mini" @change="changeBrand">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="item in brandList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车系">
          <el-select filterable @visible-change="dropDown($event)" v-model="formInline.series" placeholder="请选择车系" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="item in seriesList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column
        prop="brand"
        label="品牌"
        width="400">
      </el-table-column>
      <el-table-column
        prop="series"
        label="车系">
      </el-table-column>
      <el-table-column
        prop="cluePrice"
        label="品牌线索价格">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">车型</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleModify(scope.row)">修改线索价格</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看车型 -->
    <el-dialog width="60%" title="车型展示" :visible.sync="dialogTableVisible">
      <el-table :data="typeList" border :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
        <el-table-column property="c" label="车型"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleType(scope.row)">参数配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 新增对话框
      radio: 3,
      addCar: false,
      brandList: [],
      seriesList: [],
      tableData: [],
      formInline: {
        brand: '',
        series: '',
        pageSize: 20,
        pageNo: 1
      },
      total: 0,
      // 车型展示弹框
      dialogTableVisible: false,
      typeList: []
    }
  },
  methods: {
    // 获取表格信息
    async getTable () {
      const { data: res } = await this.$http.post('/car/showBrandSeries', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    // 车系
    async dropDown (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/showSeries', {
          brand: this.formInline.brand
        })
        this.seriesList = res
      }
    },
    changeBrand () {
      this.formInline.series = ''
    },
    // 新增车辆
    add () {
      this.addCar = true
    },
    addCarSubmit () {
      this.addCar = false
      this.$router.push({
        path: '/car/add',
        query: { id: this.radio }
      })
    },
    // 查询
    onSubmit () {
      this.formInline.pageNo = 1
      this.getTable()
    },
    // 分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getTable()
    },
    // 车型展示
    async handleEdit (row) {
      const { data: res } = await this.$http.post('/car/getC', {
        series: row.series
      })
      this.typeList = res
      this.dialogTableVisible = true
    },
    // 跳转参数配置页面
    handleType (row) {
      this.$router.push({
        path: '/car/parameter',
        query: { id: row.c }
      })
    },
    // 修改价格
    async handleModify (row) {
      const { value } = await this.$prompt('请输入修改后的价格', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      const { data: res } = await this.$http.post('/car/updatePrice', {
        brand: row.brand,
        cluePrice: value
      })
      if (!res) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.getTable()
    }
  },
  created () {
    // 获取表格信息
    this.getTable()
    // 获取品牌数据
    this.getBrand()
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin: 15px 0;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
// 分页
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
