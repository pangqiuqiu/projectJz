<template>
  <div>
    <!-- 头部标题 -->
    <div class="HeadTitle">
      <h3>{{this.title}}</h3>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 新增资讯表单 -->
    <el-form label-position="right" label-width="80px" :model="form" ref="rulesForm">
      <el-form-item label="品牌">
        <el-input v-model="form.brand" disabled></el-input>
      </el-form-item>
      <el-form-item label="车系">
        <el-input v-model="form.series" disabled></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="form.province" disabled></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.city" disabled></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" disabled></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input style="margin-bottom: 10px;" disabled type="textarea" :rows="2" v-model="form.abstract"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" disabled></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <img :src="this.pic" alt="">
      </el-form-item>
      <!-- 富文本 -->
      <div class="edit_container">
        <div ref="editorMenu" style="width: 1000px;border:1px solid #ccc;"></div>
        <div ref="editorElem" style="text-align: left; width: 1000px; height: 500px; border:1px solid #ccc;"></div>
      </div>
    </el-form>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      // 资讯标题
      title: '',
      // 表单数据
      form: {
        title: '', // 标题
        abstract: '', // 摘要
        author: '', // 作者
        brand: '',
        series: '',
        province: '',
        city: '',
        editorContent: '' // 正文
      },
      // 图片
      pic: ''
    }
  },
  methods: {
    // 获取资讯
    async getInformationType () {
      const id = this.$route.query.id
      const { data: res } = await this.$http.post('/Infor/getOneInfor', {
        id: id
      })
      this.pic = res.coverPic
      this.title = res.type
      this.form.title = res.title
      this.form.abstract = res.intro
      this.form.author = res.username
      this.form.province = res.province
      this.form.city = res.area
      this.form.brand = res.brand
      this.form.series = res.series
      this.form.editorContent = this.editor.txt.html(res.text)
    },
    // 返回上一页面
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    // 获取资讯
    this.getInformationType()
  },
  mounted () {
    this.editor = new E(this.$refs.editorMenu, this.$refs.editorElem)
    // 上传本地base64格式图片
    this.editor.customConfig.uploadImgShowBase64 = true
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.form.editorContent = html
      // this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
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
</script>

<style lang="less" scoped>
// 头部标题
.HeadTitle {
  display: flex;
  justify-content: space-between;
  background-color: #f7f8f9;
  padding-left: 30px;
  height: 50px;
  line-height: 50px;
}
// 新增表单
.el-form {
  margin-top: 30px;
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-input {
    margin-bottom: 10px;
    width: 400px;
  }
  .el-button {
    margin-top: 20px;
  }
}
</style>
