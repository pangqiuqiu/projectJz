<template>
  <div>
    <h2>店铺管理</h2>
    <!-- logo上传 -->
    <div class="logo">
      <h4>店铺logo <span>(建议尺寸: 120 x 60)</span></h4>
      <div>
        <input type="file" id="saveImage" name="myphoto" accept="image/png,image/gif,image/jpeg" ref="new_image"> <br />
        <el-button type="primary" size="mini" @click="submitLogo">上传logo</el-button>
      </div>
      <img :src="picLogo" alt="" style="width: 120px; height: 60px">
    </div>
    <!-- 店铺首页轮播图 -->
    <div class="swiper">
      <h4>店铺首页轮播图 <span>(建议尺寸: 400 x 200)</span></h4>
      <img style="width: 200px; height: 100px; margin-right: 10px" :src="item" alt="" v-for="item in photoList" :key="item">
      <Picup></Picup>
      <el-button type="primary" @click="submitLb">上传轮播图</el-button>
    </div>
  </div>
</template>

<script>
import Picup from '../../components/photo/Picup'
import PubSub from 'pubsub-js'
export default {
  components: {
    Picup
  },
  data () {
    return {
      // logo
      picLogo: '',
      photoList: [],
      // 上传店铺首页轮播图
      imgList: [],
      a: []
    }
  },
  methods: {
    // 获取店铺照片
    async getPhoto () {
      const { data: res } = await this.$http.post('/dealer/getLbLogo', {
        token: window.sessionStorage.getItem('token')
      })
      this.picLogo = res.logo
      this.photoList = res.lbList
    },
    // 组件传值获取轮播图照片
    getMsg () {
      PubSub.subscribe('name', (msg, my) => {
        this.imgList = my
      })
    },
    // 提交信息 --- logo
    async submitLogo () {
      if (this.$refs.new_image.files[0] === undefined) {
        return this.$message.error('请先选择logo')
      }
      const formData = new FormData()
      formData.append('image_data', this.$refs.new_image.files[0])
      const res = await this.$http.post('/upload/upload5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.status !== 200 || res.data === '图片上传失败！') {
        return this.$message.error('店铺logo上传失败')
      }
      const abc = await this.$http.post('/dealer/updateLb', {
        logo: res.data,
        token: window.sessionStorage.getItem('token')
      })
      if (abc.status !== 200 || abc.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$message.success('上传成功')
      this.$router.go(0)
    },
    // 轮播图 --- 轮播图
    async submitLb () {
      if (this.imgList.length === 0) {
        return this.$message.error('请上传轮播图')
      }
      const ary = []
      for (var i = 0; i < this.imgList.length; i++) {
        const formData2 = new FormData()
        formData2.append('image_data',  this.imgList[i].file)
        const rew = await this.$http.post('/upload/upload5', formData2, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (rew.status !== 200 || rew.data === '图片上传失败！') {
          return this.$message.error('轮播图上传失败')
        }
        ary.push(rew.data)
      }
      const abc = await this.$http.post('/dealer/updateLb', {
        ary: ary,
        token: window.sessionStorage.getItem('token')
      })
      if (abc.status !== 200 || abc.data !== true) {
        return this.$message.error('操作失败')
      }
      this.$message.success('上传成功')
      this.$router.go(0)
    }
  },
  created () {
    // 获取图片
    this.getMsg()
    // 获取店铺照片
    this.getPhoto()
  }
}
</script>

<style scoped lang="less">
.logo {
  margin: 40px 0;
  .el-button {
    margin: 20px 0;
  }
}
.swiper {
  .el-button {
    margin: 20px 0;
    width: 500px;
  }
}
h4 {
  margin-bottom: 10px;
  span {
    font-size: 13px;
    color: #bbb;
  }
}
</style>
