<template>
  <div>
    <!-- 首页导航 -->
    <Header></Header>
    <!-- 标题 -->
    <div class="w title">
      <h2>【特卖】{{this.speciaLaction}}{{this.automobileInformation.label}}特卖，免费询底价！【{{this.monthDate}}月{{this.dayDate}}日 {{this.weekDate}}】</h2>
    </div>
    <!-- 图片展示区间 -->
    <div class="exhibition w">
      <div class="left">
        <img v-for="(item,index) in swiperRadio" :key="item.label" :src="item.pic" alt="" v-show="index === currentIndex">
        <img class="image" src="../../assets/special/3.png" alt="">
      </div>
      <div class="right">
        <h2>近一周已有<span>{{this.week}}</span>人询价 近一月累计<span>{{this.month}}</span>人询价（全国）</h2>
        <el-divider></el-divider>
        <!-- 地点指导价特卖价 -->
        <div class="what">
          <div>
            <label>地点：</label>
            <span>{{this.where}}</span>
          </div>
          <div>
            <label>指导价：</label>
            <span style="text-decoration: line-through;">{{this.automobileInformation.baojia}}</span>
          </div>
          <div>
            <label>特卖价：</label>
            <span>{{this.price}}</span>
          </div>
        </div>
        <!-- 购车保障 -->
        <div class="guarantee">
          <label>购车保障</label>
          <el-tag type="success" size="mini">免费参加</el-tag>
          <el-tag type="success" size="mini">低价保证</el-tag>
          <el-tag type="success" size="mini">新车保证</el-tag>
          <el-tag type="success" size="mini">质量保证</el-tag>
          <el-tag type="success" size="mini">售后保证</el-tag>
        </div>
        <!-- 福利待遇 -->
        <div class="welfare">
          <div>
            <h4>厂家红利</h4>
            <span>区域品牌特卖价更优</span>
          </div>
          <div>
            <h4>报名优惠</h4>
            <span>专员及时回访，把握实时优惠</span>
          </div>
          <div>
            <h4>车源保障</h4>
            <span>区域活动指定经销商，信誉可靠优先提车</span>
          </div>
          <div>
            <h4>现场解答</h4>
            <span>教你上牌，保险等如何省钱，杜绝乱收费</span>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <el-divider></el-divider>
    </div>
    <!-- 用户信息填写 -->
    <div class="write w">
      <!-- 选择车型 -->
      <div class="type">
        <h5>选择车型</h5>
        <div style="width: 800px;">
          <el-radio-group size="mini" @change="changeType(index)" v-model="radio" v-for="(value,index) in automobileInformation.children" :key="value.label">
            <el-radio-button :label="value.label"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <!-- 相关信息 -->
      <div class="information">
        <h5>填写相关信息</h5>
        <el-form :rules="rules" ref="ruleForm" label-position="left" label-width="120px" :model="formLabelAlign">
          <el-form-item label="您的姓名" prop="username">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="您的手机号" prop="phone">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>
          <el-form-item label="购车城市">
            <div class="city">
              <el-select @change="change" style="margin-right: 20px;" v-model="formLabelAlign.province" placeholder="请选择">
                <el-option
                  v-for="item in provinceAry"
                  :key="item.province"
                  :label="item.province"
                  :value="item.provinceid">
                </el-option>
              </el-select>
              <el-select :disabled="isDisabled1" v-model="formLabelAlign.city" placeholder="请选择">
                <el-option
                  v-for="item in cityAry"
                  :key="item.cityid"
                  :label="item.city"
                  :value="item.cityid">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitForm">我要询价</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 主体区域 -->
    <div class="main w">
      <div class="left">
        <!-- 最新询价 -->
        <div class="inquiry">
          <h4>最新询价</h4>
          <el-divider></el-divider>
          <vue-seamless-scroll :data="mobileAry" :class-option="classOption" class="warp">
            <ul class="item">
              <li v-for="item in mobileAry" :key="item.enquiryDate">
                <span class="title" v-text="item.name"></span>
                <span class="date" v-text="item.phone"></span>
                <span class="date" v-text="item.brand"></span>
                <span class="date" v-text="item.time"></span>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
        <!-- 车型列表 -->
        <div v-if="isParameter">
          <h4>车型列表 <span style="font-size: 12px; color: #999;"> (选择上方不同车型，查看不同配置)</span></h4>
          <el-divider></el-divider>
          <div class="titleing">
            <span style="width: 400px; padding-left: 10px">具体车型</span>
            <span style="width: 200px;">指导价</span>
            <span>配置信息</span>
          </div>
          <div class="vehicleList" v-for="(item,index) in tableData" :key="item.id">
            <div class="items">
              <div style="width: 400px;cursor: pointer;padding-left: 10px" @click="see(index)">{{item.b}}</div>
              <div style="width: 200px;"><del>{{item.o.厂商指导价}}</del></div>
              <div style="width: 100px;">
                <el-button @click="see(index)" type="danger" size="mini">查看</el-button>
              </div>
              <div style="width: 190px;">
                <el-button type="primary" size="mini" @click="dialogVisibleing(item.b)">特卖价</el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <!-- 买家点评 -->
        <div class="buyersComments" v-if="isParameter" v-show="false">
          <h4>买家点评</h4>
          <el-divider></el-divider>
          <!-- 点评内容 -->
          <ul>
            <li v-for="(item,index) in commentContentAry" :key="index" style="height: 100%">
              <h3 @click="postList(item.id)">{{item.title}}</h3>
              <div>发表于 {{item.postDate}}</div>
            </li>
          </ul>
        </div>
        <!-- 参数配置 -->
        <div class="matching" v-if="!isParameter">
          <!-- 标题 -->
          <div class="head">
            <h4>参数配置</h4>
            <el-button type="primary" @click="returnMain" size="mini">返回</el-button>
          </div>
          <div class="middle">
            <div v-for="(value,k,i) in tableDataObj" :key="i" class="items">
              <div>{{k}}</div>
              <div>{{value}}</div>
            </div>
          </div>
        </div>
        <!-- 活动花絮 -->
        <div class="myhobby">
          <span>活动花絮</span>
          <img src="../../assets/special/2.png" alt="">
        </div>
        <!-- 对话框 -->
        <el-dialog title="请填写相关信息" :visible.sync="specialSaleingDialogVisible" width="40%">
          <el-form :model="specialSaleing" :rules="specialSaleingRules" ref="specialSaleingRef" label-width="70px">
            <el-form-item label="款式" prop="careful">
              <el-input v-model="specialSaleing.careful" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
              <el-input v-model="specialSaleing.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="specialSaleing.phone"></el-input>
            </el-form-item>
            <el-form-item label="购车城市">
              <div class="city">
                <el-select @change="changeindex" style="margin-right: 20px;" v-model="specialSaleing.province" placeholder="请选择">
                  <el-option
                    v-for="item in provinceAry"
                    :key="item.province"
                    :label="item.province"
                    :value="item.provinceid">
                  </el-option>
                </el-select>
                <el-select :disabled="isDisabled2" v-model="specialSaleing.city" placeholder="请选择">
                  <el-option
                    v-for="item in cityAry"
                    :key="item.cityid"
                    :label="item.city"
                    :value="item.cityid">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="specialSaleingDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="specialSaleingUserInfo">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="right">
        <!-- 服务保障 -->
        <div class="service">
          <h4>服务保障</h4>
          <el-divider></el-divider>
          <ul>
            <li>
              <img src="../../assets/icon/zhenshi@2x.png" alt="">
              <div>
                <span>真实保证</span>
                <span>保证现场服务真实性</span>
              </div>
            </li>
            <li>
              <img src="../../assets/icon/cheyuan@2x.png" alt="">
              <div>
                <span>车源保证</span>
                <span>甄选优质经销商，保证车源</span>
              </div>
            </li>
            <li>
              <img src="../../assets/icon/dijia@2x.png" alt="">
              <div>
                <span>底价保证</span>
                <span>众多经销商逐一询价，价格有保证</span>
              </div>
            </li>
            <li>
              <img src="../../assets/icon/zhiliang@2x.png" alt="">
              <div>
                <span>质量保证</span>
                <span>甄选优质经销商，保证质量</span>
              </div>
            </li>
            <li>
              <img src="../../assets/icon/mianfei@2x.png" alt="">
              <div>
                <span>免费参加保证</span>
                <span>活动不收取任何费用，免费参加</span>
              </div>
            </li>
            <li>
              <img src="../../assets/icon/shouhou@2x.png" alt="">
              <div>
                <span>售后保证</span>
                <span>有质量问题协助售后解决</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import BMap from 'BMap'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {
    Header,
    vueSeamlessScroll
  },
  data () {
    // 验证手机号正则
    let mobile = /^[1]([3-9])[0-9]{9}$/
    let isMobile = (rule, value, callback) => {
      if (!mobile.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      // 定位
      speciaLaction: '',
      monthDate: '',
      dayDate: '',
      weekDate: '',
      // 搜索框
      search: '',
      // 车型选择
      radio: '',
      swiperRadio: [],
      currentIndex: 0,
      // 汽车信息
      brand: '',
      automobileInformation: {},
      where: '正规经销商',
      price: '免费询价',
      // 周询价
      week: '',
      // 月询价
      month: '',
      // 省份数组
      provinceAry: [],
      // 城市数组
      cityAry: [],
      // 禁用城市选择框
      isDisabled1: true,
      isDisabled2: true,
      // 这是表单的数据绑定对象
      formLabelAlign: {
        name: '',
        phone: '',
        province: '',
        city: '',
        brand: '',
        series: '',
        url: document.referrer
      },
      // 跳转经销商页面传递的参数
      editForm: {},
      // 这是表单的验证规则对象
      rules: {
        // 验证手机号是否合法
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isMobile }
        ]
      },
      // 复选框
      checkList: [],
      // 最新询价
      mobileAry: [],
      // 车型
      tableData: [],
      tableDataObj: {},
      // 查看参数配置
      isParameter: true,
      // 对话框数据
      specialSaleingDialogVisible: false,
      specialSaleing: {
        careful: '',
        name: '',
        mobile: '',
        province: '',
        city: '',
        brand: '',
        series: '',
        url: document.referrer
      },
      specialSaleingRules: {
        // 验证手机号是否合法
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isMobile }
        ]
      },
      // 点评内容
      commentContentAry: []
    }
  },
  methods: {
    // 获取汽车信息
    async getAutomobileInformation () {
      const brand = JSON.parse(this.$route.query.id).brand
      const { data: res } = await this.$http.post(`/sale/getSale`, {
        brand: brand,
        city: window.sessionStorage.getItem('specialSaleDetails')
      })
      this.swiperRadio = res.children // 图片数组
      this.automobileInformation = res
      this.radio = JSON.parse(this.$route.query.id).series || this.automobileInformation.children[0].label
      // 车型列表
      this.gettableDataAry()
    },
    // 月询价
    async getMonth () {
      const brand = JSON.parse(this.$route.query.id).brand
      const { data: res } = await this.$http.post(`/sale/getYxj`, {
        brand: brand,
        city: window.sessionStorage.getItem('specialSaleDetails')
      })
      // console.log(res)
      this.month = res
    },
    // 周询价
    async getWeek () {
      const brand = JSON.parse(this.$route.query.id).brand
      const { data: res } = await this.$http.post(`/sale/getZxj`, {
        brand: brand,
        city: window.sessionStorage.getItem('specialSaleDetails')
      })
      // console.log(res)
      this.week = res
    },
    // 获取省份
    async getProvince () {
      const { data: res } = await this.$http.post('/area/showProvince')
      // console.log(res)
      this.provinceAry = res
    },
    // 获取城市
    async change () {
      this.isDisabled1 = false
      this.formLabelAlign.city = ''
      const { data: res } = await this.$http.post('/area/showCity', {
        provinceid: this.formLabelAlign.province
      })
      // console.log(res)
      this.cityAry = res
    },
    // 改变单选框车型
    changeType (index) {
      this.currentIndex = index
      this.gettableDataAry()
    },
    // 点击我要询价按钮
    onSubmitForm () {
      if (this.radio === '') {
        return this.$message.error('请选择车系')
      }
      if (this.formLabelAlign.username === '' || this.formLabelAlign.province === '' || this.formLabelAlign.city === '') {
        return this.$message.error('请完善表单内容')
      }
      // console.log(this.formLabelAlign.username)
      this.$refs.ruleForm.validate(async valid => {
        const brand = JSON.parse(this.$route.query.id).brand
        if (valid) {
          this.formLabelAlign.brand = brand
          this.formLabelAlign.series = this.radio
          // 提交后台数据
          const res = await this.$http.post('/sale/addEnquiry2', this.formLabelAlign)
          if (res.status !== 200 || res.data !== true) return this.$message.error('提交失败')
          this.$message.success('提交成功')
        }
      })
    },
    // 最新询价表格
    async getmobileList () {
      const { data: res } = await this.$http.post('/sale/getNewenq')
      this.mobileAry = res
    },
    // 车型列表
    async gettableDataAry () {
      const brand = JSON.parse(this.$route.query.id).brand
      const { data: res } = await this.$http.post(`/sale/getSaleChe`, {
        brand: brand,
        series: this.radio
      })
      this.tableData = res
    },
    // 解除禁用
    async changeindex () {
      this.isDisabled2 = false
      this.specialSaleing.city = ''
      const { data: res } = await this.$http.post('/area/showCity', {
        provinceid: this.specialSaleing.province
      })
      this.cityAry = res
    },
    // 点击查看按钮
    see (index) {
      // 隐藏汽车列表
      this.isParameter = false
      // 获取参数配置项
      this.tableDataObj = this.tableData[index].o
    },
    // 点击特卖价按钮
    dialogVisibleing (b) {
      this.specialSaleingDialogVisible = true
      // 展示对话框
      this.specialSaleing.careful = b
    },
    // 点击对话框确认
    specialSaleingUserInfo () {
      if (this.specialSaleing.name === '' || this.specialSaleing.province === '' || this.specialSaleing.city === '') {
        return this.$message.error('请完善内容')
      }
      this.$refs.specialSaleingRef.validate(async valid => {
        const brand = JSON.parse(this.$route.query.id).brand
        if (!valid) return
        this.specialSaleing.brand = brand
        this.specialSaleing.series = this.radio
        // 提交后台数据
        const res = await this.$http.post('/sale/addEnquiry2', this.specialSaleing)
        if (res.status !== 200 || res.data !== true) {
          return this.$message.error('提交失败')
        }
        this.$message.success('提交成功')
        this.specialSaleingDialogVisible = false
      })
    },
    // 返回主页面
    returnMain () {
      this.isParameter = true
    },
    // 买家点评数据
    async getBuyersCommentsList () {
      const brand = JSON.parse(this.$route.query.id).brand
      const { data: res } = await this.$http.post('/sale/getDp', {
        brand: brand
      })
      this.commentContentAry = res
    },
    postList (id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取省份信息
    this.getProvince()
    // 最新询价表格
    this.getmobileList()
    // 买家点评
    this.getBuyersCommentsList()
    // 获取当前日期
    var myDate = new Date()
    this.monthDate = myDate.getMonth() + 1
    this.dayDate = myDate.getDate()
    const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.weekDate = weeks[myDate.getDay()]
  },
  mounted () {
    var geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(r => {
      window.sessionStorage.setItem('specialSaleDetails', r.address.city)
      this.speciaLaction = r.address.city
      // 获取汽车信息
      this.getAutomobileInformation()
      // 月询价
      this.getMonth()
      // 周询价
      this.getWeek()
    }, { enableHighAccuracy: true })
  },
  computed: {
    classOption: function () {
      return {
        step: 0.5,
        limitMoveNum: 5
      }
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: auto;
}
// 标题
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
}
// 展示区域
.exhibition {
  margin-bottom: 20px;
  .left {
    position: relative;
    float: left;
    width: 460px;
    margin-right: 30px;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
    .image {
      position: absolute;
      width: 100px;
      left: 0;
    }
  }
  .right {
    float: left;
    width: 700px;
    h2 {
      font-weight: 400;
      font-size: 20px;
      height: 50px;
      span {
        font-size: 30px;
        font-weight: 700;
        color: red;
      }
    }
    .what {
      margin: 20px 0;
      font-size: 13px;
      >div {
        margin-bottom: 10px;
      }
      label {
        color: #333333;
      }
      span {
        color: #999999;
      }
    }
    .guarantee {
      label {
        color: #333333;
        font-size: 14px;
        margin-right: 25px;
      }
      .el-tag {
        margin-right: 10px;
      }
    }
    .welfare {
      >div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 8px;
        h4 {
          font-size: 17px;
          color: red;
          margin-right: 20px;
        }
        span {
          font-size: 13px;
        }
      }
    }
  }
}
// 用户信息填写
.write {
  margin-top: 20px;
  h5 {
    margin-bottom: 15px;
  }
  .type {
    .el-radio-button {
      margin: 0 10px 15px 0;
    }
  }
  .information {
    position: relative;
    .el-form-item {
      width: 500px;
    }
    .city {
      display: flex;
      justify-content: flex-start;
    }
    .el-button {
      width: 380px;
    }
  }
}
// 主体区域
.main {
  h4 {
    color: black;
    height: 50px;
    line-height: 70px;
  }
  .left {
    float: left;
    width: 900px;
    // 最新询价
    .inquiry {
      .warp {
        height: 130px;
        overflow: hidden;
      }
      .warp ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
      }
      .warp li {
        float: left;
        width: 48%;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        span {
          color: #333;
          margin-right: 20px;
        }
      }
    }
    // 车型列表
    .titleing {
      background-color: #f1f1f1;
      height: 50px;
      line-height: 50px;
      span {
        display: inline-block;
        margin-bottom: 7px;
        color: #a0a0a0;
      }
    }
    .vehicleList {
      .items {
        overflow: hidden;
        >div {
          color: #333333;
          font-size: 14px;
          float: left;
          margin-top: 15px;
        }
        .el-button {
          margin-bottom: 7px;
        }
      }
    }
    // 模态框
    .box-card {
      position: relative;
      box-sizing: border-box;
      padding-top: 15px;
      width: 450px;
      i {
        position: absolute;
        right: 3px;
        top: 3px;
      }
    }
    // 买家点评
    .buyersComments {
      li {
        h3 {
          height: 50px;
          line-height: 50px;
          cursor: pointer;
        }
        div {
          text-align: right;
        }
      }
    }
    // 参数配置
    .matching {
      .head {
        display: flex;
        justify-content: space-between;
        .el-button {
          height: 30px;
          margin-top: 20px;
        }
      }
      .middle {
        .items {
          display: inline-block;
          width: 50%;
          >div {
            float: left;
            height: 30px;
            line-height: 30px;
          }
          :first-child {
            padding-left: 10px;
            background-color: #f2f2f2;
            width: 160px;
            font-size: 12px;
          }
          :last-child {
            padding-left: 10px;
            font-size: 10px;
            color: red;
          }
        }
      }
    }
  }
  .right {
    float: left;
    width: 250px;
    margin-left: 50px;
    // 服务保障
    .service {
      li {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
        img {
          width: 50px;
          margin-right: 15px;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
          :first-child {
            font-size: 18px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
.myhobby {
  span {
    padding-left: 10px;
    display: block;
    background-color: #f1f1f1;
    height: 50px;
    line-height: 50px;
    margin-bottom: 7px;
    color: #a0a0a0;
  }
}
</style>
