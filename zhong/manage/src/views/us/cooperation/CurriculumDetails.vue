<template>
  <div>
    <!-- 标题 -->
    <h3>{{title}}</h3>
    <!-- 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          name="image_data"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.coverPic" :src="ruleForm.coverPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div>尺寸： 220 * 160</div>
      </el-form-item>
      <el-form-item label="课程详情">
        <Wangeditor @func="getMsg" v-if="title === '新增课程'"></Wangeditor>
        <!-- 富文本 -->
        <div class="edit_container" v-else>
          <div ref="editorMenu" style="width: 1000px;border:1px solid #ccc;"></div>
          <div ref="editorElem" style="text-align: left; width: 1000px; height: 500px; border:1px solid #ccc;"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width: 400px" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Wangeditor from '../../../components/editor/Wangeditor'
import E from 'wangeditor'
export default {
  components: {
    Wangeditor
  },
  data () {
    return {
      // 页面标题
      title: '',
      // 上传接口
      action: 'https://www.zhongdianqiche.com:447/upload/upload5',
      // 参数
      ruleForm: {
        name: '', // 课程名
        content: '', // 详情
        coverPic: '' // 封面图
      },
      editor: null,
      // 校验
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, message: '长度不少于 3 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 图片上传
    handleAvatarSuccess(res) {
      this.ruleForm.coverPic = res
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) return this.$message.error('上传头像图片大小不能超过 2MB!')
    },
    // 详情
    getMsg (data) {
      this.ruleForm.content = data
    },
    // 提交
    submitForm (formName) {
      if (!this.ruleForm.coverPic) return this.$message.error('请上传封面图')
      if (!this.ruleForm.content) return this.$message.error('请填写合作详情')
      this.$refs[formName].validate(async valid => {
        if (!valid) return this.$message.error('请完善相关内容')
        if (this.title === '新增课程') {
          const { data: res } = await this.$http.post('/us/addCourse', this.ruleForm)
          if (!res) return this.$message.error('提交失败')
          this.$message.success('提交成功')
          this.$router.go(-1)
        } else {
          const { data: res } = await this.$http.post('/us/updateCourse', this.ruleForm)
          if (!res) return this.$message.error('提交失败')
          this.$message.success('提交成功')
          this.$router.go(-1)
        }
      })
    }
  },
  async created () {
    if (!this.$route.query.id) {
      this.title = '新增课程'
    } else {
      this.title = '修改课程'
      const { data: res } = await this.$http.post('/us/getCourse', { id: this.$route.query.id })
      this.ruleForm = res
      this.editor.txt.html(res.content)
    }
  },
  mounted () {
    if (this.title === '修改课程') {
      this.editor = new E(this.$refs.editorMenu, this.$refs.editorElem)
      this.editor.customConfig.onchange = html => {
        this.ruleForm.content = html
      }
      // 图片上传
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      this.editor.customConfig.uploadImgServer = 'https://zhongdianqiche.com:447/upload/upload3'
      this.editor.customConfig.uploadFileName = "image_data"
      this.editor.customConfig.debug = true
      this.editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          const url = result.url
          url.forEach(item => {
            insertImg(item)
          })
        }
      }
      this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        // 'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.customConfig.linkCheck = function (text, link) {
      if (link !== "") {
        const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
          if (!reg.test(link)) {
            return '请输入正确的网址(例如 http://baidu.com)'
          } else{
            return true
          }
        }
      }
      this.editor.create() // 创建富文本实例
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  margin-bottom: 20px;
}
// 上传图片
.avatar-uploader {
  width: 260px;
  img {
    width: 220px;
    height: 160px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 218px;
  height: 158px;
  line-height: 158px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
</style>
