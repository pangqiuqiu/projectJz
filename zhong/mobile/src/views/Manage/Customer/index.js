import React, { useEffect } from 'react'
import axios from '../../../untils/axios'
import { Toast } from 'antd-mobile'

const ManageCustomer = () => {
  useEffect(() => {
    const getCode = async () => {
      const { data: res } = await axios.post('/user/getCode', { str: window.location.href })
      if (!res) return Toast.fail('绑定微信失败')
      Toast.success('您已成功绑定微信')
    }
    getCode()
  }, [])
  return (
    <div>
    </div>
  )
}

export default ManageCustomer