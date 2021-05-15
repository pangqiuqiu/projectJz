<template>
  <div>
    <!-- 头部标题 -->
    <div class="HeadTitle">
      <h3>{{this.title}}</h3>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 新增资讯表单 -->
    <el-form label-position="right" label-width="80px" :model="form" :rules="rules" ref="rulesForm">
      <el-form-item label="品牌">
        <el-select v-model="form.brand" placeholder="请选择" @change="changeBrand">
          <el-option
            v-for="item in brandList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车系">
        <el-select v-model="form.series" placeholder="请选择" @visible-change="getSeries($event)">
          <el-option
            v-for="item in seriesList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-select filterable v-model="form.province" placeholder="请选择" @change="changeProvince">
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.province"
            :value="item.provinceid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select filterable v-model="form.area" placeholder="请选择" @visible-change="getCity($event)">
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.city"
            :value="item.cityid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题，不超过10个字符"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input style="margin-bottom: 10px;" placeholder="不超过120字" type="textarea" :rows="2" v-model="form.abstract"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="请输入作者名称"></el-input>
      </el-form-item>
      <!-- 上传封面图 -->
      <el-form-item label="封面图">
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
        <div style="font-size: 12px;color: #999;">(如需更改封面图请重新上传，否则可直接跳过)尺寸为800x400; 图片格式为png/gif/jpeg, 大小不大于2M</div>
      </el-form-item>
      <img :src="this.pic" alt="">
      <!-- 富文本 -->
      <div class="edit_container">
        <div ref="editorMenu" style="width: 1000px;border:1px solid #ccc;"></div>
        <div ref="editorElem" style="text-align: left; width: 1000px; height: 500px; border:1px solid #ccc;"></div>
      </div>
      <el-form-item>
        <el-button style="width: 400px;" type="primary" @click="submit()">提交</el-button>
      </el-form-item>
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
      // 品牌车系
      brandList: [],
      seriesList: [],
      // 省份城市
      provinceList: [],
      cityList: [],
      // 表单数据
      editor: null,
      form: {
        title: '', // 标题
        abstract: '', // 摘要
        author: '', // 作者
        brand: '', //品牌
        series: '', // 车系
        province: '', // 省份
        area: '', // 城市
        editorContent: '' // 正文
      },
      // 图片
      pic: '',
      // 表单验证
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
          { min: 1, max: 120, message: '不超过120字', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ]
      }
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
      this.form.brand = res.brand
      this.form.series = res.series,
      this.form.province = res.province
      this.form.area = res.area
      this.form.editorContent = this.editor.txt.html(res.text)
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    changeBrand () {
      this.form.series = ''
    },
    // 获取车系
    async getSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/showSeries', {
          brand: this.form.brand
        })
        this.seriesList = res
      }
    },
    // 省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/getProvince')
      this.provinceList = res
    },
    changeProvince () {
      this.form.area = ''
    },
    async getCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/getCityByPid', {
          provinceId: this.form.province
        })
        this.cityList = res
      }
    },
    // 返回上一页面
    back () {
      this.$router.go(-1)
    },
    // 提交表单
    submit () {
      this.$refs.rulesForm.validate((valid) => {
        if (!valid) {
          this.$message({
            showClose: true,
            message: '请完善表单内容',
            type: 'warning'
          })
        } else {
          const formData = new FormData()
          if (this.$refs.new_image.files[0] === undefined) {
            const id = this.$route.query.id
            const rew = this.$http.post('/Infor/updateInfor', {
              id: id,
              token: window.sessionStorage.getItem('token'),
              title: this.form.title,
              type: this.title,
              username: this.form.author,
              text: this.form.editorContent,
              intro: this.form.abstract,
              brand: this.form.brand,
              series: this.form.series,
              province: this.form.province,
              area: this.form.area
            }).then(rew => {
              if (rew.data === true) {
                this.$message.success('编辑成功')
              } else {
                this.$message.error('提交失败')
              }
            })
          } else {
            formData.append('image_data', this.$refs.new_image.files[0])
            formData.append('coverPic', this.pic)
            //单个文件进行上传
            this.$http.post('/upload/upload5', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              if (res.status !== 200) {
                return alert('图片上传失败')
              }
              const id = this.$route.query.id
              const rew = this.$http.post('/Infor/updateInfor', {
                id: id,
                token: window.sessionStorage.getItem('token'),
                title: this.form.title,
                type: this.title,
                username: this.form.author,
                text: this.form.editorContent,
                intro: this.form.abstract,
                coverPic: res.data,
                brand: this.form.brand,
                series: this.form.series,
                province: this.form.province,
                area: this.form.area
              }).then(rew => {
                if (rew.data === true) {
                  this.$message.success('编辑成功')
                } else {
                  this.$message.error('提交失败')
                }
              })
            })
          }
        }
      })
    }
  },
  created () {
    // 获取资讯
    this.getInformationType()
    // 获取品牌
    this.getBrand()
    // 获取省份
    this.getProvince()
  },
  mounted () {
    this.editor = new E(this.$refs.editorMenu, this.$refs.editorElem)
    // 上传本地base64格式图片
    // this.editor.customConfig.uploadImgShowBase64 = true
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.form.editorContent = html
      // this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
    }
    // 图片上传
    this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
    this.editor.customConfig.uploadImgServer = 'https://zhongdianqiche.com:447/upload/upload3' // 图片上传地址
    this.editor.customConfig.uploadFileName = "image_data" // 图片上传名称
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
    margin-bottom: 15px;
  }
  .el-select {
    margin-bottom: 10px;
    width: 400px;
  }
  .el-input {
    margin-bottom: 10px;
    width: 400px;
  }
  .el-button {
    margin-top: 50px;
  }
}
</style>
