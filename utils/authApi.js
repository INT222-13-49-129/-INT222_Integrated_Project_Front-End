import { request,formData } from './api'

export function register(regis) {
  const url = `${process.env.config.BASE_URL}general/register`
  return request('post', url, formData(regis,'regis'))
}

export function pinresend(email) {
  const url = `${process.env.config.BASE_URL}general/pin/resend`
  return request('post', url, formData(email,'email'))
}

export function pinverify(emailpin) {
  const url = `${process.env.config.BASE_URL}general/pin/verify`
  return request('post', url, formData(emailpin,'emailpin'))
}
