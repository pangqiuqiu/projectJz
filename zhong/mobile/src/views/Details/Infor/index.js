import React from 'react'
// 组件
import DownloadApp from '../../../components/DownloadApp'
import { Button } from 'antd-mobile'
// axios
import axios from '../../../untils/axios'
import url from 'url'
// 样式
import styles from './index.module.css'

export default class InforDetails extends React.Component {
  state = {
    // 视频内容
    detailsObj: {},
    userObj: {},
    time: '',
    label: '',
    id: url.parse(this.props.location.search, true).query.id,
    // 相关推荐
    recommendList: [],
    // 评论
    commentList: []
  }
  componentDidMount () {
    // 获取资讯详情信息
    this.getDetails()
    // 获取评论列表
    this.getCommentList()
  }
  // 组件跟新时的钩子
  async componentWillReceiveProps (nextProps) {
    await this.setState({
      id: url.parse(nextProps.location.search, true).query.id
    })
    // 获取资讯详情信息
    this.getDetails()
    // 获取评论列表
    this.getCommentList()
  }
  // 获取资讯详情信息
  async getDetails () {
    const { data: res } = await axios.post('/keyN/qx', {
      id: this.state.id
    })
    this.setState({
      detailsObj: res.object,
      userObj: res.key,
      time: res.postDate,
      label: res.label
    }, () => {
      this.getRecommendList()
    })
  }
  // 获取推荐列表
  async getRecommendList () {
    const { data: res } = await axios.post('/keyN/tj', {
      label: this.state.label
    })
    this.setState({
      recommendList: res
    })
  }
  // 获取评论列表
  async getCommentList () {
    const { data: res } = await axios.post('/keyN/showCom', {
      id: this.state.id
    })
    this.setState({
      commentList: res
    })
  }
  // 点击相关推荐
  handle = (type, id) => {
    if (type === '重点号资讯') {
      this.props.history.push(`/infor_details?id=${id}`)
    } else {
      this.props.history.push(`/video_details?id=${id}`)
    }
  }
  render () {
    return (
      <div style={{paddingTop: '70px'}}>
        {/* 组件 */}
        <DownloadApp></DownloadApp>
        {/* 资讯主体 */}
        <div className={styles.contain}>
          {/* 标题 */}
          <h2 style={{'wordWrap': 'break-word', letterSpacing: '3px'}}>{this.state.detailsObj.title}</h2>
          {/* 时间 */}
          <div style={{color: '#9E9E9E', fontSize: '15px', height: '50px', lineHeight: '50px'}}>{this.state.time}</div>
          {/* 用户 */}
          <div className={styles.user}>
            <img style={{width: '42px', height: '42px', marginRight: '20px', borderRadius: '50%'}} alt="" src={this.state.userObj.headPic}></img>
            <div>
              <div style={{fontSize: '20px', marginBottom: '10px'}}>{this.state.userObj.name}</div>
              {/* <div style={{fontSize: '13px'}}>{this.state.userObj.intro}</div> */}
            </div>
          </div>
          {/* 资讯内容 */}
          <main className={styles.main} dangerouslySetInnerHTML={{__html: this.state.detailsObj.text}}></main>
        </div>
        {/* 相关推荐 */}
        <div className={styles.recommend}>
          <h2 style={{fontWeight: 400}}>相关推荐</h2>
          <ul>
            {
              this.state.recommendList.map(item => {
                return <li onClick={() => {this.handle(item.type, item.id)}} key={item.id} style={{marginTop: '15px'}}>
                  <img style={{width: '140px', height: '70px'}} src={item.object.coverPic} alt="" />
                  <div style={{marginLeft: '15px'}} className={styles.userTitle}>
                    <h4 style={{fontWeight: 400, fontSize: '20x'}}>{item.title}</h4>
                    <span style={{color: '#888', fontSize: '13px'}}>{item.key.name}</span>
                  </div>
                </li>
              })
            }
          </ul>
        </div>
        {/* 精彩评论 */}
        <div className={styles.comment}>
        <h2 style={{fontWeight: 400, marginBottom: '20px'}}>相关评论</h2>
          <ul>
            {
              this.state.commentList.map(item => {
                return <li key={item.id}>
                  <img alt="" src={item.userHeadPic} style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}} />
                  <div>
                    <h4>{item.username}</h4>
                    <p style={{margin: '5px 0', color: '#888'}}>{item.text}</p>
                  </div>
                </li>
              })
            }
          </ul>
          {/* 更多评论 */}
          <Button onClick={() => this.props.history.push('/tab/mobile')} style={{marginTop: '10px'}} type="primary">下载重点APP 查看更多评论</Button>
        </div>
      </div>
    )
  }
}
