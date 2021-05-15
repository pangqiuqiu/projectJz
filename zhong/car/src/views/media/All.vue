<template>
  <div>
    <!-- 分类 -->
    <header>
      <span>排序</span>
      <ul>
        <li :class="currentIndex === index ? 'select' : ''" v-for="(item,index) in title" :key="item" @click="changeTitle(index,item)">{{item}}</li>
      </ul>
    </header>
    <!-- 列表 -->
    <ul class="key">
      <li v-for="(item,index) in list" :key="index">
        <div style="text-align: center; margin: 20px 0"><img @click="all(item.id)" :src="item.headPic" alt=""></div>
        <h3>{{item.name}}</h3>
        <p>{{item.intro}}</p>
        <div class="foot">
          <span>{{item.fansNum | fans}}</span>
          <span>|</span>
          <span>{{item.worksNum | works}}</span>
        </div>
        <Follow style="margin-top: 15px" :btn="item.bgz" :others="item.id"></Follow>
      </li>
    </ul>
    <!-- 加载更多 -->
    <footer @click="clickMore">加载更多</footer>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Follow from '../../components/media/Follow'
export default {
  components: {
    Follow
  },
  data () {
    return {
      // 分类标准
      title: ['粉丝数', '最新加入'],
      titleJava: '粉丝数',
      // 标题当前索引
      currentIndex: 0,
      // 列表
      list: [],
      // 加载更多
      count: 0
    }
  },
  methods: {
    // 切换标题
    changeTitle (index, title) {
      this.currentIndex = index
      // 清空点击数 切换标题
      this.count = 0
      this.titleJava = title
      this.getKeyList()
    },
    // 获取列表数据
    async getKeyList () {
      const { data: res } = await this.$http.post('/key/showKey', {
        clickNum: this.count,
        px: this.titleJava,
        userId: Cookie.get('ID') || ''
      })
      this.list = res
    },
    // 加载更多
    clickMore () {
      this.count++
      this.getKeyList()
    },
    // 跳转个人主页面
    all (id) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  },
  filters: {
    fans (data) {
      return data + '粉丝'
    },
    works (data) {
      return data + '作品'
    }
  },
  created () {
    // 获取列表数据
    this.getKeyList()
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color: #f5f5f5')
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
.select {
  color: rgb(43, 121, 255);
}

header {
  overflow: hidden;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  margin-bottom: 20px;
  span {
    float: left;
    margin-right: 50px;
    color: #333;
    font-weight: 700;
  }
  ul {
    float: left;
    li {
      float: left;
      cursor: pointer;
      margin-right: 15px;
      color: #999;
    }
  }
}

// 重点号列表
.key {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    width: 224px;
    height: 260px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    text-align: center;
    padding: 0 20px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
    }
    h3 {
      color: #333;
    }
    p {
      color: #999;
      font-size: 13px;
      height: 33.6px;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .foot {
      :nth-child(2) {
        margin: 0 10px;
      }
      color: #333;
      font-size: 15px;
    }
    .el-button {
      margin-top: 15px;
    }
  }
  li:nth-of-type(5n) {
    margin-right: 0;
  }
}

// 加载更多
footer {
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  text-align: center;
  color: #333;
}

footer:hover {
  cursor: pointer;
  color: rgb(43, 121, 255);
}
</style>
