<template>
  <div>
    <!-- 面包屑 -->
    <h2>帖子列表</h2>
    <!-- 搜索区域 -->
    <el-card body-style="padding: 10px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="论坛">
          <el-select filterable @visible-change="dropDownType($event)" v-model="formInline.forumId" placeholder="请选择" size="mini">
            <el-option label="不限" value=""></el-option>
            <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <div class="block">
            <el-date-picker size="mini" v-model="time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="选择状态" size="mini" @change="changeState">
            <el-option label="不限" value=""></el-option>
            <el-option label="未通过" value="未通过"></el-option>
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="通过审核" value="通过审核"></el-option>
            <el-option label="精华帖" value="精华帖"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-select v-model="formInline.home" placeholder="选择位置" size="mini" :disabled="isEssences">
            <el-option label="不限" value=""></el-option>
            <el-option label="首页焦点图" value="首页焦点图"></el-option>
            <el-option label="首页焦点标题" value="首页焦点标题"></el-option>
            <el-option label="首页专栏图1" value="首页专栏图1"></el-option>
            <el-option label="首页专栏图2-7" value="首页专栏图2-7"></el-option>
            <el-option label="论坛列表图" value="论坛列表图"></el-option>
            <el-option label="论坛焦点标题" value="论坛焦点标题">论坛焦点标题</el-option>
            <el-option label="论坛精选" value="论坛精选">论坛精选</el-option>
            <el-option label="普通精华帖" value="普通精华帖"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题">
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
        :header-cell-style="{ 'text-align': 'center', 'font-size': '20px', 'color': '#000' }"
        :cell-style="{ 'text-align': 'center' }"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="forum"
          label="论坛"
          width="190">
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <div @click="title(scope.row)" style="cursor: pointer;">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="home"
          label="位置"
          width="150">
        </el-table-column>
        <el-table-column
          prop="postDate"
          label="发布日期"
          width="180">
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">审核</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="handleSee(scope.row)">评论</el-button>
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
    <!-- 点击文章标题 -->
    <el-dialog title="帖子详情" :visible.sync="dialogTitle">
      <h2>{{this.postDetails.title}}</h2>
      <div v-html="this.postDetails.text" class="all"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTitle = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 审核对话框 -->
    <el-dialog title="帖子审核" :visible.sync="dialogFormVisible">
      <h2>{{this.postDetails.title}}</h2>
      <div v-html="this.postDetails.text" class="all"></div>
      <el-divider></el-divider>
      <ul>
        <li class="li">
          <h4>帖子状态:</h4>
          <el-radio-group v-model="post_status">
            <el-radio :label="'未通过'">未通过</el-radio>
            <el-radio :label="'通过审核'">通过审核</el-radio>
            <el-radio :label="'精华帖'">精华帖</el-radio>
          </el-radio-group>
        </li>
        <li class="li" style="min-height: 80px;" v-show="post_address">
          <h4>帖子位置:</h4>
          <el-radio-group v-model="post_isHome">
            <el-radio :label="'暂不处理'">暂不处理</el-radio>
            <el-radio :label="'首页焦点图'">首页焦点图</el-radio>
            <el-radio :label="'首页焦点标题'">首页焦点标题</el-radio>
            <el-radio :label="'首页专栏图1'">首页专栏图1</el-radio>
            <el-radio :label="'首页专栏图2-7'">首页专栏图2-7</el-radio>
            <el-radio :label="'论坛列表图'">论坛列表图</el-radio>
            <el-radio :label="'论坛焦点标题'">论坛焦点标题</el-radio>
            <el-radio :label="'论坛精选'">论坛精选</el-radio>
          </el-radio-group>
        </li>
        <li v-show="isPic" id="lastLi">
          <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
          <div>
            <span v-show="isPicSize">尺寸为 200 x 100 ; 图片格式为png/gif/jpeg</span>
            <span v-show="!isPicSize">尺寸为 670 x 340 ; 图片格式为png/gif/jpeg</span>
          </div>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="essences">确定</el-button>
        <!-- :disabled="submitInfor" -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pickerOptions, dateConversion } from '../../assets/js/timer'
