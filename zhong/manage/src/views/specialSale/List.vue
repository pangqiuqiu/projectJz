<template>
  <div>
    <!-- 面包屑 -->
    <h2>特卖列表</h2>
    <!-- 新建资讯 -->
    <el-button size="small" type="primary" class="addInformation" @click="add">新建特卖</el-button>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select @change="changeP" @visible-change="dropDownProvince($event)" v-model="formInline.province" placeholder="请选择省份" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.area" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车系">
          <el-select :disabled="disabledSeries" v-model="formInline.series" placeholder="请选择车系" @visible-change="dropDownSeries($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="(item,index) in seriesAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="品牌"
        width="180">
      </el-table-column>
      <el-table-column
        prop="series"
        label="车系"
        width="190">
      </el-table-column>
      <el-table-column
        prop="dealer"
        label="发布经销商"
        >
      </el-table-column>
      <el-table-column
        prop="home"
        label="是否在首页"
        width="130">
        <template slot-scope="scope">
          <span v-show="scope.row.home === 0">否</span>
          <span v-show="scope.row.home === 1">是</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="推广状态"
        width="130">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleExtension(scope.row)">{{scope.row.state === '开启'?'关闭':'开启'}}</el-button>
          <el-button
            v-if="scope.row.bol === 1"
            size="mini"
            type="success"
            @click="handleEdit(scope.row)">
            <span v-show="scope.row.home === 1" style="color: red">下首页</span>
            <span v-show="scope.row.home === 0">上首页</span>
            </el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog :info='msg' title="选择推广的车系" :visible.sync="dialogFormVisible">
      <h2 style="color: red;">每个品牌只能推广一次，请谨慎选择推广的车系</h2>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="(item,index) in list" :key="index" :label="item"></el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogCheck">确 定</el-button>
      </div>
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
      // 对话框
      dialogFormVisible: false,
      msg: '',
      formLabelWidth: '120px',
      checkList: [], // 选中的
      list: [],
      // 搜索条件
      formInline: {
        province: '',
        area: '',
        brand: '',
        series: '',
        token: window.sessionStorage.getItem('token'),
        pageNo: 1,
        pageSize: 20
      },
      // 总数
      total: 0,
      // 省份
      provinceAry: [],
      // 城市
      cityAry: [],
      // 品牌
      brandAry: [],
      // 车系
      seriesAry: [],
      // 表格
      tableData: []
    }
  },
  methods: {
    // 获取特卖列表
    async getSpecialSale () {
      const { data: res } = await this.$http.post('/sale/showSale', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 新增特卖
    add () {
      this.$router.push('/specialSale/add')
    },
    // 获取省份
    async dropDownProvince (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getProvince')
        this.provinceAry = res
      }
    },
    changeP () {
      this.formInline.area = ''
    },
    // 获取城市
    async dropDownCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.formInline.province
        })
        this.cityAry = res
      }
    },
    // 获取品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showSaleBrand')
        this.brandAry = res
      }
    },
    // 获取车系
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
      this.getSpecialSale()
    },
    // 表格操作按钮
    async handleEdit (row) { // 上首页
      if (row.home === 0) {
        const res = await this.$http.post('/sale/updateHome', {
          home: 1,
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return
        }
        this.$message.success('上首页成功')
        this.submit()
      } else {
        const res = await this.$http.post('/sale/updateHome', {
          home: 0,
          id: row.id
        })
        if (res.status !== 200 || res.data !== true) {
          return
        }
        this.$message.success('下首页成功')
        this.submit()
      }
    },
    async handleDelete (row) { // 删除
      const res = await this.$http.post('/sale/delSale', {
        id: row.id
      })
      if (res.status === 200 && res.data === true) {
        this.$message.success('删除成功')
        this.submit()
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    // 推广
    async handleExtension (row) {
      this.msg = row.id
      const { data: res } = await this.$http.post('/sale/sale', {
        id: row.id
      })
      if(res){
        this.submit()
      }else{
        his.$message.error('操作失败')
      }
      
      // this.dialogFormVisible = true
    },
    async dialogCheck () {
      if (this.checkList.length === 0) {
        return this.$message.error('至少选择一个车系')
      }
      const res = await this.$http.post('/sale/Tg', {
        serie: this.checkList,
        id: this.msg,
        state: '已申请未推广'
      })
      if (res.status !== 200 || res.data !== true) {
        return
      }
      this.dialogFormVisible = false
      this.$message.success('推广申请成功')
      this.submit()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getSpecialSale()
    }
  },
  computed: {
    // 判断城市下拉框
    disabledCity () {
      if (this.formInline.province !== '') {
        return false
      }
      return true
    },
    // 判断车系下拉框
    disabledSeries () {
      if (this.formInline.brand !== '') {
        return false
      }
      return true
    }
  },
  created () {
    // 获取特卖列表
    this.getSpecialSale()
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
h2 {
  margin-bottom: 20px;
}
// 新建资讯
.addInformation {
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
</style>
