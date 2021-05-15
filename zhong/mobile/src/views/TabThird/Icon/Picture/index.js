import React from 'react'
import url from 'url'
// 图片预览和懒加载
import WxImageViewer from 'react-wx-images-viewer'
// axios
import axios from '../../../../untils/axios'
// 样式
import styles from './index.module.css'

export default class Picture extends React.Component {
  state = {
    id: url.parse(this.props.location.search, true).query.id,
    type: ['外观', '内饰', '空间'], // 标题
    currentIndex: 0,
    place: '外观',
    picList: [], // 图片数组
    index: 0,
    isOpen: false
  }
  componentDidMount () {
    // 获取图片信息
    this.getPhoto()
  }
  // 获取图片信息
  async getPhoto() {
    const { data: res } = await axios.post('/pic/picList', {
      series: this.state.id,
      place: this.state.place
    })
    this.setState({ picList: res })
  }
  // 切换图片分类
  changePicture (item,index) {
    this.setState({ currentIndex: index, place: item }, () => {
      this.getPhoto()
    })
  }
  onClose = () => {
    this.setState({ isOpen: false })
  }
  openViewer (index) {
    this.setState({ index, isOpen: true })
  }
  render () {
    const { index, isOpen } = this.state
    return (
      <div>
        {/* 车系 */}
        <h2 style={{height: '50px', lineHeight: '50px', backgroundColor: '#fff', padding: '0 20px', position: 'fixed', width: '100%'}}>{this.state.id}</h2>
        {/* 分类 */}
        <ul className={styles.typeList}>
          {
            this.state.type.map((item,index) => {
              return <li onClick={this.changePicture.bind(this,item,index)} style={this.state.currentIndex === index ? {'color': 'rgb(43, 121, 255)'} : {}} key={item}>{item}</li>
            })
          }
        </ul>
        {/* 图片 */}
        <div style={{overflow: 'hidden'}}>
          <div className={styles.image} style={{marginTop: '100px'}}>
            {
              this.state.picList.map((item, index) => {
                return <img src={item} className={styles.itemImage} key={item} style={{width: '30%'}} alt="" onClick={this.openViewer.bind(this, index)} />
              })
            }
          </div>
        </div>
        {
          isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.picList} index={index} /> : ""
        }
      </div>
    )
  }
}