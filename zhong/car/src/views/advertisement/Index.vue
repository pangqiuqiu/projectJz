<template>
  <div class="all">
    <!-- 背景图 -->
    <img src="../../assets/adv/3.jpg" alt="">
    <!-- 表单 -->
    <div class="userForm">
      <div class="item">
        <span>您的姓名</span>
        <el-input v-model="formInline.name" style="width: 15%"></el-input>
        <span>您的电话</span>
        <el-input v-model="formInline.phone" style="width: 20%"></el-input>
        <span>意向车型</span>
        <el-select v-model="formInline.yxcx" style="width: 25%" placeholder="">
          <el-option label="全新一代阿特兹" value="全新一代阿特兹"></el-option>
          <el-option label="全新CX-4" value="全新CX-4"></el-option>
        </el-select>
      </div>
      <div class="item">
        <span>所在地区</span>
        <el-select v-model="formInline.address" style="width: 25%" placeholder="请选择">
          <el-option label="南昌市" value="南昌市"></el-option>
        </el-select>
        <span>意向经销商</span>
        <el-select v-model="formInline.dealer" style="width: 45%" placeholder="请选择">
          <el-option label="江西戎马汽车发展有限公司" value="江西戎马汽车发展有限公司"></el-option>
          <el-option label="江西省亚泰汽车贸易有限公司" value="江西省亚泰汽车贸易有限公司"></el-option>
          <el-option label="江西省亚泰九江分店" value="江西省亚泰九江分店"></el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button @click="onSubmit">我要报名</el-button>
      </div>
    </div>
    <!-- 轮播图1 -->
    <div class="swiper1">
      <el-carousel indicator-position="outside" :height="imgHeight1 + 'px'">
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/top/1.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/top/2.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/top/3.png`" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图2 -->
    <div class="swiper2">
      <el-carousel indicator-position="outside" :height="imgHeight2+ 'px'">
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/bottom/1.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/bottom/2.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/bottom/3.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/bottom/4.png`" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/adv/yiqimazida/bottom/5.png`" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgHeight1: '', // 图片高度
      imgHeight2: '',
      // 表单项
      formInline: {
        name: '',
        phone: '',
        yxcx: '',
        address: '南昌市',
        dealer: ''
      }
    }
  },
  methods: {
    // 报名
    async onSubmit () {
      if (!(/^1[3456789]\d{9}$/.test(this.formInline.phone))) return this.$message.error('请输入正确的手机号哦')
      if (this.formInline.name.trim().length === 0 || this.formInline.address.trim().length === 0) return this.$message.error('请填写您的姓名和所在地区')
      const res = await this.$http.post('/advs/addYqmzd', this.formInline)
      if (res.data !== true || res.status !== 200) return this.$message.error('报名失败')
      this.$message.success('报名成功')
    }
  },
  mounted () {
    this.imgHeight1 = document.body.clientWidth * 3 / 5 * 357 / 653
    this.imgHeight2 = document.body.clientWidth * 3 / 5 * 275 / 653
  }
}
</script>

<style lang="less" scoped>
.all {
  position: relative;
  .userForm {
    padding: 10px;
    width: 55%;
    background-color: #B90706;
    position: absolute;
    top: 21%;
    left: 50%;
    transform: translateX(-50%);
    .item {
      margin: 20px 0;
    }
    span {
      display: inline-block;
      font-size: 14px;
      color: #fff;
      margin: 0 15px;
    }
    .btn {
      text-align: center;
      .el-button {
        color: #B90706;
        font-weight: bold;
        font-size: 20px;
        padding: 10px 60px;
        margin-bottom: 20px;
      }
    }
  }
  .swiper1 {
    position: absolute;
    top: 61%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    img {
      width: 100%;
    }
  }
  .swiper2 {
    position: absolute;
    top: 76%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    img {
      width: 100%;
    }
  }
}
</style>
