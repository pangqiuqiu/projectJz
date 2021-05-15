<template>
  <div class="home">
    <!-- 图标 -->
    <ul class="w iconly">
      <li @click="handleOfferly">
        <img :src='`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/pic/新能源.png`' />
        <span>新能源</span>
      </li>
      <li v-for="item in iconList" :key="item" @click="handleOffer(item)">
        <img :src='`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/pic/${item}.png`' />
        <span>{{item}}</span>
      </li>
    </ul>
    <!-- 定位 -->
    <div id="allmap"></div>
    <!-- 广告区域 -->
    <div class="w adv">
      <img v-show="this.obj0.pic" :src="this.obj0.pic ? this.obj0.pic : ''" alt="" @click="foreign1">
    </div>
    <!-- 横向Tab区域 -->
    <div class="w tab">
      <!-- 一级分类 -->
      <ul>
        <li @mouseenter="handle(index)" v-for="(item,index) in sliderDetails" :key="index">
          <h3 :class="currentTitle === index ? 'firstly' : 'first'">{{item.level}}</h3>
        </li>
      </ul>
    <div style="clear: both;"></div>
    <el-divider></el-divider>
    <ul class="sdf">
      <li style="border-bottom: 1px solid #ccc;" v-for="(item,index) in sliderSecond" :key="index">
        <h5 class="second" @click="handleOffer(item.level)">{{item.level}}</h5>
        <div v-for="i in item.car" :key="i.series">
          <div class="third">
            <div class="one" @click="seriesHome(i.series)" style="margin-bottom: 5px">{{i.series}}</div>
            <div class="two" style="color: #999">
              <span @click="picture(i.series)">图片</span>
              <span style="margin: 0 7px" @click="tableForum(i.series, i.forumId)">论坛</span>
              <span @click="matching(i.series)">配置</span>
            </div>
          </div>
        </div>
        <div class="more" @click="handleOffer(item.level)"></div>
        <div style="clear: both"></div>
      </li>
    </ul>
    </div>
    <!-- 今日焦点 -->
    <div class="w today">
      <h1>今日焦点</h1>
      <div class="contain">
        <!-- 左侧轮播图 -->
        <div class="block" style="width: 680px">
          <el-carousel height="340px" indicator-position="none">
            <el-carousel-item v-if="this.obj1.pic">
              <img @click="foreign2" style="height: 100%;cursor: pointer;" :src="this.obj1.pic ? this.obj1.pic : ''" alt="">
            </el-carousel-item>
            <el-carousel-item v-if="this.obj2.pic">
              <img @click="foreign3" style="height: 100%;cursor: pointer;" :src="this.obj2.pic ? this.obj2.pic : ''" alt="">
            </el-carousel-item>
            <el-carousel-item v-for="item in swiperList" :key="item.id">
              <img id="image" @click="jump_Today(item)" style="height: 100%;cursor: pointer;transition: all 1s;overflow: hidden" :src="item.coverPic" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 焦点新闻 -->
        <div>
          <h2 v-show="this.obj3.title" @click="foreign4(obj3)" style="margin-bottom: 15px; margin-top: -5px; text-align: center; color: red; cursor: pointer; padding: 0">{{this.obj3.title}}</h2>
          <ul>
            <li @click="jump_Today(item)" v-for="item in todayList" :key="item.id">{{item.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 特卖 -->
    <div class="w specialSale">
      <h1>近期特卖</h1>
      <el-divider></el-divider>
      <div class="swiper" v-for="item in specialList" :key="item">
        <div style="text-align: center"><img @click="specialImg(item)" :src="`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/${item}.png`" alt=""></div>
        <h3 @click="specialImg(item)">{{item}}</h3>
      </div>
    </div>
    <div style="clear: both"></div>
    <!-- 汽车资讯 -->
    <div class="w information">
      <!-- 标题 -->
      <div class="title">
        <h1>汽车资讯</h1>
        <div>
          <router-link to='/automotivelnformation/carnews' target="_blank">查看更多 >></router-link>
        </div>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 轮播图 -->
      <div class="block swiper">
        <el-carousel height="250px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in informationPhotolist" :key="index">
            <div class="image">
              <img @click="informationDetails(item.t)" :src="item.t.coverPic" alt="">
            </div>
            <ul>
              <li @click="informationDetails(items)" v-for="items in item.list" :key="items.id" class="li_img">
                <img :src="items.coverPic" alt="">
                <h5>{{items.title}}</h5>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 标题 -->
      <ul class="infor_title">
        <li v-for="item in informationTitlelist" @click="informationDetails(item)" :key="item.id">{{item.title}}</li>
      </ul>
    </div>
    <!-- 汽车图片 -->
    <div class="photo w">
      <!-- 标题 -->
      <div class="title">
        <h1>汽车图片</h1>
        <div>
          <router-link to='/picture/homepic' target="_blank">查看更多 >></router-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 图片轮播图 -->
      <div class="block swiper">
        <el-carousel height="300px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in photoList" :key="index">
            <div class="image">
              <img @click="photoDetails(item.t.series)" :src="item.t.pic" alt="">
            </div>
            <ul>
              <li @click="photoDetails(items.series)" v-for="items in item.list" :key="items.id" class="li_img">
                <img :src="items.pic" alt="">
                <div style="text-align: center; font-size: 14px">{{items.series}}</div>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 广告 -->
    <div class="w adv">
      <img v-show="this.obj4.pic" :src="this.obj4.pic ? this.obj4.pic : ''" alt="" @click="foreign5" style="margin-top: 15px">
    </div>
    <!-- 汽车视频 -->
    <div class="video w">
      <!-- 标题 -->
      <div class="title">
        <h1>汽车视频</h1>
        <div>
          <router-link to='/video/home' target="_blank">查看更多 >></router-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 轮播图 -->
      <div class="block swiper">
        <el-carousel height="250px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in videoSwiperList" :key="index">
            <div class="image">
              <img @click="videoTitle(item.t)" :src="item.t.coverPic" alt="">
            </div>
            <ul>
              <li @click="videoTitle(items)" v-for="items in item.list" :key="items.id" class="li_img">
                <img :src="items.coverPic" alt="">
                <h5>{{items.title}}</h5>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 汽车论坛 -->
    <div class="forum w">
      <!-- 标题 -->
      <div class="title">
        <h1>汽车论坛</h1>
        <div>
          <router-link to='/forum/forumtitle' target="_blank">查看更多 >></router-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 论坛图片 -->
      <div class="forum_main">
        <!-- 轮播图 -->
        <div class="block">
          <el-carousel height="250px" indicator-position="none">
            <el-carousel-item v-for="(item,index) in forumSwiperList" :key="index">
              <img @click="forumTitle(item.id)" :src="item.coverPic" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 图片 -->
        <ul>
          <li @click="forumTitle(item.id)" v-for="item in forumPicList" :key="item.id">
            <img :src="item.coverPic" alt="">
            <h5>{{item.title}}</h5>
          </li>
        </ul>
      </div>
    </div>
    <!-- 综合排行榜 -->
    <div class="w ranking_list">
      <!-- 标题 -->
      <h1 class="maintitle">综合排行榜</h1>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 详情 -->
      <el-row>
        <el-col :span="6">
          <div class="vice_title">资讯排行榜</div>
          <div @click="JumpArticle(item)" class="ranking" v-for="(item,index) in ArticleRankinglist" :key="item.id">
            <div>
              <span :class="index < 3 ? 'footer_color1' : 'footer_color2'" class="footer_span">{{index + 1}}</span>
              <span style="font-size: 15px">{{item.title}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="vice_title">贴子排行榜</div>
          <div @click="JumpPost(item.id)" v-for="(item,index) in PostRankinglist" :key="item.id" class="ranking">
            <div>
              <span :class="index < 3 ? 'footer_color1' : 'footer_color2'" class="footer_span">{{index + 1}}</span>
              <span style="font-size: 15px">{{item.title}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="vice_title">视频排行榜</div>
          <div @click="JumpVideo(item)" v-for="(item,index) in VideoRankinglist" :key="item.id" class="ranking">
            <div>
              <span :class="index < 3 ? 'footer_color1' : 'footer_color2'" class="footer_span">{{index + 1}}</span>
              <span style="font-size: 15px">{{item.title}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="vice_title">重点号排行榜</div>
          <div @click="JumpZhongdianhao(item)" v-for="(item,index) in Zhongdianhaolist" :key="item.id" class="ranking ranked">
            <div>
              <span :class="index < 3 ? 'footer_color1' : 'footer_color2'" class="footer_span">{{index + 1}}</span>
              <span style="width: 200px; display: inline-block; font-size: 15px">{{item.name}}</span>
              {{item.fansNum}}粉丝
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 广告 -->
    <div class="w adv">
      <img v-show="this.obj5.pic" :src="this.obj5.pic ? this.obj5.pic : ''" alt="" @click="foreign6" style="margin-top: 15px">
    </div>
    <!-- 底部 -->
    <div class="w footer">
      <ul>
        <li @mouseenter="changeFooter(index)" :class="footerCurrentIndex==index?'slectedSlider':''" v-for="(item,index) in footerLabel" :key="item.name">{{item.name}}</li>
      </ul>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <div v-for="item in footerLabelAry[footerCurrentIndex]" :key="item.label">
        <a :href="item.jump" target="_blank">{{item.label}}</a>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="topping">
      <img @click="back" src="../assets/back.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 广告
      advertiseList: [],
      advertiseListAll: [],
      obj0: {},
      obj1: {},
      obj2: {},
      obj3: {},
      obj4: {},
      obj5: {},
      // 定位
      LocationCity: '',
      // 图标
      iconList: [],
      // 导航选中项
      activeIndex: '/home',
      // 横向Tab
      sliderDetails: [],
      sliderSecond: [],
      currentTitle: 0,
      // 今日焦点
      swiperList: [],
      todayList: [],
      notodayList: '',
      adv: false,
      // 特卖
      specialList: [],
      // 论坛
      forumSwiperList: [],
      forumPicList: [],
      // 视频
      videoSwiperList: [],
      // 资讯
      informationTitlelist: [],
      informationPhotolist: [],
      // 图片
      photoList: [],
      // 综合排行榜
      ArticleRankinglist: [], // 文章排行榜
      PostRankinglist: [], // 帖子排行榜
      VideoRankinglist: [], // 视频排行榜
      Zhongdianhaolist: [], // 重点号排行榜
      // 底部footer 标题
      footerLabel: [
        { name: '热门IT产品' },
        { name: '友情链接' }
      ],
      footerLabelAry: [
        [
          { label: '快牙', jump: 'https://www.kuaiya.cn' },
          { label: '360安全卫士下载', jump: 'https://www.360.cn' },
          { label: '快手', jump: 'https://www.kuaishou.com' },
          { label: '腾讯管家', jump: 'https://m.qq.com' }
        ],
        [
          { label: '汽车之家', jump: 'https://www.autohome.com.cn' },
          { label: '爱卡汽车', jump: 'http://www.xcar.com.cn' },
          { label: '新浪汽车', jump: 'https://auto.sina.com.cn' },
          { label: '新车评网', jump: 'https://www.xincheping.com' },
          { label: '网易汽车', jump: 'https://auto.163.com' },
          { label: '凤凰网汽车', jump: 'http://auto.ifeng.com' }
        ]
      ],
      footerCurrentIndex: 0 // 当前索引
    }
  },
  methods: {
    // 广告区域
    async getAdvertisementAll () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [
          { name: '首页焦点图1', area: '' },
          { name: '首页焦点资讯', area: '' }
        ]
      })
      this.advertiseListAll = res
      this.obj1 = this.advertiseListAll[0] || {}
      this.obj3 = this.advertiseListAll[1] || {}
      if (this.obj3.title) {
        this.adv = true
        // 获取焦点标题资讯
        this.getTodayList()
      } else {
        // 获取焦点标题资讯
        this.getTodayList().then(() => {
          this.obj3 = this.todayList[0] || {}
          this.todayList = this.todayList.slice(1, 25)
        })
      }
    },
    async getAdvertisement () {
      const { data: res } = await this.$http.post('/adv/getAdv', {
        name: [
          { name: '首页顶部通栏', area: sessionStorage.getItem('LocationProvince') },
          { name: '首页焦点图2', area: sessionStorage.getItem('LocationCity') },
          { name: '首页中部通栏', area: sessionStorage.getItem('LocationProvince') },
          { name: '首页底部通栏', area: sessionStorage.getItem('LocationCity') }
        ]
      })
      this.advertiseList = res
      this.obj0 = this.advertiseList[0] || {}
      this.obj2 = this.advertiseList[1] || {}
      this.obj4 = this.advertiseList[2] || {}
      this.obj5 = this.advertiseList[3] || {}
    },
    foreign1 () {
      window.open(this.obj0.url, '_blank')
    },
    foreign2 () {
      if (this.obj1.url.indexOf('https://') > -1) {
        window.open(`${this.obj1.url}`)
      } else {
        window.open(`http://${this.obj1.url}`)
      }
    },
    foreign3 () {
      if (this.obj2.url.indexOf('https://') > -1) {
        window.open(`${this.obj2.url}`)
      } else {
        window.open(`http://${this.obj2.url}`)
      }
    },
    foreign4 (item) {
      if (this.adv) {
        if (this.obj3.url.indexOf('https://') > -1) {
          window.open(`${this.obj3.url}`)
        } else {
          window.open(`http://${this.obj3.url}`)
        }
      } else {
        this.jump_Today(item)
      }
    },
    foreign5 () {
      if (this.obj4.url.indexOf('https://') > -1) {
        window.open(`${this.obj4.url}`)
      } else {
        window.open(`http://${this.obj4.url}`)
      }
    },
    foreign6 () {
      if (this.obj5.url.indexOf('https://') > -1) {
        window.open(`${this.obj5.url}`)
      } else {
        window.open(`http://${this.obj5.url}`)
      }
    },
    // 百度定位
    ready () {
      setTimeout(() => {
        this.getSpecialsale()
        this.getAdvertisement()
      }, 1500)
    },
    // 图标
    async getIcon () {
      const res = await this.$http.post('/car/getAllL')
      this.iconList = res.data
    },
    // 横向Tab
    async getSliderList () {
      const { data: res } = await this.$http.post('/car/showTab')
      this.sliderDetails = res
      this.sliderSecond = this.sliderDetails[0].tab
    },
    // 切换tab标题
    handle (index) {
      this.sliderSecond = this.sliderDetails[index].tab
      this.currentTitle = index
    },
    // 跳转报价
    handleOfferly () {
      const { href } = this.$router.resolve({
        path: '/distr/offer',
        query: { id: '纯电动' }
      })
      window.open(href, '_blank')
    },
    handleOffer (item) {
      const { href } = this.$router.resolve({
        path: '/distr/offer',
        query: { id: item }
      })
      window.open(href, '_blank')
    },
    // 跳转汽车详情
    seriesHome (item) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/detailshome'
      })
      window.sessionStorage.setItem('carDetails', item)
      window.open(href, '_blank')
    },
    // 跳转图片详情
    picture (series) {
      const { href } = this.$router.resolve({
        path: '/picture/realshooting'
      })
      window.sessionStorage.setItem('photo', series)
      window.open(href, '_blank')
    },
    // 跳转参数配置
    matching (item) {
      const { href } = this.$router.resolve({
        path: '/automobile/details/ParameterConfiguration'
      })
      window.sessionStorage.setItem('carDetails', item)
      window.open(href, '_blank')
    },
    // 跳转论坛
    tableForum (item, id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/list',
        query: { name: item, id: id }
      })
      window.open(href, '_blank')
    },
    // 今日焦点
    // 今日焦点----轮播图
    async getSwiper () {
      const { data: res } = await this.$http.post('/video/homejd')
      this.swiperList = res
    },
    // 今日焦点----资讯新闻
    async getTodayList () {
      const { data: res } = await this.$http.post('/video/homejdT', {
        adv: this.adv
      })
      this.todayList = res
    },
    // 今日焦点----跳转
    jump_Today (item) {
      if (item.sign === '资讯') {
        const { href } = this.$router.resolve({
          path: '/automotivelnformation/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '视频') {
        const { href } = this.$router.resolve({
          path: '/video/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '帖子') {
        const { href } = this.$router.resolve({
          path: '/forum/post/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号视频') {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 特卖
    // 特卖----列表
    async getSpecialsale () {
      const { data: res } = await this.$http.post(`/sale/HomeSale`, {
        city: sessionStorage.getItem('selectCity') || sessionStorage.getItem('LocationCity')
      })
      // console.log(res)
      this.specialList = res
    },
    // 特卖----跳转详情页
    specialImg (brand) {
      const { href } = this.$router.resolve({
        path: '/specialsale/saledetails',
        query: { id: JSON.stringify({ brand: brand }) }
      })
      window.open(href, '_blank')
    },
    // 论坛
    // 论坛----轮播图
    async getForumSwiperlist () {
      const { data: res } = await this.$http.post('/Invit/homeInvit1')
      this.forumSwiperList = res
    },
    // 论坛----图片
    async getForumPiclist () {
      const { data: res } = await this.$http.post('/Invit/homeInvit27')
      this.forumPicList = res
    },
    // 论坛----跳转
    forumTitle (id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 视频
    // 视频轮播图
    async getVideoSwiper () {
      const { data: res } = await this.$http.post('/video/homeVideo')
      this.videoSwiperList = res
    },
    // 视频----跳转
    videoTitle (item) {
      if (item.sign === '视频') {
        const { href } = this.$router.resolve({
          path: '/video/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号视频') {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 资讯
    // 资讯----标题
    async getInformationTitleList () {
      const { data: res } = await this.$http.post('/Infor/homeInforTitle')
      // console.log(res)
      this.informationTitlelist = res
    },
    // 资讯----图片
    async getInformationPhotoList () {
      const { data: res } = await this.$http.post('/Infor/homeInfor')
      this.informationPhotolist = res
    },
    // 资讯----跳转
    informationDetails (item) {
      if (item.sign === '资讯') {
        const { href } = this.$router.resolve({
          path: '/automotivelnformation/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 汽车图片
    async getPhotoList () {
      const { data: res } = await this.$http.post('/Pic/getHot')
      this.photoList = res
    },
    // 汽车图片跳转
    photoDetails (id) {
      window.sessionStorage.setItem('photo', id)
      const { href } = this.$router.resolve('/picture/realshooting')
      window.open(href, '_blank')
    },
    // 综合排行榜
    // 资讯排行榜
    async getArticleRankinglist () {
      const { data: res } = await this.$http.post('/Infor/MostInforrank')
      this.ArticleRankinglist = res
    },
    JumpArticle (item) {
      if (item.sign === '资讯') {
        const { href } = this.$router.resolve({
          path: '/automotivelnformation/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号资讯') {
        const { href } = this.$router.resolve({
          path: '/media/details/infor',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 论坛排行榜
    async getPostRankinglist () {
      const { data: res } = await this.$http.post('/Invit/MostInvitrank')
      this.PostRankinglist = res
    },
    JumpPost (id) {
      const { href } = this.$router.resolve({
        path: '/forum/post/details',
        query: { id: id }
      })
      window.open(href, '_blank')
    },
    // 视频排行榜
    async getVideoRankinglist () {
      const { data: res } = await this.$http.post('/video/rank')
      this.VideoRankinglist = res
    },
    JumpVideo (item) {
      if (item.sign === '视频') {
        const { href } = this.$router.resolve({
          path: '/video/details',
          query: { id: item.id }
        })
        window.open(href, '_blank')
      } else if (item.sign === '重点号视频') {
        const { href } = this.$router.resolve({
          path: '/media/details/video',
          query: { id: item.keyNId }
        })
        window.open(href, '_blank')
      }
    },
    // 重点号排行榜
    async getZhongdianhao () {
      const { data: res } = await this.$http.post('/key/keyRank2')
      this.Zhongdianhaolist = res
    },
    JumpZhongdianhao (item) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: item.id }
      })
      window.open(href, '_blank')
    },
    // 热门IT产品切换
    changeFooter (index) {
      this.footerCurrentIndex = index
    },
    // 置顶
    back () {
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 图标
    this.getIcon()
    // 获取横向Tab区域数据
    this.getSliderList()
    // 今日焦点
    this.getSwiper()
    // 论坛
    this.getForumSwiperlist()
    this.getForumPiclist()
    // 视频轮播图
    this.getVideoSwiper()
    // 资讯
    this.getInformationPhotoList()
    this.getInformationTitleList()
    // 图片
    this.getPhotoList()
    // 综合排行榜
    this.getArticleRankinglist() // 文章排行榜
    this.getPostRankinglist() // 帖子排行榜
    this.getVideoRankinglist() // 视频排行榜
    this.getZhongdianhao() // 重点号排行榜
  },
  mounted () {
    this.ready()
    this.getAdvertisementAll()
  }
}
</script>

<style lang="less" scoped>
// 版心1200px
.w {
  width: 1200px;
  margin: 0 auto;
}
// 被选中项 增加样式
.slectedSlider {
  color: rgb(43, 121, 255)!important;
}
.select {
  color: red;
  font-weight: 700;
  font-size: 16px;
}
.footerCurrent {
  display: block!important;
}
a {
  text-decoration: none;
}
// 图标
.iconly {
  display: flex;
  justify-content: space-between;
  height: 50px;
  li {
    line-height: 50px;
    // font-size: 12px;
    color: #333;
    cursor: pointer;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
// 滑块区域
.tab {
  overflow: hidden;
  margin-top: 5px;
  .first {
    float: left;
    margin-right: 60px;
    font-size: 16px;
    font-weight: 400;
    height: 30px;
  }
  .firstly {
    float: left;
    margin-right: 60px;
    font-size: 16px;
    font-weight: 400;
    height: 30px;
    border-bottom: 2px solid rgb(43, 121, 255);
  }
  .firstly:hover {
    color: rgb(43, 121, 255);
    cursor: pointer;
  }
  .sdf {
    li {
      position: relative;
      .more {
        position: absolute;
        right: 5px;
        top: 25px;
        width: 10px;
        height: 10px;
        border-right: 2px solid #ccc;
        border-bottom: 2px solid #ccc;
        transform: rotate(-45deg);
        cursor: pointer;
      }
      .more:hover {
        border-right: 2px solid rgb(43, 121, 255);
        border-bottom: 2px solid rgb(43, 121, 255);
      }
    }
  }
  .second {
    float: left;
    margin-right: 10px;
    width: 60px;
    height: 50px;
    line-height: 50px;
  }
  .second:hover {
    color: rgb(43, 121, 255);
    cursor: pointer;
  }
  .third {
    float: left;
    font-size: 12px;
    padding-top: 10px;
    margin-right: 8px;
    width: 105px;
    height: 50px;
    text-align: center;
    cursor: pointer;
    .one {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }
    .one:hover {
      color: rgb(43, 121, 255);
    }
  }
  .third .two span:hover {
    color: rgb(43, 121, 255);
  }
}
// 今日焦点
.today {
  h1 {
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .contain {
    display: flex;
    justify-content: flex-start;
    .block {
      margin-right: 30px;
    }
  }
  #image:hover {
    transform: scale(1.05)
  }
  ul {
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 500px;
    li:hover {
      color: rgb(43, 121, 255);
      cursor: pointer;
    }
    li {
      width: 30%;
      border-right: 1px solid #ccc;
      height: 20px;
      margin-bottom: 20px;
    }
    li:nth-of-type(3n) {
      border-right: 0;
      padding-left: 12px;
    }
    li:nth-of-type(3n+2) {
      padding-left: 15px;
      padding-right: 10px;
    }
    li:nth-of-type(3n+1) {
      padding-right: 10px;
    }
  }
}
// 特卖
.specialSale {
  margin-top: 30px;
  margin-bottom: 30px;
  h1 {
    margin-bottom: 10px;
  }
  .swiper {
    float: left;
    width: 150px;
    h3 {
      font-size: 14px;
      font-weight: 400;
    }
    img {
      height: 100px;
      width: 100px;
    }
    h3 {
      text-align: center;
    }
  }
}
// 汽车论坛
.forum {
  margin-top: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    div {
      a {
        color: #999;
      }
      font-size: 14px;
      cursor: pointer;
    }
  }
  .forum_main {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    .el-carousel {
      width: 500px;
      margin-right: 40px;
      cursor: pointer;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 200px;
        height: 125px;
        margin-right: 30px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100px;
        }
        h5 {
          line-height: 18px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
        }
      }
      li:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
}
// 汽车图片
.photo {
  margin-top: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    div {
      a {
        color: #999;
      }
      font-size: 14px;
      cursor: pointer;
    }
  }
  .swiper {
    margin-top: 20px;
    .el-carousel {
      .el-carousel-item {
        display: flex;
        justify-content: flex-start;
      }
      .image {
        float: left;
        width: 500px;
        height: 300px;
        margin-right: 40px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        li {
          float: left;
          height: 150px;
          width: 200px;
          margin-right: 30px;
          cursor: pointer;
          img {
            width: 200px;
            height: 120px;
          }
        }
        li:nth-of-type(3n) {
          margin-right: 0;
        }
        li:nth-of-type(n+4) {
          margin-bottom: 0;
        }
      }
    }
  }
}
// 汽车视频
.video {
  margin-top: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    div {
      a {
        color: #999;
      }
      font-size: 14px;
      cursor: pointer;
    }
  }
  .swiper {
    margin-top: 20px;
    .el-carousel {
      .el-carousel-item {
        display: flex;
        justify-content: flex-start;
      }
      .image {
        float: left;
        width: 500px;
        height: 250px;
        margin-right: 40px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        li {
          float: left;
          height: 125px;
          width: 200px;
          margin-right: 30px;
          cursor: pointer;
          img {
            width: 200px;
            height: 100px;
          }
          h5 {
            font-weight: 400;
            text-align: center;
            line-height: 17px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        li:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
// 汽车资讯
.information {
  margin-top: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    div {
      a {
        color: #999;
      }
      font-size: 14px;
      cursor: pointer;
    }
  }
  .swiper {
    margin-top: 20px;
    .el-carousel {
      .el-carousel-item {
        display: flex;
        justify-content: flex-start;
      }
      .image {
        float: left;
        width: 500px;
        height: 250px;
        margin-right: 40px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      ul {
        li {
          float: left;
          height: 125px;
          width: 200px;
          margin-right: 30px;
          cursor: pointer;
          img {
            width: 200px;
            height: 100px;
          }
          h5 {
            font-weight: 400;
            text-align: center;
            line-height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        li:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
  .infor_title {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 25px;
    li {
      box-sizing: border-box;
      color: #333;
      width: 16%;
      margin-bottom: 10px;
      padding: 0 10px;
      margin-right: 8px;
      font-size: 14px;
    }
    li:nth-of-type(6n+1) {
      padding-left: 0;
    }
    li:nth-of-type(6n) {
      padding-right: 0;
    }
    li:hover {
      color: #2b79ff;
      cursor: pointer;
    }
  }
}
// 综合排行榜
.ranking_list {
  margin-top: 30px;
  .maintitle {
    font-size: 30px;
    font-weight: 700;
    height: 50px;
  }
  .vice_title {
    font-size: 18px;
    margin: 20px 0;
    text-align: center;
    color: #000;
  }
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ranking {
    letter-spacing: 2px;
    line-height: 30px;
    padding-right: 10px;
    cursor: pointer;
    color: #666666;
    >div {
      display: flex;
      align-items: center;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #eee;
    }
  }
  .ranked {
    padding-right: 0;
  }
  .ranking:hover {
    color: rgb(43, 121, 255);
  }
}
.footer_color1 {
  background-color: #f43636;
}
.footer_color2 {
  background-color: #999;
}
.footer_span {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 13px;
  font-size: 14px;
  color: #fff;
  border-radius: 2px;
}
// 底部footer
.footer {
  margin-top: 50px;
  margin-bottom: 70px;
  ul {
    padding: 0;
    margin-bottom: 15px;
    overflow: hidden;
  }
  li {
    float: left;
    margin-right: 40px;
    color: #999;
    font-weight: 700;
    cursor: pointer;
  }
  a {
    float: left;
    margin-right: 30px;
    text-decoration: none;
    color: #666666;
    height: 40px;
    line-height: 40px;
  }
  a:hover {
    color: rgb(43, 121, 255);
  }
}
h1 {
  font-size: 24px!important;
}
// 置顶
.topping {
  position: fixed;
  bottom: 70px;
  right: 30px;
  cursor: pointer;
}
</style>
