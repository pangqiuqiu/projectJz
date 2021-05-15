<template>
  <el-card class="keyNumber" style="box-shadow: 0 0 0 0">
    <div slot="header" class="clearfix">
      <h3>重点号推荐</h3>
    </div>
    <ul>
      <li v-for="(item,index) in keyNumberList" :key="index">
        <div class="headerPic">
          <img :src="item.headPic" alt="" @click="jump(item.id)">
        </div>
        <div class="introduce">
          <div style="height: 24px">
            <h6>{{item.name}}</h6>
            <Follow class="follow" :btn="item.bgz" :others="item.id"></Follow>
          </div>
          <p>{{item.intro}}</p>
        </div>
      </li>
    </ul>
  </el-card>
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
      // 重点号推荐
      keyNumberList: []
    }
  },
  methods: {
    // 重点号推荐
    async getKeyNumber () {
      const { data: res } = await this.$http.post('/key/recFollowJ', {
        userId: Cookie.get('ID') || ''
      })
      this.keyNumberList = res
    },
    // 跳转重点号
    jump (id) {
      const { href } = this.$router.resolve({
        path: '/media/user',
        query: { id: id }
      })
      window.open(href, '_blank')
    }
  },
  created () {
    this.getKeyNumber()
  }
}
</script>

<style lang="less" scoped>
// 重点号推荐
.keyNumber {
  margin-top: 20px;
  h3 {
    color: #333;
  }
  li {
    overflow: hidden;
    margin-bottom: 10px;
    .headerPic {
      float: left;
      cursor: pointer;
    }
    .introduce {
      float: left;
      box-sizing: border-box;
      width: 240px;
      padding-left: 10px;
      h6 {
        font-size: 14px;
        float: left;
      }
      .follow {
        float: right;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-wrap: break-word;
        color: #999999;
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
