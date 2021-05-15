import React from 'react'
// 样式
import styles from './index.module.css'
// axios
import axios from '../../../untils/axios'

export default class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 猜你喜欢
      hobbyList: [],
      // 品牌列表
      brandList: [],
      // 索引列表
      indexList: [],
      // 每个字母的品牌数组
      scrollBrand: [],
      // 高亮索引
      activeIndex: 0
    }
  }
  componentDidMount () {
    // 获取猜你喜欢列表
    this.getHobbyList()
    // 获取品牌列表
    this.getBrandList()
    // 监听滚动事件
    window.addEventListener('scroll', this.scrollFun)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollFun)
  }
  // 获取猜你喜欢列表
  async getHobbyList () {
    const { data: res } = await axios.post('/car/xiu')
    this.setState({ hobbyList: res })
  }
  // 获取品牌列表
  async getBrandList () {
    const { data: res } = await axios.post('/car/brandSeriesCe')
    const indexList = []
    this.setState({ brandList: res }, () => {
      res.map(value => {
        indexList.push(value.label)
      })
      this.setState({ indexList })
    })
  }
  // 点击索引列表事件
  scroll (index) {
    this.setState({ activeIndex: index })
    document.documentElement.scrollTop = this.state.scrollBrand[index].offsetTop + 1
    document.body.scrollTop = this.state.scrollBrand[index].offsetTop + 1
  }
  // 滚动事件
  scrollFun = () => {
    let lessThan = []
    // console.log(document.documentElement.scrollTop)
    this.state.scrollBrand.forEach((item,index) => {
      if (item.getBoundingClientRect().top < 0) {
        lessThan.push(index)
      }
    })
    this.setState({ activeIndex: lessThan[lessThan.length - 1] })
  }
  render () {
    return (
      <div style={{paddingBottom: '30px', top: 0}} className={styles.all} ref="all">
        {/* 顶部 */}
        <header style={{backgroundColor: '#fff', padding: '15px 15px 0 15px' }}>
          <h2 style={{marginBottom: '20px', fontWeight: '400'}}>猜你喜欢</h2>
          <ul className={styles.hobbyList}>
            {
              this.state.hobbyList.map((item,index) => {
                return <li key={index} onClick={() => this.props.history.push(`/serieslist/seriesdetails?id=${item.series}`)}>
                  <img style={{width: '70px'}} alt="" src={item.carPic}></img>
                  <div style={{width: '70px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '12px'}}>{item.series}</div>
                </li>
              })
            }
          </ul>
        </header>
        {/* 索引列表 */}
        <ul className={styles.indexlist}>
          {
            this.state.indexList.map((item,index) => {
              return <li style={this.state.activeIndex === index ? {backgroundColor: '#4D8FFF'} : {}} onClick={this.scroll.bind(this, index)} className={styles.indexItem} key={item}>{item}</li>
            })
          }
        </ul>
        {/* 品牌列表 */}
        <ul ref="brandAll" id="brandAll" className={styles.brandAll}>
          {
            this.state.brandList.map((item,i) => {
              return <li className="li-item" key={item.label} ref={a => {this.state.scrollBrand[i] = a}}>
                {/* 首字符 */}
                <h2 style={{height: '30px', lineHeight: '30px', paddingLeft: '10px', fontWeight: '400'}}>{item.label}</h2>
                {/* 品牌 */}
                <div style={{backgroundColor: '#fff', paddingLeft: '10px'}}>
                  {
                    item.children.map(items => {
                      return <div onClick={() => this.props.history.push(`/library/serieslist?id=${items}`)} className={styles.items} key={items}>
                        <img src={`https://tupiancar.oss-cn-zhangjiakou.aliyuncs.com/${items}.png`} alt=""></img>
                        <div>{items}</div>
                      </div>
                    })
                  }
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}
