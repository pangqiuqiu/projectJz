import React from 'react'

export default class LocationCity extends React.Component {
  componentDidMount () {
    // 获取当前城市
    if (!sessionStorage.getItem('city')) this.getCity()
  }
  // 获取当前城市
  getCity () {
    let map = new window.BMap.Map("allmap")
    let point = new window.BMap.Point(116.331398, 39.897445)
    map.centerAndZoom(point, 18)
    let geolocation = new window.BMap.Geolocation()
    geolocation.getCurrentPosition(r => {
      sessionStorage.setItem('city', r.address.city)
      let mk = new window.BMap.Marker(r.point)
      map.addOverlay(mk)
      map.panTo(r.point)
    }, { enableHighAccuracy: true })
  }
  render () {
    return (
      <div id="allmap"></div>
    )
  }
}