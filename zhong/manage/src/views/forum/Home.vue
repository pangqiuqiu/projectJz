<template>
  <div>
    <!-- 头部标题 -->
    <h2>论坛</h2>
    <!-- 新增论坛 -->
    <el-button size="mini" type="primary" @click="dialogFormVisible = true" style="margin-bottom: 15px;">新增论坛</el-button>
    <!-- 新增论坛弹框 -->
    <el-dialog title="论坛类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新增论坛类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择论坛类型">
            <el-option label="主题论坛" value="主题论坛"></el-option>
            <el-option label="车型论坛" value="车型论坛"></el-option>
          </el-select>
        </el-form-item>
        <!-- 主题 -->
        <el-form-item label="主题" :label-width="formLabelWidth" v-show="this.form.type === '主题论坛'">
          <el-input v-model="form.theme" placeholder="请输入自定义主题"></el-input>
        </el-form-item>
        <!-- 车型 -->
        <el-form-item label="车型" :label-width="formLabelWidth" v-show="this.form.type === '车型论坛'">
          <el-select filterable v-model="form.brand" placeholder="请选择品牌" @change="changeBrandForm" @visible-change="dropDownBrandForm($event)">
            <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-select filterable :disabled="seriesForm" v-model="form.series" placeholder="请选择车系" @visible-change="dropDownSeriesForm($event)">
            <el-option v-for="item in seriesList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newForum">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索条件 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="省份">
          <el-select filterable @visible-change="dropDownProvince($event)" v-model="formInline.province" placeholder="请选择省份" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="item in provinceAry" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.type" placeholder="请选择类型" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option label="主题论坛" value="主题论坛"></el-option>
            <el-option label="地区论坛" value="地区论坛"></el-option>
            <el-option label="车型论坛" value="车型论坛"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题">
          <el-select filterable @visible-change="dropDownTheme($event)" v-model="formInline.theme" placeholder="请选择主题" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="item in themeAry" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select filterable @change="changeBrand" @visible-change="dropDownBrand($event)" v-model="formInline.brand" placeholder="请选择品牌" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="(item,index) in brandAry" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车系">
          <el-select :disabled="disabledSeries" @visible-change="dropDownSeries($event)" v-model="formInline.series" placeholder="请选择车系" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="(item,index) in seriesAry" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" size="mini" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 搜索结果区域 -->
    <el-table :data="tableData" border style="width: 100%" :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="name" label="论坛" width="180"></el-table-column>
      <el-table-column prop="nikename" label="版主" width="140"></el-table-column>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column label="Logo" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt="" style="border-radius: 50%; width: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="brand" label="品牌" width="180"></el-table-column>
      <el-table-column prop="series" label="车系" width="180"></el-table-column>
      <el-table-column prop="theme" label="主题"></el-table-column>
      <el-table-column prop="province" label="地区" width="100"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)">修改</el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleBanZhu(scope.row)">版主</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改论坛对话框 -->
    <el-dialog title="主题论坛" :visible.sync="editForum" width="40%">
      <el-form>
        <el-form-item label="主题名称" :label-width="formLabelWidth">
          <el-input v-model="editName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="论坛Logo" :label-width="formLabelWidth" v-if="themes === '主题论坛'" style="margin-top: 20px">
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
          <div style="color: #999; font-size: 12px; line-height: 26px">建议尺寸：70 x 50, 图片格式为png/gif/jpeg, 大小不大于2M</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForum = false">取 消</el-button>
        <el-button type="primary" @click="editForumAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置版主 -->
    <el-dialog title="设置版主" :visible.sync="moderator" width="40%">
      <el-form>
        <el-form-item label="设置版主">
          <el-input v-model="moderatorIdUserName" autocomplete="off" placeholder="请输入版主手机号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="moderator = false">取 消</el-button>
        <el-button type="primary" @click="moderatorAdd">确 定</el-button>
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
        province: '', // 省份
        city: '', // 城市
        type: '',
        theme: '',
        brand: '',
        series: '',
        pageSize: 20,
        pageNo: 1
      },
      // 省份
      provinceAry: [],
      cityAry: [],
      themeAry: [],
      brandAry: [],
      seriesAry: [],
      // 表格
      tableData: [],
      total: 0,
      // 新增论坛弹框
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        type: '',
        theme: '',
        brand: '',
        series: ''
      },
      brandList: [],
      seriesList: [],
      // 修改对话框
      themes: '',
      editForum: false,
      editName: '', // 主题名
      moderatorIdUserName: '', // 版主
      moderatorId: '',
      demoId: '', // ID
      // 版主
      moderator: false
    }
  },
  computed: {
    // 判断车系下拉框
    disabledSeries () {
      if (this.formInline.brand !== '') {
        return false
      }
      return true
    },
    seriesForm () {
      if (this.form.brand !== '') {
        return false
      }
      return true
    }
  },
  methods: {
    // 获取论坛列表
    async getForumList () {
      const { data: res } = await this.$http.post('/invit/forumList', this.formInline)
      this.tableData = res.l
      this.total = res.num
    },
    // 改变分页
    changePage (index) {
      this.formInline.pageNo = index
      this.getForumList()
    },
    // 省份
    async dropDownProvince (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/getProvince')
        this.provinceAry = res
      }
    },
    // 主题
    async dropDownTheme (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/getTheme')
        this.themeAry = res
      }
    },
    // 品牌
    async dropDownBrand (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/getBrand')
        this.brandAry = res
      }
    },
    // 车系
    async dropDownSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/getSeries', {
          brand: this.formInline.brand
        })
        this.seriesAry = res
      }
    },
    // 改变品牌
    changeBrand (a) {
      this.formInline.series = ''
      if (a !== undefined) {
        this.flag = false
      }
    },
    onSubmit () {
      this.formInline.pageNo = 1
      this.getForumList()
    },
    // 弹框部分-------
    // 品牌
    async dropDownBrandForm (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/nobrand')
        this.brandList = res
      }
    },
    // 车系
    async dropDownSeriesForm (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/noseries', {
          brand: this.form.brand
        })
        this.seriesList = res
      }
    },
    changeBrandForm () {
      this.form.series = ''
    },
    // 新增论坛
    async newForum () {
      if ((this.form.type === '主题论坛' && this.form.theme === '') || (this.form.type === '车型论坛' && (this.form.brand === '' || this.form.series === ''))) {
        return this.$message.error('请完善内容')
      }
      const res = await this.$http.post('/invit/addForum', this.form)
      if (res.data !== true || res.status !== 200) {
        return this.$message.error('新增失败')
      }
      this.$message.success('新增成功')
      this.dialogFormVisible = false
      this.getForumList()
    },
    // 设置版主
    handleBanZhu (row) {
      this.moderator = true
      this.demoId = row.id
    },
    // 确认修改版主
    async moderatorAdd () {
      if(!(/^1[3456789]\d{9}$/.test(this.moderatorIdUserName))) return this.$message.error('请输入正确的手机号')
      const rew = await this.$http.post('/user/getUserByPhone', {
        phone: this.moderatorIdUserName
      })
      if (rew.status !== 200) return this.$message.error('未查询到此人')
      this.moderatorIdUserName = rew.data.nikename
      this.moderatorId = rew.data.id
      const res = await this.$http.post('/invit/updateForumModer', {
        moderatorId: this.moderatorId,
        id: this.demoId
      })
      if (res.data !== true || res.status !== 200) return this.$message.error('设置失败')
      this.moderatorIdUserName = ''
      this.moderatorId = ''
      this.$message.success('设置成功')
      this.moderator = false
      this.getForumList()
    },
    // 操作
    handleEdit (row) {
      this.editName = row.theme
      this.demoId = row.id
      this.editForum = true
      this.themes = row.type
    },
    // 提交修改后的主题论坛
    async editForumAdd () {
      // 判断是否修改logo
      if (this.$refs.new_image.files[0]) {
        // 上传图片
        const formData = new FormData()
        formData.append('image_data', this.$refs.new_image.files[0])
        const rew = await this.$http.post('/upload/upload5', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (rew.status !== 200 || rew.data === '图片上传失败！') {
          return this.$message.error('图片上传失败, 请重新上传')
        }
        const res = await this.$http.post('/invit/updateForum', {
          theme: this.editName,
          id: this.demoId,
          pic: rew.data
        })
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功')
        this.editForum = false
        this.$refs.new_image.files[0] = ''
        this.getForumList()
      } else {
        const res = await this.$http.post('/invit/updateForum', {
          theme: this.editName,
          id: this.demoId
        })
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功')
        this.editForum = false
        this.getForumList()
      }
    }
  },
  created () {
    // 获取论坛列表
    this.getForumList()
  }
}
</script>

<style lang="less" scoped>
h2 {
  background-color: #f7f8f9;
  padding-left: 30px;
  margin-bottom: 15px;
  height: 50px;
  line-height: 50px;
}
.el-dialog {
  .el-select {
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
.el-form {
  .el-form-item {
    margin-right: 20px;
    margin-bottom: 0;
  }
}
.el-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
