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
      title: '行业文化',
      adv: '行业文化焦点图'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
