<template>
  <div class="anc">
    <ul class="left">
      <li v-for="(item,index) in cityIndex" :key="item" @click="demo(index)">{{item}}</li>
    </ul>
    <div class="right" ref="right">
      <div v-for="item in Ary" :key="item.label">
        <h3 ref="qwe">{{item.label}}</h3>
        <el-tree accordion :data="item.children" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 侧边栏
      Ary: [],
      // currentIndex: 0,
      cityList: {},
      cityIndex: []
    }
  },
  methods: {
    // 列表
    async getList () {
      const { data: res } = await this.$http.post('/car/brandSeriesCe2')
      this.Ary = res
      // console.log(res)
      this.Ary.forEach(item => {
        const first = item.label
        if (this.cityList[first]) {
          this.cityList[first].push(item)
        } else {
          this.cityList[first] = [item]
        }
      })
      const cityIndex = Object.keys(this.cityList).sort()
      this.cityIndex = cityIndex
    },
    // 传递车系
    handleNodeClick (data) {
      this.$emit('func', data)
      // if (data.children === null) {
      //   this.$emit('func', data.label)
      //   window.sessionStorage.setItem('photo', data.label)
      // } else {
      //   sessionStorage.removeItem('photo')
      //   window.sessionStorage.setItem('photo_brand', data.label)
      // }
    },
    demo (index) {
      this.$refs.right.scrollTop = this.$refs.qwe[index].offsetTop
      // this.currentIndex = index
    }
  },
  created () {
    // 获取品牌
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.anc {
  position: relative;
}
.anc .right {
  height: 850px;
  border: 1px solid #ccc;
  overflow: hidden;
  overflow-y: scroll;
  padding-left: 20px;
}
.anc .left {
  position: absolute;
  left: 0;
  height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: aliceblue;
  text-align: center;
  li:hover {
    // color: rgb(43, 121, 255);
    background-color: rgb(43, 121, 255);
    cursor: pointer;
  }
}
.opp {
  display: block;
}
.opp1 {
  display: none;
}
h3 {
  background-color: lavender;
  border: 1px solid #ccc;
}
h4 {
  background-color: #eee;
  cursor: pointer;
  color: rgb(43, 121, 255);
}
h5 {
  background-color: #ddd;
  cursor: pointer;
}
h5:hover {
  color: rgb(43, 121, 255);
}
</style>
