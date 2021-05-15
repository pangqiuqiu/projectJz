<template>
  <div></div>
</template>

<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      province: '',
      city: ''
    }
  },
  methods: {
    ready () {
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        // console.log(r.address.city)
        this.a = r.address.province
        this.city = r.address.city
      }, { enableHighAccuracy: true })
    }
  },
  mounted () {
    this.ready()
  }
}
</script>

<style lang="less" scoped>
</style>
