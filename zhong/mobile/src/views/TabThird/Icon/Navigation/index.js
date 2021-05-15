import React from 'react'
import url from 'url'

export default class Navigation extends React.Component {
  state = {
    address: url.parse(this.props.location.search, true).query.address
  }
  componentDidMount () {
    // 获取百度导航
    this.getNavigation()
  }
  // 获取百度导航
  getNavigation () {
    window.location.href = `https://api.map.baidu.com/geocoder?address=${this.state.address}&output=html&src=webapp.baidu.openAPIdemo`
  }
  render () {
    return (
      <div>
      </div>
    )
  }
}