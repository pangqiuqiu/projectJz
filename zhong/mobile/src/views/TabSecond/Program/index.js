import React from 'react'
// axios
import axios from '../../../untils/axios'
// 样式
import styles from './index.module.css'
import './index.css'

const tabs = ['大咖评车', '用车宝典', '技术解读', '玩车行家', '行业分析', '自驾旅行', '新能源车', '热点聚焦', '汽车文化', '车展']

class Program extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      windowHeight: 0,
      label: sessionStorage.getItem('label') || '大咖评车',
      page: 0,
      currentIndex: JSON.parse(sessionStorage.getItem('index')) || 0,
      list: [] // 处理后的数据
    }
  }
  componentDidMount () {
    if (window.innerHeight > 650) {
      this.setState({ windowHeight: 1 })
    }
    // 获取数据列表
    this.getList()
    // 监听滚动事件
    window.onscroll = () => {
      let winHeight = Math.ceil(window.scrollY + window.innerHeight)
      if (winHeight >= document.body.scrollHeight - 50) {
        setTimeout(() => {
          this.setState({ page: this.state.page + 1 }, async () => {
            const { data: res } = await axios.post('/keyN/lm', {
              label: this.state.label,
              pageNo: this.state.page,
              pageSize: 2
            })
            this.setState({ list: [...this.state.list,...res] })
          })
        }, 1000)
      }
    }
  }
  // 获取列表信息
  async getList () {
    const { data: res } = await axios.post('/keyN/lm', {
      label: this.state.label,
      pageNo: this.state.page,
      pageSize: 14
    })
    this.setState({ list: res })
  }
  // 切换左侧tab栏
  changeTabItem (item, index) {
    sessionStorage.setItem('label', item)
    sessionStorage.setItem('index', JSON.stringify(index))
    this.setState({
      currentIndex: index,
      label: item,
      page: 0
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
    return (
      <div className={styles.contain} style={{paddingBottom: '34px'}}>
        <aside className={styles.aside}>
          {
            tabs.map((item,index) => {
              return <div onClick={() => {this.changeTabItem(item,index)}} className={this.state.windowHeight === 0 ? 'demo' : 'demo1'}  style={this.state.currentIndex === index ? {backgroundColor: '#fff'} : {}} key={item}>{item}</div>
            })
          }
        </aside>
        <ul className={styles.main}>
          {
            this.state.list.map((item,index) => {
              return <li key={index} onClick={() => {this.handle(item.type, item.id)}}>
                <img alt="" style={{marginRight: '15px', width: '100px', height: '100%'}} src={item.object.coverPic} />
                <div className={styles.title} style={{width: '100%'}}>
                  <div className={styles.one}>{item.title}</div>
                  <div className={styles.two}>{item.key.name}</div>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Program