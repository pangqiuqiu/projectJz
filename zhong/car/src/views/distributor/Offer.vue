<template>
  <div class="w details">
    <!-- 详情 -->
    <div class="left">
      <CarSideList @func="getSeries"></CarSideList>
    </div>
    <div class="right">
      <!-- 标题 -->
      <div class="title">
        <h3>精准选车</h3>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 价格 -->
      <div class="price items">
        <span>价格：</span>
        <el-radio-group v-model="radio" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="0-5万" size="small"></el-radio>
          <el-radio label="5-10万" size="small"></el-radio>
          <el-radio label="10-20万" size="small"></el-radio>
          <el-radio label="20-30万" size="small"></el-radio>
          <el-radio label="30-40万" size="small"></el-radio>
          <el-radio label="40-60万" size="small"></el-radio>
          <el-radio label="60-100万" size="small"></el-radio>
          <el-radio label="100-500万" size="small"></el-radio>
          <el-radio label="豪车区" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 级别 -->
      <div class="level items">
        <span>级别：</span>
        <el-radio-group v-model="editForm.level" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="跑车" size="small"></el-radio>
          <el-radio label="SUV" size="small"></el-radio>
          <el-radio label="MPV" size="small"></el-radio>
          <el-radio label="轻客" size="small"></el-radio>
          <el-radio label="皮卡" size="small"></el-radio>
          <el-radio label="微面" size="small"></el-radio>
          <el-radio label="微型车" size="small"></el-radio>
          <el-radio label="紧凑型车" size="small"></el-radio>
          <el-radio label="小型车" size="small"></el-radio>
          <el-radio label="中型车" size="small"></el-radio>
          <el-radio label="中大型车" size="small"></el-radio>
          <el-radio label="大型车" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 排量 -->
      <div class="displacement items">
        <span>排量：</span>
        <el-radio-group v-model="editForm.engine" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="1.0L及以下" size="small"></el-radio>
          <el-radio label="1.1-1.6L" size="small"></el-radio>
          <el-radio label="1.7-2.0L" size="small"></el-radio>
          <el-radio label="2.1-2.5L" size="small"></el-radio>
          <el-radio label="2.6-3.0L" size="small"></el-radio>
          <el-radio label="3.1-4.0L" size="small"></el-radio>
          <el-radio label="4.0L以上" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 国别111 -->
      <div class="country items">
        <span>国别：</span>
        <el-radio-group v-model="editForm.country" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="中国" size="small"></el-radio>
          <el-radio label="德国" size="small"></el-radio>
          <el-radio label="日本" size="small"></el-radio>
          <el-radio label="美国" size="small"></el-radio>
          <el-radio label="韩国" size="small"></el-radio>
          <el-radio label="欧系" size="small"></el-radio>
          <el-radio label="非日系" size="small"></el-radio>
          <el-radio label="非德系" size="small"></el-radio>
          <el-radio label="非美系" size="small"></el-radio>
          <el-radio label="非韩系" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 变速箱 -->
      <div class="transmission items">
        <span>变速箱：</span>
        <el-radio-group v-model="editForm.gearBox" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="手动" size="small"></el-radio>
          <el-radio label="自动" size="small"></el-radio>
          <el-radio label="手自一体" size="small"></el-radio>
          <el-radio label="无级变速" size="small"></el-radio>
          <el-radio label="双离合" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 燃料 -->
      <div class="fuel items">
        <span>燃料：</span>
        <el-radio-group v-model="editForm.energy" @change="change">
          <el-radio label="不限" size="small"></el-radio>
          <el-radio label="汽油" size="small"></el-radio>
          <el-radio label="柴油" size="small"></el-radio>
          <el-radio label="纯电动" size="small"></el-radio>
          <el-radio label="油电混合" size="small"></el-radio>
        </el-radio-group>
      </div>
      <el-divider></el-divider>
      <!-- 产地111 类型111 -->
      <!-- <div class="items specialItems">
        <div class="first">
          <span>产地：</span>
          <el-radio-group v-model="radio6" @change="change">
            <el-radio label="不限" border size="small"></el-radio>
            <el-radio label="自主" border size="small"></el-radio>
            <el-radio label="合资" border size="small"></el-radio>
            <el-radio label="进口" border size="small"></el-radio>
          </el-radio-group>
        </div>
        <div>
          <span>类型：</span>
          <el-radio-group v-model="radio7" @change="change">
            <el-radio label="不限" border size="small"></el-radio>
            <el-radio label="两厢" border size="small"></el-radio>
            <el-radio label="三厢" border size="small"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-divider></el-divider> -->
      <!-- 驱动方式 进气形式 -->
      <div class="items specialItems">
        <div class="first">
          <span>驱动方式：</span>
          <el-radio-group v-model="editForm.driveWay" @change="change">
            <el-radio label="不限" size="small"></el-radio>
            <el-radio label="前驱" size="small"></el-radio>
            <el-radio label="后驱" size="small"></el-radio>
            <el-radio label="四驱" size="small"></el-radio>
          </el-radio-group>
        </div>
        <div>
          <span>进气形式：</span>
          <el-radio-group v-model="editForm.inlet" @change="change">
            <el-radio label="不限" size="small"></el-radio>
            <el-radio label="自然吸气" size="small"></el-radio>
            <el-radio label="涡轮增压" size="small"></el-radio>
            <el-radio label="机械增压" size="small"></el-radio>
            <el-radio label="双涡轮增压" size="small"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 车体结构 座位数 -->
      <div class="items specialItems">
        <div class="first">
          <span>车体结构：</span>
          <el-radio-group v-model="editForm.carBody" @change="change">
            <el-radio label="不限" size="small"></el-radio>
            <el-radio label="承载式" size="small"></el-radio>
            <el-radio label="非承载式" size="small"></el-radio>
          </el-radio-group>
        </div>
        <div>
          <span>气缸数：</span>
          <el-radio-group v-model="editForm.Cylinder" @change="change">
            <el-radio label="不限" size="small"></el-radio>
            <el-radio label="3缸" size="small"></el-radio>
            <el-radio label="4缸" size="small"></el-radio>
            <el-radio label="5缸" size="small"></el-radio>
            <el-radio label="6缸" size="small"></el-radio>
            <el-radio label="8缸及以上" size="small"></el-radio>
          </el-radio-group>
        </div>
        <!-- <div>
          <span>座位数：</span>
          <el-radio-group v-model="radio11" @change="change">
            <el-radio label="不限" border size="small"></el-radio>
            <el-radio label="2" border size="small"></el-radio>
            <el-radio label="4" border size="small"></el-radio>
            <el-radio label="5" border size="small"></el-radio>
            <el-radio label="7" border size="small"></el-radio>
            <el-radio label="7座以上" border size="small"></el-radio>
          </el-radio-group>
        </div> -->
      </div>
      <el-divider></el-divider>
      <!-- 排放标准 气缸数 -->
      <div class="items specialItems">
        <div class="first">
          <span>排放标准：</span>
          <el-radio-group v-model="editForm.discharge" @change="change">
            <el-radio label="不限" size="small"></el-radio>
            <el-radio label="国V及以下" size="small"></el-radio>
            <el-radio label="国VI" size="small"></el-radio>
            <el-radio label="欧系" size="small"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 新车抢先看 -->
      <div class="queryResults" v-for="item in selectedAry" :key="item.index">
        <div>
          <img :src="item.carPic ? item.carPic : require('../../assets/logo/logo.png')" alt="" @click="series(item.series)">
          <div class="name" @click="series(item.series)">车系：{{item.series}}</div>
          <div class="queryPrice">价格：{{item.guidePrice}}</div>
          <!-- <div class="comment">报价 点评 图片 参配</div> -->
          <el-button type="primary" style="margin-left: 10px" size="mini" @click="attempt(item.series)">抢先试驾</el-button>
          <el-button class="green" size="mini" @click="bottom(item.series)">获取底价</el-button>
        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- 同价车系 -->
      <ul v-show="this.selectedAry.length === 1">
        <h3 style="color: rgb(43, 121, 255)">同价车系</h3>
        <li v-for="(item,index) in identical" :key="index" class="queryResults">
          <div>
            <img :src="item.carPic ? item.carPic : require('../../assets/logo/logo.png')" alt="">
            <div class="name" @click="series(item.series)">车系：{{item.series}}</div>
            <div class="queryPrice">价格：{{item.guidePrice}}</div>
            <!-- <div class="comment">报价 点评 图片 参配</div> -->
            <el-button type="primary" size="mini" @click="attempt(item.series)">抢先试驾</el-button>
            <el-button style="backgroundColor: #fc9809; color: #fff" size="mini" @click="bottom(item.series)">获取底价</el-button>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        hide-on-single-page
        layout="total, prev, pager, next"
        @current-change="paging"
        :current-page.sync="this.editForm.pageNo"
        :page-size="this.editForm.pageSize"
        :total="total">
      </el-pagination>
      <!-- 对话框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%" :info="msg">
        <el-form :model="form">
          <el-form-item label="您的姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 300px" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" style="width: 300px" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import CarSideList from '../../components/picture/CarSideList.vue'
