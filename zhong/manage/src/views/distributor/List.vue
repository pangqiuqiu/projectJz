<template>
  <div>
    <!-- 面包屑 -->
    <h2>经销商列表</h2>
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
          <el-select @change="ggg" :disabled="disabledCity" @visible-change="dropDownCity($event)" v-model="formInline.city" placeholder="请选择城市" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.city" :value="item.city" v-for="item in cityAry" :key="item.cityId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select @change="ggg" v-model="formInline.brand" placeholder="请选择品牌" @visible-change="dropDownBrand($event)" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in brandAry" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="4S店">
          <el-input @change="ggg" v-model="formInline.name4s" placeholder="店铺名称" size="mini"></el-input>
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
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="city" label="城市" width="170"></el-table-column>
      <el-table-column prop="brand" label="品牌"  width="180"></el-table-column>
      <el-table-column prop="name4s" label="店铺名称"></el-table-column>
      <el-table-column prop="state4s" label="状态" width="150"></el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleSign(scope.row)">模拟登录</el-button>
          <el-button size="mini" type="primary" @click="handleSeriesEdit(scope.row)">车系修改</el-button>
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
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image1">
        </el-form-item>
        <el-form-item label="厂商品牌授权书" :label-width="formLabelWidth">
          <img :src="form.csppsqs" alt="" width="500">
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image2">
        </el-form-item>
        <el-form-item label="店门口照片" :label-width="formLabelWidth">
          <img :src="form.dmkzp" alt="" width="500">
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image3">
        </el-form-item>
        <el-form-item label="所属品牌" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.brand" autocomplete="off"></el-input> -->
          <el-select filterable @visible-change="dropDownBrand($event)" multiple v-model="form.brand" placeholder="请选择品牌">
            <el-option v-for="(item,index) in brandAry" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
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
      flag: true,
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
        id: ''
      },
      // 搜索条件
      formInline: {
        province: '',
        city: '',
        brand: '',
        name4s: '',
        state4s: '已上线',
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
      // 表格
      tableData: [],
      // 图片数组
      pic: []
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
      this.flag = false
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
        const { data: res } = await this.$http.post('/dealer/getDealerBrand')
        this.brandAry = res
      }
    },
    // 查询
    ggg (index) {
      if (index !== undefined) {
        this.formInline.pageNo = 1
      }
    },
    submit () {
      if (this.flag === false) {
        this.formInline.pageNo = 1
      }
      this.ggg()
      this.getSpecialSale()
      this.flag = true
    },
    // 编辑
    async handleEdit (row) {
      this.msg = row.id
      const { data: res } = await this.$http.post('/dealer/getDealer', {
        id: row.id
      })
      this.form = res
      this.form.brand = this.form.brand.toString().split(',')
      this.dialogFormVisible = true
    },
    // 模拟登录
    async handleSign (row) {
      const { data: res } = await this.$http.post('/user/mnLogin', {
        dealerId: row.id
      })
      window.sessionStorage.setItem('simulationToken', res)
      this.$router.push('/')
      this.$router.go(0)
    },
    handleSeriesEdit (row) {
      this.$router.push(`/distributor/BrandList?id=${row.id}`)
    },
    // 确定提交
    dialogCheck () {
      const picObj = {
        yyzz: this.$refs.new_image1.files[0],
        csppsqs: this.$refs.new_image2.files[0],
        dmkzp: this.$refs.new_image3.files[0]
      }
      for (var i in picObj) {
        if(picObj[i] === undefined) {
          delete picObj[i]
        }
      }
      // 判断是否修改了图片
      if (JSON.stringify(picObj) === "{}") {
        this.form.id = this.msg
        const res = this.$http.post('/dealer/updateDealer', this.form).then(res => {
          if (res.status !== 200 || res.data !== true) {
            return false
          }
          this.$message.success('修改成功')
          this.dialogFormVisible = false
          this.submit()
        })
      } else {
        for(var i in picObj) {
          const formData = new FormData()
          formData.append('image_data', picObj[i])
          this.$http.post('/upload/addImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            if (res.status !== 200) {
              return
            }
            this.form.id = this.msg
            this.form[i] = res.data
            this.$http.post('/dealer/updateDealer', this.form).then(rew => {
              if (rew.status !== 200 || rew.data !== true) {
                return false
              }
              this.$message.success('修改成功')
              this.dialogFormVisible = false
              this.submit()
            })
          })
        }
      }
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.submit()
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
// 分页
.el-pagination {
  text-align: center;
  margin-top: 20px;
}

.img{
    width: 500px;
}

</style>
