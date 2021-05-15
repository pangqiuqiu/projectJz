<template>
  <div>
    <!-- 面包屑 -->
    <h2>经销商入驻审核</h2>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select @visible-change="dropDownProvince($event)" v-model="formInline.province" placeholder="请选择省份" size="mini" @change="changeP">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.province" :value="item.province" v-for="item in provinceAry" :key="item.province"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.city" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="4S店">
          <el-input v-model="formInline.name4s" placeholder="店铺名称" size="mini"></el-input>
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
        prop="city"
        label="城市"
        width="130">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="品牌"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name4s"
        label="店铺名称"
        >
      </el-table-column>
      <el-table-column
        prop="state4s"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog :info='msg' title="经销商信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="form.companyAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="门店地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商认证" :label-width="formLabelWidth">
          <el-input v-model="form.dealerRz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
          <el-input v-model="form.tyshxydm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="厂商门店编码" :label-width="formLabelWidth">
          <el-input v-model="form.cjmdbm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照副本" :label-width="formLabelWidth">
          <img :src="form.yyzz" alt="" width="500">
        </el-form-item>
        <el-form-item label="厂商品牌授权书" :label-width="formLabelWidth">
          <img :src="form.csppsqs" alt="" width="500">
        </el-form-item>
        <el-form-item label="店门口照片" :label-width="formLabelWidth">
          <img :src="form.dmkzp" alt=""  width="500">
        </el-form-item>
        <el-form-item label="所属品牌" :label-width="formLabelWidth">
          <el-input v-model="form.brand" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <textarea v-model="form.cause" autocomplete="off" placeholder="请输入拒绝原因"  style="width:95%;"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogB">不通过</el-button>
        <el-button type="primary" @click="dialogT">通过</el-button>
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
      formLabelWidth: '150px',
      form: {
        company: '',
        companyAddress: '',
        address: '',
        dealerRz: '',
        tyshxydm: '',
        cjmdbm: '',
        brand: '',
        link: '',
        phone: '',
        id: '',
        cause: '',
        token: window.sessionStorage.getItem('token')
      },
      // 搜索条件
      formInline: {
        province: '',
        city: '',
        brand: '',
        name4s: '',
        token: window.sessionStorage.getItem('token'),
        state4s: '未审核',
        pageNo: 1,
        pageSize: 10
      },
      // 总数
      total: 0,
      // 省份
      provinceAry: [],
      // 城市
      cityAry: [],
      // 品牌
      brandAry: [],
      // 表格
      tableData: []
    }
  },
  methods: {
    // 获取经销商列表
    async getSpecialSale () {
      const { data: res } = await this.$http.post('/dealer/DealerList', this.formInline)
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
      this.formInline.city = ''
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
    // 获取品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/sale/showSaleBrand')
        this.brandAry = res
      }
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getSpecialSale()
    },
    // 编辑
    async handleEdit (row) {
      this.msg = row.id
      const { data: res } = await this.$http.post('/dealer/getDealer', {
        id: row.id
      })
      this.form = res
      this.dialogFormVisible = true
    },
    // 不通过
    async dialogB () {
      if (this.form.cause === undefined) {
        return alert('请输入原因')
      }
      const res = await this.$http.post('/dealer/addBtg', {
        id: this.msg,
        cause: this.form.cause,
        state4s: '不通过'
      })
      if (res.data !== true || res.status !== 200) {
        return
      }
      this.$message.success('审核成功')
      this.dialogFormVisible = false
      this.submit()
    },
    // 通过
    async dialogT () {
      const res = await this.$http.post('/dealer/updateState4s', {
        id: this.msg,
        state4s: '已上线'
      })
      if (res.data !== true || res.status !== 200) {
        return
      }
      this.$message.success('审核成功')
      this.dialogFormVisible = false
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
textarea {
  width: 100%;
  height: 300px;
  resize: none;
}
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