export default {
  components: {
    CarSideList
  },
  data () {
    return {
      // 价格范围
      radio: '不限',
      // 发送后台的数据
      editForm: {
        // 品牌
        brand: '',
        // 车系
        series: '',
        // 价格
        minPrice: '',
        maxPrice: '',
        // 级别
        level: '不限',
        // 排量
        engine: '不限',
        // 国别
        country: '不限',
        // 变速箱
        gearBox: '不限',
        // 燃料
        energy: '不限',
        // 驱动方式
        driveWay: '不限',
        // 进气形式
        inlet: '不限',
        // 车体结构
        carBody: '不限',
        // 排放标准
        discharge: '不限',
        // 气缸数
        Cylinder: '不限',
        // 页数
        pageNo: 1,
        // 每页条数
        pageSize: 8
      },
      // 产地
      radio6: '不限',
      // 类型
      radio7: '不限',
      // 座位数
      radio11: '不限',
      // 精选查询数组
      selectedAry: [],
      identical: [],
      // 对话框
      msg: 0,
      title: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        phone: ''
      },
      // 分页总数
      total: 0
    }
  },
  methods: {
    // 获取左侧汽车列表的名称(车系)
    async getSeries (data) {
      for (let item in this.editForm) {
        this.editForm[item] = '不限'
      }
      this.editForm.minPrice = ''
      this.editForm.maxPrice = ''
      this.editForm.pageNo = 1
      this.editForm.pageSize = 8
      if (data.children !== null) {
        // console.log(data.children[0].label)
        this.editForm.brand = data.label
        this.editForm.series = ''
        const { data: res } = await this.$http.post('/car/baojia', this.editForm)
        this.total = res.num
        this.selectedAry = res.l
      } else {
        this.editForm.series = data.label
        this.editForm.brand = ''
        const { data: res } = await this.$http.post('/car/baojia', this.editForm)
        this.total = res.num
        this.selectedAry = res.l
        const { data: req } = await this.$http.post('/car/getGuide', this.editForm)
        this.identical = req.l.slice(0, 4)
      }
    },
    // 初始化加载
    async getOffer () {
      const id = this.$route.query.id
      if (id === undefined) {
        const { data: res } = await this.$http.post(`/car/baojia`, this.editForm)
        this.total = res.num
        this.selectedAry = res.l
      } else if (id === '纯电动') {
        this.editForm.energy = id
        const { data: res } = await this.$http.post(`/car/baojia`, this.editForm)
        this.total = res.num
        this.selectedAry = res.l
      } else {
        this.editForm.level = id
        const { data: res } = await this.$http.post(`/car/baojia`, this.editForm)
        this.total = res.num
        this.selectedAry = res.l
      }
    },
    // 配置项发生变化时，重新发送请求
    async change (index) {
      if (index !== undefined) {
        this.editForm.pageNo = 1
        this.editForm.brand = ''
        this.editForm.series = ''
      }
      // 修改价格范围
      switch (this.radio) {
        case '不限': this.editForm.minPrice = ''; this.editForm.maxPrice = ''; break
        case '0-5万': this.editForm.minPrice = 0; this.editForm.maxPrice = 5; break
        case '5-10万': this.editForm.minPrice = 5; this.editForm.maxPrice = 10; break
        case '10-20万': this.editForm.minPrice = 10; this.editForm.maxPrice = 20; break
        case '20-30万': this.editForm.minPrice = 20; this.editForm.maxPrice = 30; break
        case '30-40万': this.editForm.minPrice = 30; this.editForm.maxPrice = 40; break
        case '40-60万': this.editForm.minPrice = 40; this.editForm.maxPrice = 60; break
        case '60-100万': this.editForm.minPrice = 60; this.editForm.maxPrice = 100; break
        case '100-500万': this.editForm.minPrice = 100; this.editForm.maxPrice = 500; break
        case '豪车区': this.editForm.minPrice = 500; this.editForm.maxPrice = ''; break
      }
      const { data: res } = await this.$http.post(`/car/baojia`, this.editForm)
      // console.log(res)
      this.total = res.num
      this.selectedAry = res.l
    },
    // 分页
    paging (index) {
      this.editForm.pageNo = index
      this.change()
    },
    // 留号码
    attempt (series) {
      this.title = '抢先试驾'
      this.dialogFormVisible = true
      this.msg = series
    },
    bottom (series) {
      this.title = '获取底价'
      this.dialogFormVisible = true
      this.msg = series
    },
    async determine () {
      if (this.form.phone === '' || this.form.name === '') {
        return this.$message.error('请输入手机号和姓名')
      }
      const mobile = /^1[3456789]\d{9}$/
      if (!mobile.test(this.form.phone)) {
        return this.$message.error('手机号不合法')
      }
      const res = await this.$http.post(`/dealer/addXs`, {
        series: this.msg,
        type: this.title,
        name: this.form.name,
        phone: this.form.phone,
        spCity: window.sessionStorage.getItem('LocationCity')
      })
      // console.log(res)
      if (res.data === true && res.status === 200) {
        this.$message.success('提交成功')
        this.dialogFormVisible = false
      } else {
        return this.$message.success('提交失败')
      }
    },
    series (series) {
      window.sessionStorage.setItem('carDetails', series)
      const { href } = this.$router.resolve({ path: '/automobile/details' })
      window.open(href, '_blank')
    }
  },
  created () {
    // 获取报价
    this.getOffer()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: auto;
}
h2 {
  line-height: 70px;
}
// 详情
.details {
  overflow: hidden;
  .left {
    width: 250px;
    float: left;
  }
  .right {
    box-sizing: border-box;
    width: 950px;
    float: left;
    padding: 0 10px;
    // 标题
    .title {
      height: 60px;
      line-height: 60px;
      h3 {
        color: orange;
      }
      >div {
        color: #999;
        font-size: 14px;
        cursor:pointer;
      }
    }
    // 每一项配置
    .items {
      height: 30px;
      line-height: 30px;
      span {
        display: inline-block;
        width: 70px;
        font-size: 14px;
        color: #999;
      }
    }
    .el-radio {
      margin-right: 0;
      padding: 2px;
    }
    // 一行两个配置项
    .specialItems {
      .first {
        width: 45%;
      }
      >div {
        float: left;
      }
    }
    // 新车抢先看
    .queryResults {
      margin-top: 30px;
      >div {
        margin-bottom: 20px;
        >div {
          margin-bottom: 6px;
        }
        img {
          width: 186px;
          height: 139.5px;
          cursor: pointer;
        }
        .name {
          color: #333;
          font-size: 14px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .queryPrice {
          color: #EB3030;
          font-size: 14px;
          text-align: center;
        }
        .comment {
          color: #999;
          font-size: 14px;
        }
        width: 20%;
        float: left;
        margin-right: 5%;
      }
    }
    // 分页
    .el-pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}

.web {
  height: 10px;
}
</style>
