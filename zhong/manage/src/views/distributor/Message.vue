<template>
  <div>
    <!-- 面包屑 -->
    <h3>客户管理</h3>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="类型">
          <el-select
            v-model="formInline.type"
            placeholder="请选择类型"
            size="mini"
          >
            <el-option label="不限" value=""></el-option>
            <el-option label="获取底价" value="获取底价"></el-option>
            <el-option label="分期购车" value="分期购车"></el-option>
            <el-option label="预约试驾" value="预约试驾"></el-option>
            <el-option label="置地换车" value="置地换车"></el-option>
            <el-option label="客户留言" value="客户留言"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select
            v-model="formInline.origin"
            placeholder="请选择来源"
            size="mini"
          >
            <el-option label="不限" value=""></el-option>
            <el-option label="本站" value="本站"></el-option>
            <el-option label="非本站" value="非本站"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售顾问" v-if="level === 5">
          <el-select v-model="formInline.xsgwId" placeholder="请选择销售顾问" size="mini" >
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in fpUserList" :key="item.id" :label="item.name" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <div class="block">
            <el-date-picker
              size="mini"
              v-model="time"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 导入导出 -->
    <div class="level">
      <div v-if="level === 1 || level === 2" >
      <el-upload
        ref="upload"
        action=""
        :on-change="handleChange"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button type="primary" icon="el-icon-upload2" size="mini"
          >文件上传</el-button
        >
      </el-upload>
      </div>
      <download-excel
        :data="exportData"
        :fields="json_fields"
        :fetch="createExportData"
        name="客户信息.xls">
        <el-button  type="primary" icon="el-icon-download" size="mini">文件下载</el-button>
      </download-excel>
    </div>
    <!-- 搜索结果 -->
    <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000'}"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="spCity" label="城市"></el-table-column>
      <el-table-column prop="origin" label="来源"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="xsDate" label="时间"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="fpUser" label="销售顾问" v-if="level === 5"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column prop="series" label="车系"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="other" label="留言"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column label="操作" width="180" v-if="level === 1 || level === 2 || level === 5">
        <template slot-scope="scope">
          <!-- 经销商分配销售顾问 -->
          <el-button v-if="level === 5" type="primary" size="mini" @click="distribution(scope.row)">分配</el-button>
          <!-- 总站分配 信息 -->
          <el-button v-if="(level === 1 || level === 2) && scope.row.origin !== '本站'" :type="scope.row.is == 1 ? 'success' : 'primary'"
            size="mini"
            @click="arrange(scope.row)"
          >
            {{ scope.row.is == 1 ? '已分配' : '未分配' }}
          </el-button>
          <el-button v-if="level === 5" size="mini" type="success" @click="handleRecord(scope.row)">跟踪记录</el-button>
          <el-button v-if="level === 1 || level === 2" type="warning" size="mini" @click="detail(scope.row)">分配详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      hide-on-single-page
      :current-page="pageNo"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <!-- 分配销售顾问对话框 -->
    <el-dialog
      title="分配销售顾问"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form :model="form">
        <el-form-item label="销售顾问" :label-width="formLabelWidth">
          <el-select v-model="form.userId" placeholder="请选择">
            <el-option
              v-for="item in fpUserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 总站 分配线索对话框 -->
    <el-dialog
      title="分配线索"
      :visible.sync="dialogFormClue"
      width="50%"
      :destroy-on-close="true"
    >
      <ul>
        <li v-for="item in accordanceAry" :key="item.id">
          <el-checkbox
            :label="item.name4s"
            v-model="item.is"
            @change="change(item)"
            style="margin-bottom: 10px"
          ></el-checkbox>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormClue = false">取 消</el-button>
        <el-button type="primary" @click="dialogClue">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="已分配经销商" :visible.sync="dialogDealerVisible">
      <el-table
      :header-cell-style="{'text-align': 'center', 'font-size': '14px', color: '#000', }"
      :cell-style="{ 'text-align': 'center' }"
      :data="dealerData"
      border
      style="width: 100%"
    > 
    <el-table-column prop="dealerName" label="店名"></el-table-column>
    <el-table-column prop="price" label="扣款金额"></el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { pickerOptions, dateConversion } from '../../assets/js/timer.js'
