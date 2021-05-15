<template>
  <div>
    <!-- 头部标题 -->
    <div class="HeadTitle">
      <h3>{{this.title}}</h3>
      <el-button type="text" @click="back">《《 返回</el-button>
    </div>
    <!-- 新增资讯表单 -->
    <el-form label-position="right" label-width="80px" :model="form" :rules="rules" ref="rulesForm">
      <el-form-item label="品牌" prop="brand">
        <el-select filterable v-model="form.brand" placeholder="请选择" @change="changeBrand">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in brandList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车系" prop="series">
        <el-select filterable v-model="form.series" placeholder="请选择" @visible-change="getSeries($event)" :disabled="disabledSeries">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in seriesList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-select filterable v-model="form.province" placeholder="请选择" @change="changeProvince">
          <el-option label="不限" value=""></el-option>
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.province"
            :value="item.provinceid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="area">
        <el-select filterable v-model="form.area" placeholder="请选择" @visible-change="getCity($event)" :disabled="disabledCity">
          <el-option label="不限" value=""></el-option>
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
        <div style="color: #999; font-size: 12px">封面图尺寸：建议上传720x360; 图片格式为png/gif/jpeg, 大小不大于2M</div>
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
      </el-form-item>
      <!-- 富文本 -->
      <div class="edit_container">
        <Wangeditor @func="getMsg"></Wangeditor>
      </div>
      <el-form-item>
        <el-button style="width: 400px;" type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 百度定位 -->
    <div id="allmap"></div>
  </div>
</template>

<script>
import Wangeditor from '../../components/editor/Wangeditor'
export default {
  components: {
    Wangeditor
  },
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
      form: {
        title: '', // 标题
        abstract: '', // 摘要
        author: '', // 作者
        brand: '', //品牌
        series: '', // 车系
        province: '', // 省份
        area: '', // 城市
        content: '', // 正文
        p: '', // 当前省份
        c: '' // 当前城市
      },
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
  computed: {
    disabledSeries () {
      if (this.form.brand !== '') {
        return false
      }
      return true
    },
    disabledCity () {
      if (this.form.province !== '') {
        return false
      }
      return true
    }
  },
  methods: {
    // 获取资讯类型
    getInformationType () {
      const type = this.$route.query.type
      this.title = type
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
    // 组件传值 获取富文本内容
    getMsg (data) {
      this.form.content = data
    },
    // 提交表单 
    submit () {
      if (this.content === '') {
        return
      }
      this.$refs.rulesForm.validate((valid) => {
        if (!valid) {
          this.$message({
            showClose: true,
            message: '请完善表单内容',
            type: 'error'
          })
        } else {
          const formData = new FormData()
          if (this.$refs.new_image.files[0] === undefined) {
            const rew = this.$http.post('/Infor/addInfor', {
              title: this.form.title,
              type: this.title,
              username: this.form.author,
              text: this.form.content,
              intro: this.form.abstract,
              brand: this.form.brand,
              series: this.form.series,
              province: this.form.province,
              area: this.form.area,
              p: this.form.p,
              c: this.form.c
            }).then(rew => {
              if (rew.data === true) {
                this.$message.success('新建资讯成功')
                this.$router.go(-1)
              } else {
                this.$message.error('新建失败')
              }
            })
          } else {
            formData.append('image_data', this.$refs.new_image.files[0])
            // 单个文件进行上传
            this.$http.post('/upload/upload5', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(res => {
              if (res.status !== 200) {
                return
              }
              const rew = this.$http.post('/Infor/addInfor', {
                title: this.form.title,
                type: this.title,
                username: this.form.author,
                text: this.form.content,
                intro: this.form.abstract,
                coverPic: res.data,
                brand: this.form.brand,
                series: this.form.series,
                province: this.form.province,
                area: this.form.area,
                p: this.form.p,
                c: this.form.c
              }).then(rew => {
                if (rew.data === true) {
                  this.$message.success('新建资讯成功')
                  this.$router.go(-1)
                } else {
                  this.$message.error('新建失败')
                }
              })
            })
          }
        }
      })
    },
    // 百度定位
    baidu () {
      // 百度地图API功能
      var map = new window.BMap.Map('allmap')
      var point = new window.BMap.Point(116.331398, 39.897445)
      map.centerAndZoom(point, 18)
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(r => {
        var mk = new window.BMap.Marker(r.point)
        this.form.p = r.address.province
        this.form.c = r.address.city
        map.enableScrollWheelZoom(true) // 鼠标缩放
        map.addOverlay(mk)
        map.panTo(r.point)
      }, { enableHighAccuracy: true })
    }
  },
  created () {
    // 获取资讯类型
    this.getInformationType()
    // 获取品牌
    this.getBrand()
    // 获取省份
    this.getProvince()
  },
  mounted () {
    this.baidu()
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
    margin-top: 20px;
  }
}
// 编辑器
.w-e-text-container {
  height: 600px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
.w-e-text {
  height: 600px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
