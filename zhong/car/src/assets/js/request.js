import axios from 'axios'
export function follow (params = {}) {
  let promise
  return new Promise((resolve, reject) => {
    promise = axios.post('/key/gz', params)
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function list (params = {}) {
  let promise
  return new Promise((resolve, reject) => {
    promise = axios.post('/key/KeyNList', params)
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
