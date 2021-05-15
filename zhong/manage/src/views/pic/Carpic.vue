<template>
  <div>
    <h3>汽车图片展示</h3>
    <!-- 上传轮播图 -->
    <el-button size="small" @click="addPhoto" type="primary" style="margin-bottom: 10px">新增汽车图片</el-button>
    <!-- 搜素条件 -->
    <el-card body-style="padding: 10px">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="车系">
          <el-cascader @change="changeBrandSeries" filterable v-model="series" size="mini" :options="options" :props="{ value: 'label', label: 'label'}"></el-cascader>
        </el-form-item>
        <el-form-item label="车型">
          <el-select :disabled="disabledType" @change="changeType" v-model="formInline.type" placeholder="请选择车型" size="mini" @visible-change="getType($event)">
            <el-option v-for="item in typeList" :key="item.c" :label="item.c" :value="item.c"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="formInline.place" placeholder="请选择图片位置" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="外观" value="外观"></el-option>
            <el-option label="内饰" value="内饰"></el-option>
            <el-option label="空间" value="空间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色">
          <el-select :disabled="disabledColor" v-model="formInline.color" placeholder="请选择车型颜色" size="mini" @visible-change="getColor($event)">
            <el-option v-for="item in colorList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" size="mini" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 按钮 -->
    <el-button size="mini" type="danger" @click="allDetele" style="margin-top: 15px;">批量删除</el-button>
    <!-- 图片 -->
    <el-table
      @selection-change="changeFun"
      :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
      :cell-style="{ 'text-align': 'center' }"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column
        prop="series"
        width="150"
        label="车系">
      </el-table-column>
      <el-table-column
        prop="type"
        width="250"
        label="车型">
      </el-table-column>
      <el-table-column
        prop="color"
        width="150"
        label="颜色">
      </el-table-column>
      <el-table-column
        prop="place"
        width="100"
        label="位置">
      </el-table-column>
      <el-table-column label="图片链接">
        <template slot-scope="scope">
          <span @click="preview(scope.row.url)">{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="dialogTableVisible" :close="close">
      <img :src="src" alt="">
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
      series: [],
      // 搜索条件
      formInline: {
        pageSize: 10,
        pageNo: 1,
        series: '',
        type: '',
        place: '',
        color: ''
      },
      // 复选框集合
      checkBoxData: [],
      // 品牌车系
      options: [],
      // 车型
      typeList: [],
      // 颜色
      colorList: [],
      // 表格
      tableData: [],
      total: 0,
      // 对话框
      dialogTableVisible: false,
      src: ''
    }
  },
  computed: {
    disabledType () {
      if (this.series.length === 0) {
        return true
      }
      return false
    },
    disabledColor () {
      if (this.formInline.type === '' || this.formInline.place === '') {
        return true
      }
      return false
    }
  },
  methods: {
    // 新增图片
    addPhoto () {
      this.$router.push('/pic/addcarpic')
    },
    // 获取图片信息
    async getSwiper () {
      this.formInline.series = this.series[1] || ''
      const { data: res } = await this.$http.post('/pic/showPic', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 品牌车系
    async getSeries () {
      const { data: res } = await this.$http.post('/car/jilian')
      this.options = res
    },
    // 改变品牌车系
    changeBrandSeries () {
      this.formInline.color = '',
      this.formInline.type = ''
    },
    // 获取车型
    async getType (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/getC', {
          series: this.series[1]
        })
        this.typeList = res
        this.formInline.series = this.series[1]
      }
    },
    // 改变车型
    changeType () {
      this.formInline.color = ''
    },
    // 获取颜色
    async getColor (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/pic/getColor', {
          series: this.series[1],
          type: this.formInline.type,
          place: this.formInline.place
        })
        this.colorList = res
      }
    },
    // 搜索
    onSubmit () {
      this.formInline.pageNo = 1
      this.getSwiper()
    },
    // 监听复选框
    changeFun (val) {
      this.checkBoxData = val
    },
    // 图片预览
    preview (url) {
      this.src = url
      this.dialogTableVisible = true
    },
    // 关闭对话框
    close () {
      this.src = ''
    },
    // 删除所有选中项
    async allDetele () {
      if (this.checkBoxData.length === 0) {
        return this.$message.error('至少选择其中一项哦')
      }
      this.checkBoxData = this.checkBoxData.map(item => {
        return item.id
      })
      const res = await this.$http.post('/pic/delPic', {
        list: this.checkBoxData
      })
      if (res.status !== 200 || res.data !== true) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.onSubmit()
    },
    // 删除表格
    async handleDelete (row) {
      let list = []
      list.push(row.id)
      const res = await this.$http.post('/pic/delPic', {
        list: list
      })
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getSwiper()
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getSwiper()
    }
  },
  created () {
    // 获取图片
    this.getSwiper()
    // 获取车系
    this.getSeries()
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 15px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}

span {
  cursor: pointer;
}

img {
  width: 100%;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
