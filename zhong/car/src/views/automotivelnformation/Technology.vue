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
      title: '技术',
      adv: '技术焦点图'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
