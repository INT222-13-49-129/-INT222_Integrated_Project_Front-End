import axios from 'axios'
const getToken = function () {
  if (process.server) {
    // server side
    return
  }
  if (window.$nuxt) {
    return window.$nuxt.$auth.strategy.token.get()
  }
}

export function formData(data, name, file = null) {
  const jsonPro = JSON.stringify(data)
  const blob = new Blob([jsonPro], {
    type: 'application/json'
  })
  const formData = new FormData()
  if(file !== null){
    formData.append('file', file)
  }
  formData.append(name, blob)
  return formData
}

export async function request(method, url, data, auth = false) {
  const headers = {}
  if (auth) {
    headers.Authorization = getToken()
  }
  const response = await axios({
    method,
    url,
    data,
    headers
  })
  return response
}
