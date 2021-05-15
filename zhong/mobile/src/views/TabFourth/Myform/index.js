import React from 'react'
import { InputItem, Button, Toast } from 'antd-mobile'
import styles from './index.module.css'
import url from 'url'
import axios from '../../../untils/axios'

export default class Myform extends React.Component {
  state = {
    series: url.parse(this.props.location.search, true).query.id,
    name: '',
    phone: '',
    city: sessionStorage.getItem('city')
  }
  // 获取用户姓名
  changeName (e) {
    this.setState({ name: e })
  }
  // 获取用户手机号
  changePhone (e) {
    this.setState({ phone: e })
  }
  async handle () {
    if (this.state.name === '' || !(/^1[3456789]\d{9}$/.test(this.state.phone))) return Toast.fail('请将信息填写完整', 2)
    const res = await axios.post('/sale/addEnquiry', this.state)
    if (res.data !== true || res.status !== 200) return Toast.fail('提交失败', 1)
    Toast.success('提交成功', 1)
    this.props.history.goBack()
  }
  render () {
    return (
      <div style={{padding: '15px'}}>
        {/* 表单 */}
        <ul className={styles.ul}>
          <li>
            <div>选择的车系:</div>
            <InputItem type="text" value={this.state.series} style={{width: '100%'}}></InputItem>
          </li>
          <li>
            <div>对您的称呼:</div>
            <InputItem type="text" value={this.state.name} onChange={this.changeName.bind(this)} style={{width: '100%'}}></InputItem>
          </li>
          <li>
            <div>您的联系方式:</div>
            <InputItem type="text" value={this.state.phone} onChange={this.changePhone.bind(this)} style={{width: '100%'}}></InputItem>
          </li>
        </ul>
        {/* 提交 */}
        <Button type="primary" onClick={this.handle.bind(this)} style={{marginTop: '20px'}}>提交信息</Button>
      </div>
    )
  }
}