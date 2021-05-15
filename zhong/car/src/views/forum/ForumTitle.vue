<template>
  <div class="w all">
    <!-- 广告位 -->
    <div class="advertisement w" v-show="this.obj1.pic">
      <img :src="this.obj1.pic ? this.obj1.pic : ''" alt="" @click="foreign1">
    </div>
    <!-- 选择论坛 -->
    <div class="selectForum">
      <!-- 论坛标题 -->
      <ul class="title">
        <li @click="changeForumTitle(item, index)" :class="currentTitle === index ? 'select' : ''" v-for="(item,index) in forumTitle" :key="item">{{item}}</li>
      </ul>
      <!-- 车型论坛 -->
      <div v-show="currentTitle === 0" class="one">
        <!-- 字母 -->
        <ul class="letter">
          <li @mouseenter="changeLetter(item,index)" v-for="(item, index) in letter" :class="currentIndex === index ? 'select' : ''" :key="item">{{item}}</li>
        </ul>
        <!-- 查询 -->
        <ul class="submit">
          <li ref="element" :style="{ height: Height[i]}" v-for="(item, i) in types" :key="item.brand">
            <div :style="{ height: Height[i]}">{{item.brand}}</div>
            <ul class="son">
              <li @click="jumpForum(items.id, items.name)" v-for="items in item.forumList" :key="items.series">{{items.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 地区论坛 -->
      <div v-show="currentTitle === 1" class="two">
        <ul>
          <li @click="jumpForum(item.id, item.name)" v-for="item in country" :key="item.name">{{item.name}}</li>
        </ul>
      </div>
      <!-- 主题论坛 -->
      <div v-show="currentTitle === 2" class="two">
        <ul>
          <li @click="jumpForum(item.id, item.name)" v-for="item in theme" :key="item.name">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="main w">
      <div class="left">
        <div class="top">
          <!-- 轮播图 -->
          <div class="block" style="width: 400px">
            <el-carousel height="200px">
              <el-carousel-item v-if="this.obj2.pic">
                <img :src="this.obj2.pic ? this.obj2.pic : ''" alt="" @click="foreign2">
              </el-carousel-item>
              <el-carousel-item v-for="item in swiperList" :key="item.id">
                <img style="height: 100%" :src="item.coverPic" alt="" @click="jumpPost(item.id)">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- 文字帖子 -->
          <div class="word">
            <h3 @click="jumpPost(wordObj.id)">{{wordObj.title}}</h3>
            <ul>
              <li @click="jumpPost(item.id)" v-for="(item, i) in wordList" :key="i">
                <div>
                  <em></em>
                  <span>{{item.title}}</span>
                </div>
                <i>{{item.nikename}}</i>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <h3>精选</h3>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 精选列表 -->
          <ul>
            <li @click="jumpPost(item.id)" v-for="(item, i) in selectList" :key="i">
              <img :src="item.coverPic" alt="">
              <label>{{item.title}}</label>
              <div>
                <span>用户 : </span>
                <em>{{item.nikename}}</em>
              </div>
              <div>
                <span>论坛 : </span>
                <em>{{item.forumName}}</em>
              </div>
              <div>
                <span>浏览 : </span>
                <em>{{item.clickNum}}</em>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h3>热门论坛</h3>
        <!-- 论坛 -->
        <ul>
          <li @click="jumpForum(item.id,item.name)" v-for="(item, i) in hotForum" :key="i">
            <img :src="item.pic" alt="">
            <div>
              <div style="color: #0777DD">{{item.name}}</div>
              <div>人气指数: <span>{{item.ivNum}}</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Height: [],
      // 广告
      advertiseList: [],
      obj1: {},
      obj2: {},
      // 论坛标题
      forumTitle: ['车型论坛', '地区论坛', '主题论坛'],
      currentTitle: 0,
      // 车型论坛
      types: [],
      // 热门车系
      hotSeries: [],
      letter: [], // 字母
      currentIndex: 0, // 品牌当前索引
      currentBrand: 'A', // 当前品牌
      // 主题论坛
      theme: [],
      // 地区论坛
      country: [],
      // 轮播图
      swiperList: [],
      // 文字帖子1
      wordObj: {},
      // 文字帖子2-7
      wordList: [],
      // 精选列表
      selectList: [],
      // 热门论坛
      hotForum: []
    }
  },
  mounted () {
    this.getAdvertisement()
    setTimeout(() => {
      this.$refs.element.forEach((item, i) => {
        this.Height[i] = item.offsetHeight
      })
    }, 1000)
  },
  methods: {
    // 广告
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [
          { name: '论坛顶部通栏', area: sessionStorage.getItem('LocationProvince') },
          { name: '论坛焦点图', area: sessionStorage.getItem('LocationCity') }
        ]
      })
      this.advertiseList = res
      this.obj1 = this.advertiseList[0] || {}
      this.obj2 = this.advertiseList[1] || {}
    },
    foreign1 () {
      if (this.obj1.url.indexOf('https://') > -1) {
        window.open(`${this.obj1.url}`)
      } else {
        window.open(`http://${this.obj1.url}`)
      }
    },
    foreign2 () {
      if (this.obj2.url.indexOf('https://') > -1) {
        window.open(`${this.obj2.url}`)
      } else {
        window.open(`http://${this.obj2.url}`)
      }
    },
    // 切换论坛标题
    changeForumTitle (item, index) {
      this.currentTitle = index
      if (index === 0) {
        this.getType()
      } else {
        this.getCountry(item)
      }
    },
    // 车型论坛字母
    async getLetter () {
      const { data: res } = await this.$http.post('/Invit/forumSzm')
      this.letter = res
    },
    changeLetter (items, index) {
      this.currentIndex = index
      this.currentBrand = items
      this.getType()
    },
    // 车型论坛
    async getType () {
      const { data: res } = await this.$http.post('/Invit/forumList', {
        szm: this.currentBrand
      })
      this.types = res
    },
    // 地区论坛和主题论坛
    async getCountry (item) {
      const { data: res } = await this.$http.post('/Invit/getForumByType', {
        type: item
      })
      if (item === '地区论坛') {
        this.country = res
        this.country.push('')
      } else {
        this.theme = res
        // 获取数组余数
        const l = this.theme.length % 5
        // 需要补齐的长度
        const s = 5 - l
        if (s === 5) {
          this.theme = [...res]
        } else {
          const list = new Array(s).fill('')
          this.theme = [...res, ...list]
        }
      }
    },
    // 点击论坛事件
    jumpForum (id, name) {
      // const obj = {}
      // obj.id = id
      // obj.name = name
      const { href } = this.$router.resolve({
        path: '/forum/post/list',
        query: { id: id, name: name }
      })
      window.open(href, '_blank')
    },
    // 轮播图
    async getSwiper () {
      const { data: res } = await this.$http.post('/Invit/getLb')
      this.swiperList = res
    },
    // 点击轮播图事件
    jumpPost (id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 文字帖子
    async getWord () {
      const { data: res } = await this.$http.post('/Invit/getJd')
      this.wordObj = res[0]
      this.wordList = res.slice(1, 6)
    },
    // 精选列表
    async getSelectList () {
      const { data: res } = await this.$http.post('/Invit/getJx')
      this.selectList = res
    },
    // 热门论坛
    async getHotForum () {
      const { data: res } = await this.$http.post('/Invit/hotForum')
      this.hotForum = res
    }
  },
  created () {
    // 论坛
    this.getType()
    // 轮播图
    this.getSwiper()
    // 文字帖子
    this.getWord()
    // 精选列表
    this.getSelectList()
    // 热门论坛
    this.getHotForum()
    this.getLetter()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 广告位
.advertisement {
  height: 100px;
  margin-bottom: 20px;
}
// tab栏
.selectForum {
  margin-bottom: 25px;
  .title {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    .select {
      background-color: #0777DD;
      color: #fff;
    }
    li {
      padding: 10px 20px;
      background-color: #F4F4F4;
      margin-right: 5px;
      color: #333;
      font-size: 12px;
      cursor: pointer;
    }
  }
  // 车型论坛
  .one {
    .letter {
      display: flex;
      justify-content: flex-start;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      li {
        cursor: pointer;
        margin: 10px;
        padding: 2px 5px;
      }
    }
    .select {
      background-color: #0777DD;
      color: #fff;
    }
    .submit {
      border: 1px solid #ccc;
      overflow-y: scroll;
      height: 399px;
      // border-bottom: 0;
      >li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        >div {
          width: 150px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
      }
      .son {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        // height: 75px;
        width: 1100px;
        li {
          box-sizing: border-box;
          display: flex;
          padding: 15px;
          width: 200px;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
        }
        li:hover {
          color: #2B79FF;
        }
        li:nth-of-type(5n+1) {
          border-left: 1px solid #ccc;
        }
      }
    }
  }
  // 地区论坛
  .two {
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      border-left: 1px solid #ccc;
      li {
        width: 20%;
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
      }
      li:hover {
        color: #2B79FF;
      }
    }
  }
}
// 主体
.main {
  display: flex;
  justify-content: space-between;
  .left .top {
    display: flex;
    justify-content: flex-start;
    .word {
      margin-left: 10px;
      h3 {
        color: #EB3030;
        margin-bottom: 20px;
        width: 540px;
        cursor: pointer;
      }
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 14px;
        cursor: pointer;
        em {
          display: inline-block;
          vertical-align: top;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #bbb;
          margin-right: 7px;
          margin-top: 7px;
        }
        span {
          display: inline-block;
          letter-spacing: 2px;
          width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        i {
          font-style: normal;
          color: #777;
        }
      }
    }
  }
  .left .bottom {
    width: 970px;
    margin-bottom: 20px;
    h3 {
      font-weight: 400;
      height: 70px;
      line-height: 90px;
    }
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li:nth-of-type(3n+2) {
        margin: 0 5%;
      }
    }
    li {
      width: 30%;
      cursor: pointer;
      img {
        display: block;
        width: 200px;
        height: 100px;
        margin: 15px 0;
      }
      label {
        display: block;
        color: #333;
        font-size: 10px;
        margin-bottom: 15px;
      }
      div {
        span {
          color: #333;
          font-size: 10px;
        }
        em {
          color: #0777DD;
          font-size: 10px;
          font-style: normal;
        }
      }
    }
  }
  .right {
    width: 220px;
    background-color: #f8f8f8;
    padding: 10px 20px;
    box-sizing: border-box;
    h3 {
      font-weight: 400;
      color: #333333;
      margin-bottom: 10px;
    }
    li {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
      cursor: pointer;
      >div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 12px;
        padding: 5px 0;
      }
      img {
        width: 70px;
        height: 50px;
        margin-right: 15px;
      }
      span {
        color: #FF0D2F;
      }
    }
  }
}
// 轮播图
.el-carousel {
  img {
    cursor: pointer;
  }
}
</style>
