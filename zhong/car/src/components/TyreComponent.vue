<template>
  <div :class="scrollTop < 570 ? 'right' : 'righted'" ref="rightDemo">
    <!-- 车系查新闻 -->
    <div class="news">
      <h3>车系查新闻</h3>
      <!-- 品牌 -->
      <el-select filterable v-model="formAligin.brand" placeholder="请选择品牌" style="width: 100%" @change="changeBrand">
        <el-option
          v-for="item in brnadList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <!-- 车系 -->
      <el-select filterable v-model="formAligin.series" placeholder="请选择车系" style="margin: 20px 0; width: 100%" @visible-change="dropDownSeriesForm($event)">
        <el-option
          v-for="item in seriesList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <!-- 查询 -->
      <el-button type="primary" style="width: 100%" :disabled="disabled" @click="submit">查找</el-button>
    </div>
    <!-- 热门文章 -->
    <div class="article">
      <h3>热门资讯</h3>
      <ul>
        <li v-for="(item,index) in articleAry" :key="index">
          <span>{{index + 1}}.</span>
          <span @click="jump(item.id)">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <!-- 大家都买什么车 -->
    <div class="everyBody">
      <h3 style="color: #000">大家都买什么车</h3>
      <div class="all">
        <!-- 类型 -->
        <ul class="first">
          <li @mouseenter="changeTitle(item)" v-for="(item,index) in titleAry" :key="index">{{item}}</li>
        </ul>
        <!-- 车系 -->
        <ul class="second">
          <li v-for="(item,index) in seriesAry" :key="index" @click="carDetails(item.series)">
            <div>
              <span>{{index + 1}}. {{item.series}}</span>
              <label style="color: red; font-size: 14px;">{{item.guidePrice}}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      // 品牌车系
      brnadList: [],
      seriesList: [],
      // 热门文章
      articleAry: [],
      // 车系查文章
      formAligin: {
        brand: '',
        series: ''
      },
      options: [],
      // 大家都买什么车
      titleAry: ['全部', '中型车', 'SUV', 'MPV', '跑车', '微面', '电动车'],
      seriesAry: [],
      titles: '全部',
      // 滚动条
      scrollTop: 0
    }
  },
  computed: {
    disabled () {
      if (this.formAligin.brand !== '') return false
      return true
    }
  },
  methods: {
    // 品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/getBrand')
      this.brnadList = res
    },
    changeBrand () {
      this.formAligin.series = ''
    },
    // 车系
    async dropDownSeriesForm (callback) {
      if (callback === true) {
        const { data: res } = await this.$http.post('/car/getSeries', {
          brand: this.formAligin.brand
        })
        this.seriesList = res
      }
    },
    // 车系查新闻
    submit () {
      let url = ''
      switch (this.title) {
        case '车讯':
          url = '/automotivelnformation/carnews'
          break
        case '试驾评测':
          url = '/automotivelnformation/testdrive'
          break
        case '导购':
          url = '/automotivelnformation/shoppingguide'
          break
        case '技术':
          url = '/automotivelnformation/technology'
          break
        case '行业文化':
          url = '/automotivelnformation/culture'
          break
      }
      const { href } = this.$router.resolve({
        path: url,
        query: { formAligin: JSON.stringify(this.formAligin) }
      })
      window.open(href, '_blank')
    },
    // 获取热门资讯
    async getHotInformation () {
      const { data: res } = await this.$http.post('/Infor/tuijianyuedu')
      this.articleAry = res
    },
    // 跳转资讯详情页
    jump (id) {
      const { href } = this.$router.resolve({
        path: '/automotivelnformation/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 大家都买什么车
    async getEveryBodyCar () {
      const { data: res } = await this.$http.post('/car/getSeriesByLevel', {
        level: this.titles
      })
      this.seriesAry = res
    },
    changeTitle (item) {
      this.titles = item
      this.getEveryBodyCar()
    },
    carDetails (item) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', item)
      window.open(href, '_blank')
    },
    // 滚动条事件
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 品牌宽度
      let clientWidth = document.body.clientWidth
      let right = (clientWidth - 1200) / 2
      if (this.scrollTop > 570) {
        this.$el.style.right = right + 'px'
      }
    }
  },
  created () {
    // 品牌
    this.getBrand()
    // 获取热门资讯
    this.getHotInformation()
    // 大家都买什么车
    this.getEveryBodyCar()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed () {
    // 离开该页面需要移除这个监听的事件，不然会报错
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.right {
  width: 350px;
  margin-left: 50px;
  position: static;
  right: 0;
  h3 {
    margin-bottom: 15px;
  }
  // 车系查文章
  .news {
    border: 1px solid #F0F0F0;
    padding: 15px 25px;
  }
  // 热门文章
  .article {
    border: 1px solid #F0F0F0;
    padding: 15px 25px;
    margin: 20px 0;
    li {
      font-size: 15px;
      letter-spacing: 2px;
      margin-bottom: 15px;
      color: #333333;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    li:hover {
      color: rgb(43, 121, 255);
    }
  }
  // 大家都买什么车
  .everyBody {
    .all {
      display: flex;
      justify-content: space-between;
    }
    .first {
      li {
        width: 60px;
        height: 60px;
        background: rgba(245,245,245,1);
        text-align: center;
        line-height: 60px;
        border-bottom: 2px solid #fff;
        font-size: 13px;
        cursor: pointer;
        color: #333;
        margin-right: 20px;
      }
      .select {
        background-color: rgb(43, 121, 255);
        color: #fff;
      }
    }
    .second {
      width: 100%;
      li {
        height: 42px;
        line-height: 42px;
        border-top: 1px solid #ddd;
        cursor: pointer;
        div {
          display: flex;
          justify-content: space-between;
        }
      }
      border-bottom: 1px solid #ddd;
      span {
        display: inline-block;
        color: #333;
        font-size: 14px;
      }
    }
  }
}

.righted {
  width: 350px;
  margin-left: 50px;
  position: fixed;
  bottom: 0;
  right: 0;
  h3 {
    margin-bottom: 15px;
  }
  // 车系查文章
  .news {
    border: 1px solid #F0F0F0;
    padding: 15px 25px;
  }
  // 热门文章
  .article {
    border: 1px solid #F0F0F0;
    padding: 15px 25px;
    margin: 20px 0;
    li {
      font-size: 13px;
      letter-spacing: 2px;
      margin-bottom: 15px;
      color: #333333;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    li:hover {
      color: rgb(43, 121, 255);
    }
  }
  // 大家都买什么车
  .everyBody {
    .all {
      display: flex;
      justify-content: space-between;
    }
    .first {
      li {
        width: 60px;
        height: 60px;
        background: rgba(245,245,245,1);
        text-align: center;
        line-height: 60px;
        border-bottom: 2px solid #fff;
        font-size: 13px;
        cursor: pointer;
        color: #333;
        margin-right: 20px;
      }
      .select {
        background-color: rgb(43, 121, 255);
        color: #fff;
      }
    }
    .second {
      width: 100%;
      li {
        height: 42px;
        line-height: 42px;
        border-top: 1px solid #ddd;
        cursor: pointer;
        div {
          display: flex;
          justify-content: space-between;
        }
      }
      border-bottom: 1px solid #ddd;
      span {
        display: inline-block;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
