<template>
  <div>
    <!-- 面包屑 -->
    <h3>资讯列表</h3>
    <!-- 新建资讯 -->
    <el-button size="small" type="primary" class="addInformation" @click="dialogFormVisibleing">新建资讯</el-button>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select @change="changeP" @visible-change="dropDownProvince($event)" v-model="formInline.province" placeholder="请选择省份" size="mini">
            <el-option :label="item.province" :value="item.province" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.area" placeholder="请选择城市" size="mini">
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯类型">
          <el-select v-model="formInline.type" placeholder="选择资讯类型" size="mini">
            <el-option label="车讯" value="车讯"></el-option>
            <el-option label="试驾评测" value="试驾评测"></el-option>
            <el-option label="技术" value="技术"></el-option>
            <el-option label="导购" value="导购"></el-option>
            <el-option label="行业文化" value="行业文化"></el-option>
            <el-option label="店铺活动" value="店铺活动"></el-option>
            <el-option label="团购活动" value="团购活动"></el-option>
            <el-option label="品牌新闻" value="品牌新闻"></el-option>
            <el-option label="重点号资讯" value="重点号资讯"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="选择状态" size="mini">
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="已上线" value="已上线"></el-option>
            <el-option label="未通过" value="未通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input style="width: 300px;" v-model="formInline.title" size="mini"></el-input>
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
        :header-cell-style="{ 'text-align': 'center', 'font-size': '14px', 'color': '#000' }"
        :cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="username"
          label="发布人"
          width="100">
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="title(scope.row.id)">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column
          label="申请上首页"
          width="100">
          <template slot-scope="scope">
            <span v-show="scope.row.ishome === '1'">已申请</span>
            <span v-show="scope.row.ishome === '0'">未申请</span>
          </template>
        </el-table-column>
        <el-table-column
          label="通过上首页"
          prop="home"
          width="110">
          <!-- <template slot-scope="scope">
            <span v-show="scope.row.home === '1'">是</span>
            <span v-show="scope.row.home === '0'">否</span>
          </template> -->
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleApply(scope.row)">申请上首页</el-button>
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
    <!-- 选择资讯类型 -->
    <el-dialog title="请选择新增资讯类型" :visible.sync="dialogFormVisible">
      <el-form>
        <el-radio-group v-model="radio">
          <el-radio label="车讯"></el-radio>
          <el-radio label="试驾评测"></el-radio>
          <el-radio label="技术"></el-radio>
          <el-radio label="导购"></el-radio>
          <el-radio label="行业文化"></el-radio>
          <el-radio label="店铺活动" v-show="isInfor"></el-radio>
          <el-radio label="团购活动" v-show="isInfor"></el-radio>
          <el-radio label="品牌新闻" v-show="isInfor"></el-radio>
        </el-radio-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 判断是否是经销商
      isInfor: false, // 假设不是经销商
      // 搜索条件
      formInline: {
        token: window.sessionStorage.getItem('token'),
        province: '',
        area: '',
        state: '',
        title: '',
        type: '',
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
      brandList: [],
      // 表格
      tableData: [],
      // 弹出框
      dialogFormVisible: false,
      // 新增资讯类型
      radio: '汽车资讯'
    }
  },
  methods: {
    // 获取资讯列表
    async getInformationList () {
      const { data: res } = await this.$http.post('/Infor/inforList', this.formInline)
      this.tableData = res.l
      this.total = res.num
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
          province: this.formInline.province
        })
        this.cityAry = res
      }
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getInformationList()
    },
    // 表格操作按钮
    title (id) { // 标题
      window.open(`https://zhongdianqiche.com/car/#/automotivelnformation/details?id=${id}`)
      // window.open(`http://localhost:8080/#/automotivelnformation/details?id=${id}`)
    },
    handleEdit (id) { // 编辑
      this.$router.push({
        path: '/information/edit',
        query: { id: id }
      })
    },
    handleDelete (row) { // 删除
      this.$confirm('确定要删除此篇资讯吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        const res = await this.$http.post('/Infor/delInfor', {
          id: row.id
        })
        if (res.status === 200 && res.data === true) {
          this.submit()
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      }).catch(() => {
      })
    },
    async handleApply (row) { // 申请上首页
      if (row.ishome === '1') {
        return this.$message({
          message: '您已经申请过了哦',
          type: 'warning'
        })
      }
      const res = await this.$http.post('/Infor/ishome', {
        id: row.id
      })
      if (res.data === true && res.status === 200) {
        this.getInformationList()
      } else {
        this.$message({
          message: '申请失败',
          type: 'error'
        })
      }
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getInformationList()
    },
    // 新建资讯 显示弹框
    async dialogFormVisibleing () {
      // 判断是否是经销商
      const res = await this.$http.post('/Infor/dj', {
        token: window.sessionStorage.getItem('token')
      })
      if (res.data === true) {
        this.isInfor = true
      }
      this.dialogFormVisible = true
    },
    // 新建资讯 确定按钮
    dialogFormVisibled () {
      this.dialogFormVisible = false
      // console.log(this.radio)
      this.$router.push({
        path: '/information/newly',
        query: { type: this.radio }
      })
    }
  },
  computed: {
    // 判断城市下拉框
    disabledCity () {
      if (this.formInline.provinceId !== '') {
        return false
      }
      return true
    }
  },
  created () {
    // 获取资讯列表
    this.getInformationList()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 10px;
}
// 新建资讯
.addInformation {
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
.el-radio {
  margin-bottom: 20px;
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
