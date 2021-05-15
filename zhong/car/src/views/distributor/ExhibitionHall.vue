<template>
  <el-container class="w">
    <!-- 左侧主体 -->
    <el-main width="830px">
      <!-- 主营车系 -->
      <el-card class="major" shadow="never">
        <h3>主营车系</h3>
        <!-- 品牌 -->
        <h5>品牌 ></h5>
        <el-radio-group v-model="radio1" size="mini" @change="changeBrand">
          <el-radio border v-for="item in brandAry" :key="item" :label="item">{{item}}</el-radio>
        </el-radio-group>
        <!-- 车系 -->
        <h5>车系 ></h5>
        <el-radio-group v-model="radio2" size="mini" @change="changeSeries">
          <el-radio border label="不限">不限</el-radio>
          <el-radio border v-for="item in seriesAry" :key="item" :label="item">{{item}}</el-radio>
        </el-radio-group>
      </el-card>
      <!-- 全部车型 -->
      <el-card class="all" shadow="never">
        <h1>全部车型</h1>
        <el-divider></el-divider>
        <!-- 头部车型介绍 -->
        <div v-for="(item,index) in allAry" :key="index">
          <div class="head">
            <img :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/series/${item.label.series}.jpg`" alt="">
            <div class="middle">
              <h4>{{item.label.series}}</h4>
              <div>
                <span>级别：</span>
                <span>{{item.label.level}}</span>
                <span>排量：</span>
                <span><i v-for="items in item.label.enginel" :key="items">{{items}}</i></span>
              </div>
              <div>
                <span>驱动方式：</span>
                <span><i v-for="items in item.label.driveWayl" :key="items">{{items}}</i></span>
                <span>变速箱：</span>
                <span><i v-for="items in item.label.gearBoxl" :key="items">{{items}}</i></span>
              </div>
              <div>
                <!-- <el-button type="text" size="mini">实拍图片>></el-button> -->
                <!-- <el-button type="text" size="mini">参数配置>></el-button> -->
              </div>
            </div>
            <div class="right">
              <div>
                <label>官方价：</label>
                <span style="text-decoration: line-through">{{item.label.guidePrice}}</span>
              </div>
            </div>
          </div>
          <!-- 具体参数 -->
          <div class="configuration">
            <el-table :data="item.children"  border style="width: 100%" :header-cell-style="{'color': '#000', 'font-size': '12px', 'text-align': 'center'}" :cell-style="{'font-size': '12px', 'text-align': 'center'}">
              <el-table-column prop="type" label="车型" width="350"></el-table-column>
              <el-table-column prop="guidePrice" label="官方价" width="80"></el-table-column>
              <el-table-column prop="offer" label="本店报价" width="80"></el-table-column>
              <el-table-column label="咨询">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="lowPrice(scope.row.id)">获取底价</el-button>
                  <el-button size="mini" @click="appointment(scope.row.id)">预约试驾</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <!-- 对话框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible" :info="msg" width="40%">
        <el-form :model="form">
          <el-form-item label="您的姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
    <!-- 右侧商家地址 -->
    <el-aside style="padding-top: 20px;">
      <Distributor></Distributor>
    </el-aside>
  </el-container>
</template>

<script>
import Distributor from '../../components/Distributor.vue'
const id = window.sessionStorage.getItem('distributorId')
export default {
  components: {
    Distributor
  },
  data () {
    return {
      // 品牌
      brandAry: [],
      // 车系
      seriesAry: [],
      // v-model绑定值
      radio1: '',
      radio2: '不限',
      // 全部车型
      allAry: [],
      // 对话框标题
      title: '',
      msg: 0, // 获取对话框id
      form: {
        name: '',
        phone: '',
        dealerId: '',
        carId: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
  },
  methods: {
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post(`/dealer/getDealerBrand`, {
        dealerId: id
      })
      // console.log(res)
      this.brandAry = res
      this.radio1 = res[0]
      // 获取系列
      const { data: req } = await this.$http.post(`/dealer/getDealerSeries`, {
        dealerId: id,
        brand: this.radio1
      })
      // console.log(req)
      this.seriesAry = req
      // 车型展示
      const { data: rew } = await this.$http.post(`/dealer/getCarD`, {
        dealerId: id,
        brand: this.radio1,
        series: ''
      })
      // console.log(rew)
      this.allAry = rew
    },
    // 切换品牌
    async changeBrand () {
      // 获取系列
      const { data: req } = await this.$http.post(`/dealer/getDealerSeries`, {
        dealerId: id,
        brand: this.radio1
      })
      // console.log(req)
      this.seriesAry = req
      // 车型展示
      const { data: rew } = await this.$http.post(`/dealer/getCarD`, {
        dealerId: id,
        brand: this.radio1,
        series: ''
      })
      // console.log(rew)
      this.allAry = rew
    },
    // 切换车系
    async changeSeries () {
      if (this.radio2 === '不限') {
        const { data: rew } = await this.$http.post(`/dealer/getCarD`, {
          dealerId: id,
          brand: this.radio1,
          series: ''
        })
        // console.log(rew)
        this.allAry = rew
      } else {
        const { data: rew } = await this.$http.post(`/dealer/getCarD`, {
          dealerId: id,
          brand: this.radio1,
          series: this.radio2
        })
        // console.log(rew)
        this.allAry = rew
      }
    },
    // 获取低价
    lowPrice (id) {
      this.title = '获取底价'
      this.dialogFormVisible = true
      this.msg = id
    },
    // 预约试驾
    appointment (id) {
      this.title = '预约试驾'
      this.dialogFormVisible = true
      this.msg = id
    },
    // 提交
    async submit () {
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
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 主营车系
.major {
  h5 {
    margin-bottom: 10px;
  }
  .el-radio {
    margin-left: 0!important;
    margin-right: 5px!important;
    margin-bottom: 5px;
  }
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 10px;
  }
}
// 全部车型
.all {
  margin-top: 20px;
  h1 {
    margin-bottom: 10px;
  }
  .head {
    display: flex;
    justify-content: flex-start;
    margin: 20px 0;
    img {
      width: 200px;
      margin-right: 20px;
    }
    .middle {
      div {
        margin-top: 10px;
      }
      span {
        display: inline-block;
        overflow: hidden;
      }
      span:nth-of-type(2n-1) {
        font-size: 12px;
        width: 65px;
      }
      span:nth-of-type(2n) {
        font-size: 14px;
        width: 110px;
        color: rgb(43, 121, 255);
        // 默认一行显示
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        font-style: normal;
        margin-right: 5px;
      }
      .el-button {
        margin-right: 15px;
      }
    }
    .right {
      width: 240px;
      text-align: right;
      div:nth-of-type(1) {
        color: #999;
        font-size: 12px;
        margin-bottom: 20px;
      }
      div:nth-of-type(3) {
        margin-top: 10px;
      }
    }
  }
}
.configuration {
  margin-bottom: 60px;
  .el-table {
    border-top: 0;
  }
}
// 对话框
.el-dialog {
  .el-input {
    width: 300px;
  }
}
</style>
