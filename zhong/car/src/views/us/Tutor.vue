<template>
  <div>
    <img src="../../assets/teach/1.png" alt="">
    <div class="w">
      <div class="first">
        <h2>超多课程体系, 满足不同学习要求</h2>
        <div class="intro">每一次课程升级都会成为行业课程改革的风向标</div>
        <ul>
          <li v-for="(item, i) in curriculumList" :key="i" @click="details(`/curriculum?id=${item.id}`)">
            <div class="item">
              <img :src="item.coverPic" alt="重点汽车">
              <div>{{item.name}}</div>
              <div>{{item.names}}观看</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="second">
        <h2>合作案例</h2>
        <div class="cooperation">
          <ul>
            <li v-for="(item, i) in cooperationList" :key="i" @click="details(`/case?id=${item.id}`)">
              <div class="item">
                <img :src="item.coverPic" alt="重点汽车">
                <div class="comment">{{item.companyName}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="third">
        <h2>优秀老师介绍</h2>
        <vue-seamless-scroll :data="teacherList" :class-option="classOption" class="warp">
          <ul>
            <li v-for="(item, i) in teacherList" :key="i" @click="details(`/teacher?id=${item.id}`)">
              <div class="item">
                <img :src="item.headPic" alt="重点汽车">
                <el-card class="box-card" :body-style="{padding: '0'}">
                  <h3>{{item.name}}</h3>
                  <div class="intro">个人简介：{{item.intro}}</div>
                </el-card>
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="fouth w" style="width: 800px">
      <h2>合作方案</h2>
      <ul>
        <li v-for="(item, i) in coachList" :key="i">
          <div></div>
          <span>入店辅导</span>
        </li>
      </ul>
    </div>
    <div class="contact">
      <div class="w">
        <h2>联系我们</h2>
        <ul>
          <li>
            <div>
              <img src="../../assets/teach/2.png" alt="">
            </div>
            <span>电话：0551-675148562</span>
          </li>
          <li>
            <div>
              <img src="../../assets/teach/3.png" alt="">
            </div>
            <span>邮箱：wanyanyanan@126.com</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      // 课程介绍
      curriculumList: [],
      // 合作企业
      cooperationList: [],
      // 优秀老师
      teacherList: [],
      // 入店辅导
      coachList: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    // 获取课程体系
    async getCurriculum () {
      const { data: res } = await this.$http.post('/user/course')
      this.curriculumList = res
    },
    // 获取合作企业
    async getCooperation () {
      const { data: res } = await this.$http.post('/user/showCase')
      this.cooperationList = res
    },
    // 获取优秀老师
    async getTeacherList () {
      const { data: res } = await this.$http.post('/user/showTeachers')
      this.teacherList = res
    },
    // 获取入店辅导
    async getCoachList () {
      const { data: res } = await this.$http.post('')
      this.coachList = res
    },
    // 去详情页面
    details (link) {
      const { href } = this.$router.resolve({ path: link })
      window.open(href, '_blank')
    }
  },
  created () {
    this.getCurriculum()
    this.getCooperation()
    this.getTeacherList()
    // this.getCoachList()
  },
  computed: {
    classOption () {
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
  width: 1000px;
  margin: 0 auto;
  h2 {
    font-size: 25px;
    color: #232323;
    margin-top: 40px;
    text-align: center;
  }
}
// 课程介绍
.first {
  .intro {
    color: #999;
    font-size: 13px;
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      margin-right: 40px;
    }
    li:nth-of-type(4n) {
      margin-right: 0;
    }
    .item {
      width: 220px;
      img {
        width: 220px;
        height: 160px;
        border-radius: 5px;
        cursor: pointer;
      }
      div:nth-of-type(1) {
        color: #212121;
        font-size: 11px;
        margin: 5px 0;
      }
      div:nth-of-type(2) {
        color: #919191;
        font-size: 10px;
        margin-bottom: 15px;
      }
    }
  }
}

// 合作案例
.second {
  h2 {
    margin-bottom: 40px;
  }
  .cooperation {
    width: 1000px;
    margin: 0 auto;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      margin-right: 25px;
      cursor: pointer;
      .item {
        margin-bottom: 30px;
        img {
          width: 180px;
          height: 250px;
          vertical-align: bottom;
          border-radius: 5px;
        }
        div {
          color: #212121;
          font-size: 11px;
          margin-top: 13px;
          text-align: center;
        }
      }
    }
    li:nth-of-type(5n) {
      margin-right: 0;
    }
  }
}

// 优秀老师
.third {
  padding: 40px 0 30px 0;
  h2 {
    margin-top: 0;
    margin-bottom: 40px;
  }
  .warp {
    height: 360px;
    overflow: hidden;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  li:nth-of-type(2n-1) {
    margin-right: 40px;
  }
  li {
    width: 480px;
    height: 80px;
    margin-bottom: 30px;
    .item {
      display: flex;
      justify-content: flex-start;
      padding-right: 10px;
      cursor: pointer;
      img {
        width: 120px;
        height: 80px;
      }
      .box-card {
        border-radius: 0 5px 5px 0;
        padding: 0 20px;
        h3 {
          color: #212121;
          font-size: 14px;
          line-height: 35px;
        }
        .intro {
          color: #7B7B7B;
          font-size: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}

// 入店辅导
.fouth {
  ul {
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      span {
        margin-top: 10px;
        font-size: 13px;
        color: #2D2D2D;
      }
    }
    margin-top: 40px;
    margin-bottom: 40px;
    li:nth-of-type(2n-1) {
      div {
        width: 84px;
        height: 84px;
        background: #464646;
        border-radius: 50%;
      }
    }
    li:nth-of-type(2n) {
      div {
        width: 71px;
        height: 71px;
        background: #D72403;
        border-radius: 50%;
        margin-top: 50px;
      }
    }
  }
}

// 联系我们
.contact {
  background-color: #F9F9F9;
  padding-top: 10px;
  height: 290px;
  ul {
    display: flex;
    justify-content: space-evenly;
    margin-top: 40px;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 170px;
      height: 85px;
      background-color: #fff;
      margin-bottom: 10px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    span {
      color: #2D2D2D;
      font-size: 13px;
    }
  }
}
</style>
