import axios from 'axios'

const fetch = (url, params, method = 'GET', data) => {
  const options = {
    url,
    method,
    params,
    data,
    timeout: 3000,
    withCredentials: true
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default fetch
