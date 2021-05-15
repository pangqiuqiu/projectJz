<template>
  <div id="wangeditor">
    <div class="one" style="color: #333">注: 富文本编辑器中单张图片大小不超过2M, 否则无法上传</div>
    <div ref="editorMenu" style="width: 1000px;border:1px solid #ccc;"></div>
    <div class="editorElem" ref="editorElem" style="text-align: left; width: 1000px; height: 500px; border:1px solid #ccc;"></div>
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
  mounted () {
    this.editor = new E(this.$refs.editorMenu, this.$refs.editorElem)
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html
      this.$emit('func', this.editorContent)
    }
    // 图片上传
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 限制图片大小2M
    this.editor.customConfig.uploadImgServer = 'https://zhongdianqiche.com:447/upload/upload3' // 图片上传地址
    this.editor.customConfig.uploadFileName = "image_data" // 图片上传名称
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
    // 超链接验证
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
#wangeditor {
  margin-top: 20px;
  .one {
    margin-bottom: 10px;
  }
}
.editorElem {
  table {
    width: 100%;
  }
}
</style>
