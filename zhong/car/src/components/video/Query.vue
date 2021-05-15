<template>
  <div class="news">
    <h4>车系查视频</h4>
    <!-- 品牌 -->
    <el-select filterable v-model="formAligin.brand" style="width: 100%" placeholder="请选择品牌" @change="changeBrand">
      <el-option label="不限" value="不限"></el-option>
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
</template>

<script>
export default {
  data () {
    return {
      // 车系查视频
      formAligin: {
        brand: '',
        series: ''
      },
      // 品牌车系
      brnadList: [],
      seriesList: []
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
    // 查询
    submit () {
      this.$emit('fun', this.formAligin.series)
    }
  },
  created () {
    this.getBrand()
  },
  computed: {
    disabled () {
      if (this.formAligin.brand !== '') return false
      return true
    }
  }
}
</script>

<style lang="less" scoped>
// 车系查视频
.news {
  width: 215px;
  box-sizing: border-box;
  h4 {
    margin-bottom: 15px;
  }
  margin-bottom: 15px;
}
</style>
