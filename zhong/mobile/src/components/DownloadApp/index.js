import React from 'react'
import { withRouter } from 'react-router-dom'
// 导入logo
import logo from '../../assets/logo/logo.png'
// 导入css文件
import styles from './index.module.css'

class DownloadApp extends React.Component {
  render () {
    return (
      <div className={styles.extension}>
        <div className={styles.extension_main}>
          <div className={styles.extension_image}>
            <img alt="" style={{width: '55px', height: '55px', marginRight: '20px'}} src={logo}></img>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4 style={{fontSize: '15px'}}>看车*选车*买车*聊车</h4>
              <p style={{margin: 0}}>就上重点汽车APP</p>
            </div>
          </div>
          <div onClick={() => this.props.history.push('/tab/mobile')} style={{backgroundColor: '#FFBE31', height: '40px', lineHeight: '40px', fontSize: '16px', border: 'none', color: '#fff', padding: '0 10px', borderRadius: '5px', textAlign: 'center'}}>下载APP</div>
        </div>
      </div>
    )
  }
}

export default withRouter(DownloadApp)