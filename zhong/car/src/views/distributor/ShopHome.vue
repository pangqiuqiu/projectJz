<template>
  <el-container class="w">
    <!-- 左侧主体区域 -->
    <el-main width="830px">
      <div class="swiper">
        <!-- 经销商展示区域 -->
        <div class="block" v-show="lunbotu">
          <el-carousel height="200px">
            <el-carousel-item v-for="item in LunBo" :key="item.id">
              <h3 class="small">
                <img :src="item" alt="">
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 本周推荐 -->
      <div class="ThisWeek">
        <!-- 标题 -->
        <div class="title">
          <h3>近期推荐</h3>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 详情 -->
        <ul>
          <li v-for="(item,index) in weekList" :key="index">
            <!-- 左侧图片 -->
            <div><img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/series/${item.series}.jpg`" alt=""></div>
            <!-- 右侧相关介绍 -->
            <div>
              <div class="every">
                <!-- 价格 -->
                <div>
                  <h4>{{item.series}}</h4>
                  <div>
                    <label>促销价:</label> <span style="color: #EB3030;">{{item.offer | price}}</span>
                  </div>
                </div>
                <!-- 级别 -->
                <div>
                  <div>
                    <label>级别:</label> <span>{{item.level}}</span>
                  </div>
                  <div>
                    <label>排量:</label> <span>{{item.engine}}</span>
                  </div>
                </div>
                <!-- 驱动方式 -->
                <div>
                  <div>
                    <label>驱动方式:</label> <span>{{item.driveWay}}</span>
                  </div>
                  <div>
                    <label>变速箱:</label> <span>{{item.gearBox}}</span>
                  </div>
                </div>
              </div>
              <!-- 获取底价 -->
                <div class="btn">
                  <el-button type="primary" size="mini" @click="bottomPrice(item.id)">获取底价</el-button>
                  <el-button size="mini" type="success" @click="testDrive(item.id)">预约试驾</el-button>
                </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 客户留言 -->
      <div class="customer" style="margin-top: 20px;">
        <div class="btn">
          <h3>客户留言</h3>
          <el-button type="text" @click="logining">登录/注册</el-button>
        </div>
        <div class="message">
          <el-input v-model="textarea" placeholder="请输入您的留言"></el-input>
          <div class="btn1">
            <el-button @click="submit" type="primary">提交留言</el-button>
          </div>
        </div>
      </div>
    </el-main>
    <!-- 右侧区域 -->
    <el-aside style="padding-top: 20px;">
      <Distributor></Distributor>
    </el-aside>
    <!-- 获取底价对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :info="msg" width="40%">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Distributor from '../../components/Distributor.vue'
import Cookie from 'js-cookie'
const id = window.sessionStorage.getItem('distributorId')
export default {
  components: {
    Distributor
  },
  data () {
    return {
      // 经销商轮播图
      LunBo: [],
      lunbotu: false,
      // 本周推荐
      weekList: [],
      // 留言框
      textarea: '',
      // 对话框
      title: '',
      msg: 0, // 获取对话框id
      dialogFormVisible: false,
      form: {
        name: '',
        phone: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    // 经销商轮播图
    this.getLunBo()
    // 本周推荐
    this.week()
  },
  filters: {
    price (data) {
      if (data === '0' || data === null) {
        return '暂无'
      }
      return data + '万元'
    }
  },
  methods: {
    // 经销商轮播图
    async getLunBo () {
      const { data: res } = await this.$http.post(`/dealer/getDealerLb`, {
        id: id
      })
      if (res === false) {
        this.lunbotu = false
      } else {
        this.lunbotu = true
        this.LunBo = res
      }
    },
    infor (id) {
      const { href } = this.$router.resolve({
        path: '/automotivelnformation/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 本周推荐
    async week () {
      const { data: res } = await this.$http.post(`/dealer/tj`, {
        dealerId: id
      })
      this.weekList = res
    },
    // 获取低价
    bottomPrice (id) {
      this.title = '获取底价'
      this.dialogFormVisible = true
      this.msg = id
    },
    // 预约驾驶
    testDrive (id) {
      this.title = '预约试驾'
      this.dialogFormVisible = true
      this.msg = id
    },
    // 点击对话框确定按钮
    async determine () {
      if (this.form.phone === '' || this.form.name === '') {
        return this.$message.error('请输入手机号和姓名')
      }
      const mobile = /^1[3456789]\d{9}$/
      if (!mobile.test(this.form.phone)) {
        return this.$message.error('手机号不合法')
      }
      const res = await this.$http.post(`/dealer/addXs`, {
        dealerId: window.sessionStorage.distributorId,
        carId: this.msg,
        type: this.title,
        name: this.form.name,
        phone: this.form.phone
      })
      // console.log(res)
      if (res.data === true && res.status === 200) {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
      } else {
        return this.$message.success('提交失败')
      }
    },
    // 跳转登录页面
    logining () {
      this.$router.push('/login/login')
    },
    // 提交用户留言
    async submit () {
      // 先判断是否登录
      const user = Cookie.get('token')
      const ID = Cookie.get('ID')
      if (!user || !ID) {
        return this.$message({
          message: '请先登录/注册',
          type: 'warning',
          duration: 1000
        })
      }
      if (this.textarea.trim().length === 0) {
        return this.$message({
          showClose: true,
          message: '留言内容不能为空',
          type: 'warning'
        })
      }
      const res = await this.$http.post(`/dealer/message`, {
        dealerId: id,
        userId: window.sessionStorage.getItem('ID'),
        other: this.textarea
      })
      if (res.data === true && res.status === 200) {
        this.textarea = ''
        return this.$message({
          message: '留言发送成功',
          type: 'success'
        })
      } else {
        this.$message.error('留言发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 轮播图区域
.swiper {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  .block {
    width: 400px;
    margin-right: 30px;
  }
}
// 本周推荐
.ThisWeek {
  // 标题
  .title {
    height: 50px;
    line-height: 50px;
  }
  // 详情
  ul {
    li {
      display: flex;
      justify-content: flex-start;
      margin-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #ccc;
    }
    li:last-of-type {
      border: 0;
    }
    img {
      width: 280px;
      margin-right: 40px;
    }
    .btn {
      margin-top: 30px;
    }
    .every {
      h4 {
        margin-right: 50px;
        margin-bottom: 20px;
      }
      >div {
        display: flex;
        justify-content: flex-start;
        >div {
          display: inline-block;
          width: 180px;
          margin-bottom: 3px;
        }
        label {
          color: #111111;
          font-size: 15px;
        }
        span {
          color: #333333;
          font-size: 15px;
        }
      }
    }
  }
}
// 客户留言
.customer {
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .message {
    margin-top: 10px;
    .el-input {
      margin-bottom: 10px;
    }
  }
  .btn1 {
    text-align: right;
  }
}
</style>
