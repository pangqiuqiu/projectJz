<template>
  <div>
    <!-- 头部标题 -->
    <h3>发布文章</h3>
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
        <el-input v-model="form.title" placeholder="请输入标题, 不超过10字符"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="intro">
        <el-input style="width: 400px" placeholder="不超过200字符" type="textarea" :rows="2" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="标签" style="width: 600px">
        <el-checkbox-group
          v-model="form.label"
          :min="1"
          :max="3">
          <el-checkbox v-for="item in labelAry" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 上传封面图 -->
      <el-form-item label="封面图">
        <div style="color: #999; font-size: 12px">封面图尺寸：建议上传尺寸800X400; 图片格式为png/gif/jpeg, 大小不大于2M</div>
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
      </el-form-item>
      <!-- 富文本 -->
      <div class="edit_container" style="width: 1000px">
        <Wangeditor @func="getMsg"></Wangeditor>
      </div>
      <el-form-item>
        <el-button style="width: 400px;" type="primary" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Wangeditor from '../../../components/editor/Wang'
import Cookie from 'js-cookie'
export default {
  components: {
    Wangeditor
  },
  data () {
    return {
      // 品牌车系
      brandList: [],
      seriesList: [],
      // 省份城市
      provinceList: [],
      cityList: [],
      // 标签数组
      labelAry: [
        { label: '大咖评车', link: '/media/bigguy' },
        { label: '用车宝典', link: '/media/manual' },
        { label: '技术解读', link: '/media/technical' },
        { label: '车展', link: '/media/autoshow' },
        { label: '玩车行家', link: '/media/expert' },
        { label: '行业分析', link: '/media/analysis' },
        { label: '自驾旅行', link: '/media/travel' },
        { label: '精选', link: '/media/selected' },
        { label: '新能源车', link: '/media/energy' },
        { label: '热点聚焦', link: '/media/focusing' },
        { label: '汽车文化', link: '/media/culture' }
      ],
      // 表单数据
      form: {
        keyId: Cookie.get('mediaID'),
        type: '重点号资讯',
        coverPic: '', // 封面图
        title: '', // 标题
        intro: '', // 摘要
        brand: '', // 品牌
        series: '', // 车系
        province: '', // 省份
        area: '', // 城市
        text: '', // 正文
        label: ['大咖评车'] // 标签
      },
      // 表单验证
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 10, message: '标题不超过10个字符' }
        ],
        intro: [
          { required: true, message: '请输入摘要', trigger: 'blur' },
          { min: 1, max: 200, message: '不超过200字符', trigger: 'blur' }
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
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/getBrand')
      this.brandList = res
    },
    changeBrand () {
      this.form.series = ''
    },
    // 获取车系
    async getSeries (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/getSeries', {
          brand: this.form.brand
        })
        this.seriesList = res
      }
    },
    // 省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/showProvince')
      this.provinceList = res
    },
    changeProvince () {
      this.form.area = ''
    },
    async getCity (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/area/showCity', {
          provinceid: this.form.province
        })
        this.cityList = res
      }
    },
    // 组件传值 获取富文本内容
    getMsg (data) {
      this.form.text = data
    },
    // 表单提交
    submit () {
      if (this.form.text === '' || this.$refs.new_image.files[0] === undefined) return this.$message.error('请完善封面图和正文内容')
      this.$refs.rulesForm.validate(async valid => {
        if (!valid) return this.$message.error('请完善内容')
        // 上传封面图
        const formData = new FormData()
        formData.append('image_data', this.$refs.new_image.files[0])
        // 单个文件进行上传
        const rew = await this.$http.post('/upload/upload5', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.form.coverPic = rew.data
        // 提交数据
        const res = await this.$http.post('/key/addKeyN', this.form)
        if (res.status !== 200 || res.data !== true) return this.$message.error('提交失败')
        this.$message.success('提交成功')
        this.$router.go(0)
      })
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
    // 获取省份
    this.getProvince()
  }
}
</script>

<style lang="less" scoped>
// 头部标题
h3 {
  margin-bottom: 20px;
}
// 新增表单
.el-form {
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
