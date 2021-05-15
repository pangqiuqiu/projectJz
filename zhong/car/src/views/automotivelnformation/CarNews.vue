<template>
  <div id="app">
    <InformationMain :title="title" :adv="adv"></InformationMain>
  </div>
</template>

<script>
import InformationMain from '../../components/InformationMain.vue'
export default {
  components: {
    InformationMain
  },
  data () {
    return {
      title: '车讯',
      adv: '资讯焦点图'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
