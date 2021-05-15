<template>
  <div>
    <!-- 面包屑 -->
    <h3>代理管理</h3>
    <!-- 新增代理人 -->
    <el-button type="primary" size="small" @click="dialogAdd = true" style="margin-bottom: 15px;">新增代理人</el-button>
    <el-dialog title="新增代理人" :visible.sync="dialogAdd" width="35%">
      <el-form :model="addForm">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" placeholder="请输入手机号" style="width: 220px;"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-select v-model="addForm.subStationPro" @visible-change="AddFormProvince($event)" autocomplete="off" placeholder="请选择省份" @change="AddformChangeProvince">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in AddFormProvinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-select multiple v-model="addForm.subStationCity" @visible-change="AddFormCity($event)" autocomplete="off" placeholder="请选择城市">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.cityid" v-for="item in AddFormCityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select @visible-change="dropDownProvince($event)" v-model="formInline.subStationPro" placeholder="请选择省份" size="mini" @change="changeP">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in provinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.subStationCity" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.cityid" v-for="item in cityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="输入手机号" size="mini" v-model="formInline.phone"></el-input>
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
        prop="name"
        label="代理人"
        width="180">
      </el-table-column>
      <el-table-column label="代理等级">
        <template slot-scope="scope">
          <span>{{scope.row.level===3?'省代理':'市代理'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="subPro"
        label="代理省份"
        width="270">
      </el-table-column>
      <el-table-column
        prop="subCity"
        label="代理城市"
        width="270">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">修改代理城市</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改代理城市 -->
    <el-dialog title="修改代理城市" :visible.sync="dialogFormVisible" :info="msg" width="35%">
      <el-form :model="form">
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-select style="width: 300px" v-model="form.subStationPro" @visible-change="FormProvince($event)" autocomplete="off" placeholder="请选择省份" @change="formChangeProvince">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.provinceid" v-for="item in FormProvinceAry" :key="item.provinceid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-select style="width: 300px" multiple v-model="form.subStationCity" @visible-change="FormCity($event)" autocomplete="off" placeholder="请选择城市">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.cityid" v-for="item in FormCityAry" :key="item.cityid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm">确 定</el-button>
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
      // 搜索条件
      formInline: {
        subStationPro: '',
        subStationCity: '',
        phone: '',
        token: window.sessionStorage.getItem('token'),
        pageNo: 1,
        pageSize: 10
      },
      // 总数
      total: 0,
      // 省份
      provinceAry: [],
      // 城市
      cityAry: [],
      // 表格
      tableData: [],
      // 新增代理人
      dialogAdd: false,
      AddFormProvinceAry: [],
      AddFormCityAry: [],
      addForm: {
        subStationPro: '',
        subStationCity: [],
        phone: '',
        id: ''
      },
      // 修改代理城市
      dialogFormVisible: false,
      FormProvinceAry: [],
      FormCityAry: [],
      msg: '',
      form: {
        subStationPro: '',
        subStationCity: [],
        id: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 获取代理列表
    async getSpecialSale () {
      if (this.formInline.subStationCity !== '') {
        this.formInline.subStationPro = ''
      }
      const { data: res } = await this.$http.post('/user/sub', this.formInline)
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
      this.formInline.subStationCity = ''
    },
    // 获取城市
    async dropDownCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.formInline.subStationPro
        })
        this.cityAry = res
      }
    },
    // 新增代理人
    async AddFormProvince(callback) { // 省份
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getProvince')
        this.AddFormProvinceAry = res
      }
    },
    async AddFormCity (callback) { // 城市
      if (callback === true) {
        if (this.addForm.subStationPro === '') {
          return
        }
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.addForm.subStationPro
        })
        this.AddFormCityAry = res
      }
    },
    AddformChangeProvince () {
      this.addForm.subStationCity = ''
    },
    async dialogAddForm () {
      if (this.addForm.phone.trim().length !== 11) {
        return
      }
      const res = await this.$http.post('/user/getUserByPhone', {
        phone: this.addForm.phone
      })
      // 判断是否注册
      if (res.data === '') {
        return this.$message.error('请先前往网站首页注册')
      }
      if (this.addForm.subStationPro === '') {
        return
      } else if (this.addForm.subStationCity.length !== 0) {
        this.addForm.subStationPro = ''
      }
      this.addForm.id = res.data.id
      const { data: req } = await this.$http.post('/user/updateSub', this.addForm)
      if (req !== true) {
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
      this.submit()
      this.dialogAdd = false
      this.addForm.phone = ''
      this.addForm.subStationPro = '',
      this.addForm.subStationCity = []
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getSpecialSale()
    },
    // 修改代理城市
    async handleEdit (row) {
      this.dialogFormVisible = true
      this.msg = row.id
    },
    async FormProvince(callback) { // 省份
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getProvince')
        this.FormProvinceAry = res
      }
    },
    async FormCity (callback) { // 城市
      if (callback === true) {
        if (this.form.subStationPro === '') {
          return
        }
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.form.subStationPro
        })
        this.FormCityAry = res
      }
    },
    formChangeProvince () {
      this.form.subStationCity = ''
    },
    async dialogForm () { // 提交
      if (this.form.subStationPro === '') {
        return
      } else if (this.form.subStationCity.length !== 0) {
        this.form.subStationPro = ''
      }
      this.form.id = this.msg
      const res = await this.$http.post('/user/updateSub', this.form)
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
      this.submit()
      this.dialogFormVisible = false
      // 清空
      this.form.subStationPro = ''
      this.form.subStationCity = []
      this.form.id = ''
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
      if (this.formInline.subStationPro !== '') {
        return false
      }
      return true
    }
  },
  created () {
    // 获取代理列表
    this.getSpecialSale()
  }
}
</script>

<style lang="less" scoped>
h3 {
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