export default {
  data () {
    return {
      // 时间快捷键
      pickerOptions: pickerOptions,
      time: [],
      // 搜索条件
      formInline: {
        postDateS: '',
        postDateE: '',
        state: '',
        home: '',
        title: '',
        forumId: '',
        pageNo: 1,
        pageSize: 20
      },
      // 类型
      type: [],
      // 总数
      total: 0,
      // 表格
      tableData: [],
      // 对话框
      formLabelWidth: '120px',
      dialogFormVisible: false,
      postDetails: {},
      post_status: '未通过',
      post_isHome: '暂不处理',
      coverPic: '', // 封面图
      // 点击标题
      dialogTitle: false
    }
  },
  computed: {
    // 搜索条件中，判断是否为精华帖
    isEssences () {
      if (this.formInline.state === '精华帖') {
        return false
      }
      return true
    },
    // 判断是否显示帖子位置单选框
    post_address () {
      if (this.post_status === '精华帖') {
        return true
      }
      return false
    },
    // 判断审核当中图片上传是否显示
    isPic () {
      if ((this.post_status === '精华帖' && (this.post_isHome === '暂不处理' || this.post_isHome === '首页焦点标题' || this.post_isHome === '论坛焦点标题')) || this.post_status !== '精华帖') {
        return false
      }
      return true
    },
    // 判断封面图上传尺寸
    isPicSize () {
      if (this.post_isHome === '论坛列表图' || this.post_isHome === '论坛精选') {
        return true
      }
      return false
    }
  },
  methods: {
    // 获取帖子列表
    async getPostList () {
      if (this.time === null) {
        this.time = []
      }
      this.formInline.postDateS = dateConversion(this.time[0])
      this.formInline.postDateE = dateConversion(this.time[1])
      const { data: res } = await this.$http.post('/invit/showInvit', this.formInline)
      this.tableData = res.l
      this.total = res.num
      // this.formInlineSecond = this.formInline
    },
    // 论坛类型
    async dropDownType (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/invit/getForumInvit')
        this.type = res
      }
    },
    // 当状态发送变化时，判断位置下拉框状态
    changeState () {
      if (this.formInline.state !== '精华帖') {
        this.formInline.home = ''
      }
    },
    // 查询
    submit () {
      this.formInline.pageNo = 1
      this.getPostList()
    },
    // 切换页数
    changePage (index) {
      this.formInline.pageNo = index
      this.getPostList()
    },
    // 点击标题
    async title (row) {
      const { data: res } = await this.$http.post('/invit/getInvit', {
        id: row.id
      })
      this.postDetails = res
      this.dialogTitle = true
    },
    // 审核按钮
    async handleDelete (row) {
      const { data: res } = await this.$http.post('/invit/getInvit', {
        id: row.id
      })
      this.postDetails = res
      this.post_isHome = res.home
      this.post_status = res.state
      this.dialogFormVisible = true
    },
    // 对话框确认按钮
    async essences () {
      if (this.post_status === '精华帖' && (this.post_isHome !== '暂不处理' && this.post_isHome !== '首页焦点标题' && this.post_isHome !== '论坛焦点标题') && this.$refs.new_image.files[0] === undefined) {
        return this.$message.error('请上传封面图')
      }
      if (this.post_isHome === '暂不处理' || (this.post_status === '精华帖' && this.post_isHome === '首页焦点标题') || (this.post_status === '精华帖' && this.post_isHome === '论坛焦点标题') || this.post_status === '未通过' || this.post_status === '通过审核') {
        this.auxiliary()
      } else {
        const formData = new FormData
        formData.append('image_data', this.$refs.new_image.files[0])
        const res = await this.$http.post('/upload/upload2', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (res.status !== 200) {
          return this.$message.error('封面图上传失败')
        }
        this.coverPic = res.data
        this.auxiliary()
      }
    },
    // 不上传封面图
    async auxiliary () {
      const rew = await this.$http.post('/invit/invitSh', {
        id: this.postDetails.id,
        state: this.post_status,
        home: this.post_isHome,
        coverPic: this.coverPic
      })
      if (rew.status !== 200 || rew.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$message.success('审核成功')
      this.dialogFormVisible = false
      this.submit()
    },
    // 跳转评论
    handleSee (row) {
      this.$router.push({
        path: '/forum/comment',
        query: { id: row.id }
      })
    }
  },
  created () {
    // 获取资讯列表
    this.getPostList()
  }
}
</script>

<style lang="less">
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
// 对话框
.el-dialog {
  .all {
    width: 90%;
    img {
      width: 100%;
    }
  }
  .li {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    line-height: 50px;
    h4 {
      margin-right: 20px;
      min-width: 100px;
    }
    .el-radio {
      line-height: 50px;
    }
  }
  #lastLi {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    div {
      color: #999;
      font-size: 13px;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
