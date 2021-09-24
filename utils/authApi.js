import { request,formData } from './api'

export function register(regis) {
  const url = `${process.env.config.BASE_URL}general/register`
  return request('post', url, formData(regis,'regis'))
}