import XLSX from 'xlsx'
import JsonExcel from 'vue-json-excel'
export default {
  components: {
    downloadExcel: JsonExcel
  },
  data () {
    return {
      // 当前人等级
      level: 0,
      // 搜索条件
      formInline: {
        type: '',
        origin: '',
        is: '',
        xsgwId:'',
        xsDateS: '',
        xsDateE: '',
        pageNo: 1,
        pageSize: 20
      },
      // 时间快捷键
      pickerOptions: pickerOptions,
      time: [],
      pageNo: 1,
      pageSize: 20,
      // 总数
      total: 0,
      // 表格
      tableData: [],
      dealerData: [],
      // 表格
      exportData: [],
      // 经销商销售顾问数组
      fpUserList: [],
      // 销售顾问 对话框
      dialogFormVisible: false,
      dialogDealerVisible: false,
      form: {
        userId: '', // 销售顾问
        clueId: ''
      },
      formLabelWidth: '120px',
      // 分配线索 对话框
      dialogFormClue: false,
      formClue: {
        ary: [],
        clueId: ''
      },
      accordanceAry: [], // 符合条件的经销商数组
      // 导出数据
      json_fields: {
        '报名城市': 'spCity',
        '意向品牌': 'brand',
        '意向车型': 'series',
        '客户姓名': 'name',
        '客户电话': 'phone',
        '报名时间': 'xsDate',
        '备注': 'remarks'
      }
    }
  },
  methods: {
    // 获取用户留言列表
    async getMseeage () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.xsDateS = dateConversion(this.time[0])
      this.formInline.xsDateE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post(
        '/dealer/showTab',
        this.formInline
      )
      this.tableData = res.l
      this.total = res.num
    },
    
    async createExportData(){
      if (this.time === null) {
        this.time = []
      }
      this.formInline.xsDateS = dateConversion(this.time[0])
      this.formInline.xsDateE = dateConversion(this.time[1])
      this.formInline.pageNo = 1
      this.formInline.pageSize=this.total
      const { data: res } = await this.$http.post(
        '/dealer/showTab',
        this.formInline
      )
      return res.l
    },
    // 获取当前登陆人的等级
    async getLevel() {
      const { data: res } = await this.$http.post('/user/level')
      this.level = res
    },
    async detail (row) {
       const { data: res } = await this.$http.post('/dealer/getDealerByClueId', {
        clueId: row.id
      })
      this.dealerData = res
      this.dialogDealerVisible = true
    },
    handleRecord (row) {
      this.$router.push(`/distributor/RecordList?userId=${row.followUpRecord.userId}&xjId=${row.followUpRecord.xjId}`)
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.formInline.pageSize = 20
      this.pageNo = 1
      this.pageSize = 20
      this.getMseeage()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.formInline.pageSize = 20
      this.pageNo = index
      this.pageSize = 20
      this.getMseeage()
    },
    // 分配销售顾问
    async distribution (row) {
      // const { data: res } = await this.$http.post('/dealer/xsgw')
      // this.fpUserList = res
      this.dialogFormVisible = true
      this.form.userId = row.fpUser // 赋值销售顾问
      this.form.clueId = row.id // 线索ID
    },
    // 分配销售顾问
    async getXsgw() {
      const { data: res } = await this.$http.post('/dealer/xsgw')
      this.fpUserList = res
    },
    // 确认提交
    async dialog () {
      const res = await this.$http.post('/dealer/fp', this.form)
      if (res.data !== true || res.status !== 200)
        return this.$message.error('分配失败')
      this.$message.success('操作成功')
      this.dialogFormVisible = false
      this.form.userId = ''
      this.form.clueId = ''
      this.getMseeage()
    },
    // 总站分配线索
    async arrange (row) {
      this.formClue.clueId = row.id
      const { data: res } = await this.$http.post('/dealer/fpDList', {
        city: row.spCity,
        series: row.series
      })
      this.accordanceAry = res
      this.dialogFormClue = true
    },
    // 选择经销商
    change (item) {
      // 删除选中经销商
      if (item.is === false) {
        let index = this.formClue.ary.indexOf(item.id)
        this.formClue.ary.splice(index, 1)
      } else {
        this.formClue.ary.push(item.id)
      }
    },
    // 确认提交
    async dialogClue () {
      const res = await this.$http.post('/dealer/fpD', this.formClue)
      if (res.data !== true || res.status !== 200) return this.$message.error('操作失败')
      this.$message.success('操作成功')
      this.formClue.ary = []
      this.formClue.clueId = ''
      this.dialogFormClue = false
      this.getMseeage()
    },
    // 上传文件时处理方法
    handleChange (file, fileList) {
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if (
          this.fileTemp.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          this.fileTemp.type == 'application/vnd.ms-excel'
        ) {
          this.importfxx(this.fileTemp)
        } else {
          this.$message({ message: '附件格式错误，请删除后重新上传！' })
        }
        this.$refs.upload.clearFiles()
      } else {
        this.$message({ message: '请上传附件！' })
      }
    },
    importfxx (obj) {
      let _this = this
      let inputDOM = this.$refs.inputer
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0]
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        var pt = this
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          //此处引入，用于解析excel
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          // 此处可对数据进行处理
          let arr = []
          outdata.map(v => {
            let obj = {}
            obj.spCity = v['报名城市'] + '市'
            obj.brand = v['意向品牌']
            obj.series = v['意向车型']
            obj.name = v['客户姓名']
            obj.phone = v['客户电话']
            obj.xsDate = v['报名时间']
            obj.cost = v['线索成本']
            obj.remarks = v['备注']
            arr.push(obj)
          })
          _this.da = arr
          _this.dalen = arr.length
          _this.$http.post('/dealer/inXj', { arr }).then(res => {
            if (res.data) return _this.$message.success('上传成功')
            return _this.$message.error('上传失败')
          })
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    }
  },
  created () {
    // 获取用户留言列表
    this.getMseeage()
    // 等级
    this.getLevel()
    // 销售顾问
    this.getXsgw()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 15px;
}
// 搜索卡片区域
.el-card {
  margin-bottom: 15px;
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

// 上传下载
.level {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  .el-button {
    margin-right: 10px;
  }
}
</style>
