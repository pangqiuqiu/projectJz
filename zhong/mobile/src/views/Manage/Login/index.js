import React, { useState } from 'react'
import { InputItem, Toast, Button } from 'antd-mobile'
import axios from '../../../untils/axios'

const ManageLogin = () => {
  // 参数
  const [formAlign, setFormAlign] = useState({
    phone: '',
    password: ''
  })
  // 登录
  const submit = async () => {
    const { data: res } = await axios.post('/user/login', formAlign)
    if (res === '') return Toast.fail('账号或者密码错误')
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24ef6027f6157468&redirect_uri=https://www.zhongdianqiche.com/mobile/%23/manage/customer/${res}&response_type=code&scope=snsapi_base&state=128#wechat_redirect`
  }
  return (
    <div style={{overflow: 'hidden', height: '100%'}}>
      <h3 style={{margin: '40px 0', textAlign: 'center'}}>重点汽车网经销商登录</h3>
      <InputItem
        type="number"
        placeholder="请输入账号"
        onChange={value => setFormAlign({...formAlign, phone: value})}
      >账号</InputItem>
      <div style={{height: '10px'}}></div>
      <InputItem
        type="password"
        placeholder="请输入密码"
        onChange={value => setFormAlign({...formAlign, password: value})}
      >密码</InputItem>
      <div style={{height: '30px'}}></div>
      <Button type="primary" onClick={submit}>登录</Button>
    </div>
  )
}

export default ManageLogin