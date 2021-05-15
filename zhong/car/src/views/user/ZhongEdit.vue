<template>
  <div>
    <h4>标题</h4>
    <el-input v-model="formAlign.title"></el-input>
    <h4>摘要</h4>
    <el-input v-model="formAlign.intro"></el-input>
    <!-- 标签 -->
    <h4>标签</h4>
    <el-checkbox-group
      v-model="formAlign.labelList"
      :min="1"
      :max="3">
      <el-checkbox v-for="item in labelAry" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <h4>封面图</h4>
    <img :src="formAlign.coverPic" alt="" style="display: block; margin: 20px 0">
    <!-- 修改封面图 -->
    <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image">
    <div style="font-size: 12px;color: #999;">尺寸为800x400; 图片格式为png/gif/jpeg, 大小不大于2M (如果不修改封面图，可以省略此项)</div>
    <!-- 富文本编辑器 -->
    <Wang class="wang" :title="con" @func="getMsg" v-if="type === '重点号资讯'"></Wang>
    <el-button @click="submit" type="primary">提交</el-button>
  </div>
</template>

<script>
import Wang from '../../components/editor/Wang'
export default {
  components: {
    Wang
  },
  data () {
    return {
      // 资讯视频ID
      zhongId: this.$route.query.id,
      // 类型
      type: (this.$route.query.type === 1 || this.$route.query.type === '1') ? '重点号资讯' : '重点号视频',
      // 标签
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
      // 提交后端数据
      formAlign: {
        title: '',
        intro: '',
        coverPic: '',
        text: '',
        id: '',
        series: '',
        labelList: []
      },
      // 编辑前的内容
      con: ''
    }
  },
  methods: {
    // 获取重点号详情
    async getDetails () {
      const { data: res } = await this.$http.post('/key/getKeyN', {
        id: this.zhongId
      })
      this.con = res.object.text
      this.formAlign.title = res.object.title
      this.formAlign.intro = res.object.intro
      this.formAlign.coverPic = res.object.coverPic
      this.formAlign.series = res.object.series
      this.formAlign.labelList = res.labelList
    },
    // 组件传值
    getMsg (data) {
      this.formAlign.text = data
    },
    // 提交编辑内容
    async submit () {
      this.formAlign.id = this.zhongId
      if (this.$refs.new_image.files[0] === undefined) {
        const res = await this.$http.post('/key/updateKeyN', this.formAlign)
        if (res.data !== true || res.status !== 200) return this.$message.error('提交失败')
        this.$message.success('修改成功')
        this.$router.go(0)
      } else {
        const formData = new FormData()
        formData.append('image_data', this.$refs.new_image.files[0])
        // 单个文件进行上传
        const rew = await this.$http.post('/upload/upload5', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.formAlign.coverPic = rew.data
        const res = await this.$http.post('/key/updateKeyN', this.formAlign)
        if (res.data !== true || res.status !== 200) return this.$message.error('提交失败')
        this.$message.success('修改成功')
        this.$router.go(0)
      }
    }
  },
  mounted () {
    // 获取重点号详情
    this.getDetails()
  }
}
</script>

<style lang="less" scoped>
h4 {
  margin: 5px 0;
}
.el-button {
  width: 100%;
  margin-top: 20px;
}
.wang {
  margin-top: 20px;
}
</style>
