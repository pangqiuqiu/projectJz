import React from 'react'
import url from 'url'
// 组件
import DownloadApp from '../../../components/DownloadApp'
// 样式
import styles from './index.module.css'
import axios from '../../../untils/axios'

export default class SeriesDetails extends React.Component {
  state = {
    id: url.parse(this.props.location.search, true).query.id,
    // 车型数量
    num: 0,
    list: [],
    label: '大咖评车',
    currentIndex: 0
  }
  componentDidMount () {
    // 获取重点号内容
    this.getList()
    // 获取车型数量
    this.getCarNum()
  }
  // 获取车型数量
  async getCarNum () {
    const { data: res } = await axios.post('/car/carTypeNum', {
      series: this.state.id
    })
    this.setState({ num: res })
  }
  // 获取重点号内容
  async getList () {
    const { data: res } = await axios.post('/keyN/seriesKeyN', {
      label: this.state.label,
      series: this.state.id
    })
    this.setState({ list: res })
  }
  // 改变tab
  changeTitle (item,index) {
    this.setState({
      currentIndex: index,
      label: item.title
    }, () => {
      this.getList()
    })
  }
  // 跳转
  handle = (type, id) => {
    if (type === '重点号资讯') {
      this.props.history.push(`/infor_details?id=${id}`)
    } else {
      this.props.history.push(`/video_details?id=${id}`)
    }
  }
  render () {
    // tab栏标题
    const tabs = [
      { title: '大咖评车' },
      { title: '技术解读' },
      { title: '用车宝典' },
      { title: '玩车行家' },
      { title: '行业分析' },
      { title: '自驾旅行' },
      { title: '新能源车' },
      { title: '热点聚焦' },
      { title: '汽车文化' },
      { title: '车展' }
    ]
    return (
      <div style={{paddingTop: '70px'}}>
        {/* 下载APP */}
        <DownloadApp></DownloadApp>
        {/* 轮播图 */}
        <div className={styles.image}>
          <img src={`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/series/${this.state.id}.jpg`} style={{width: '100%'}} alt="" />
          <div className={styles.cover}></div>
          <h3>{this.state.id}</h3>
        </div>
        {/* 分类列表 */}
        <ul className={styles.gird} style={{marginBottom: '15px',backgroundColor: '#fff', paddingTop: '10px'}}>
          <li onClick={() => this.props.history.push(`/icon/cartype?id=${this.state.id}`)}>
            <img alt="" style={{width: '40px', height: '40px'}} src={require('../../../assets/series/chexingliebiao@2x.png')} />
            <div>{this.state.num}款车型</div>
          </li>
          <li onClick={() => this.props.history.push(`/icon/distributor?id=${this.state.id}`)}>
            <img alt="" style={{width: '40px', height: '40px'}} src={require('../../../assets/series/jingxiaosahng@2x.png')} />
            <div>经销商</div>
          </li>
          <li onClick={() => this.props.history.push(`/icon/picture?id=${this.state.id}`)}>
            <img alt="" style={{width: '40px', height: '40px'}} src={require('../../../assets/series/tupian@2x.png')} />
            <div>实拍图片</div>
          </li>
        </ul>
        {/* 重点号 */}
        <ul className={styles.hobbyList}>
          {
            tabs.map((item,index) => {
              return <li onClick={() => {this.changeTitle(item,index)}} style={this.state.currentIndex === index ? {'color': '#000', fontSize: '15px'} : {}} key={item.title}>{item.title}</li>
            })
          }
        </ul>
        <div className={styles.main}>
          {
            this.state.list.map(item => {
              return <div className={styles.item} key={item.id} onClick={() => {this.handle(item.type,item.id)}}>
                <img style={{width: '100%'}} alt="" src={item.object.coverPic} />
                <h3 className={styles.title}>{item.object.title}</h3>
                <div className={styles.user}>
                  <img style={{width: '40px', height: '40px', marginRight: '15px'}} alt="" src={item.key.headPic} />
                  <span>{item.key.name}</span>
                </div>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}