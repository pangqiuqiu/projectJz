import React from 'react'
// 组件
import DownloadApp from '../../../components/DownloadApp'
// axios
import axios from '../../../untils/axios'
import styles from './index.module.css'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      page: 0,
      isLoadingMore: false
    }
  }
  componentDidMount () {
    // 获取首页列表数据
    this.getHomeList()
    // 监听滚动事件
    const wrapper = this.refs.wrapper
    const loadMoreDataFn = this.loadMoreDataFn
    const that = this
    let timeCount
    function callback () {
      const top = wrapper.getBoundingClientRect().top // 加载更多距离顶部的距离
      const windowHeight = window.screen.height // 屏幕可视区域的高度
      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        loadMoreDataFn(that)
      } 
    }
    window.addEventListener('scroll', () => {
      if (this.state.isLoadingMore) return
      if (timeCount) {
        clearTimeout(timeCount)
      }
      timeCount = setTimeout(callback, 500)
    }, false)
  }
  // 加载更多事件
  async loadMoreDataFn (that) {
    await that.setState({ page: that.state.page + 1 })
    const { data: res } = await axios.post('/keyN/home', {
      pageNo: that.state.page,
      pageSize: 14
    })
    that.setState({ list: [...that.state.list,...res] })
  }
  // 获取列表数据
  async getHomeList () {
    const { data: res } = await axios.post('/keyN/home', {
      pageNo: this.state.page,
      pageSize: 14
    })
    this.setState({ list: res })
  }
  // 跳转
  handle = (type, id) => {
    if (type === '重点号资讯') {
      this.props.history.push(`/infor_details?id=${id}`)
    } else {
      this.props.history.push(`/video_details?id=${id}`)
    }
  }
  // 监听滚动事件
  bindHandleScroll =() => {
    let winHeight = Math.ceil(window.scrollY + window.innerHeight)
    return winHeight >= document.body.scrollHeight - 50 // 距离底部为50时候发送请求
  }
  render () {
    return (
      <div style={{paddingTop: '70px', paddingBottom: '50px'}}>
        {/* 下载APP */}
        <DownloadApp></DownloadApp>
        {/* 首页列表 */}
        <ul className={styles.inforList}>
          {
            this.state.list.map(item => {
              return <li style={{backgroundColor: '#fff'}} onClick={() => {this.handle(item.type,item.id)}} className={styles.inforList_item} key={item.id}>
                <div style={{borderRadius: '5px 5px 0 0', overflow: 'hidden'}}><img alt="" style={{height: '100%'}} src={item.object.coverPic}></img></div>
                <h3 className={styles.title} style={{minHeight: '48.8px', overflow: 'hidden'}}>{item.object.title}</h3>
                <div className={styles.user}>
                  <img style={{width: '25px', height: '25px', marginRight: '10px', borderRadius: '50%'}} alt="" src={item.key.headPic}></img>
                  <span style={{fontSize: '12px', display: 'inlineBlock', width: '80px'}}>{item.key.name}</span>
                  <img alt="" style={{width: '15px', height: '15px', verticalAlign: 'top'}} src={require('../../../assets/home/dianzan@2x.png')} />
                </div>
              </li>
            })
          }
        </ul>
        <div
          className={styles.loadMore}
          ref="wrapper"
          onClick={this.loadMoreDataFn.bind(this, this)}
        >
        </div>
      </div>
    )
  }
}