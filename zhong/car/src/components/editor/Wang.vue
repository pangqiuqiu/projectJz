<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left;"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  watch: {
    title (newVal) {
      this.editor.txt.html(this.title)
    }
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['title'], // 接收父组件的方法
  mounted () {
    this.editor = new E(this.$refs.editorElem)
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html
      this.$emit('func', this.editorContent)
    }
    // 图片上传
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
    this.editor.customConfig.uploadImgServer = 'https://zhongdianqiche.com:446/upload/upload3' // 图片上传地址
    this.editor.customConfig.uploadFileName = 'image_data' // 图片上传名称
    this.editor.customConfig.debug = true
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片
        const url = result.url
        url.forEach(item => {
          insertImg(item)
        })
        // result 必须是一个 JSON 格式字符串！！！否则报错
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
      // 'link', // 插入链接
      // 'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      // 'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.create() // 创建富文本实例
    // this.editor.txt.html(this.title)
  }
}
</script>
