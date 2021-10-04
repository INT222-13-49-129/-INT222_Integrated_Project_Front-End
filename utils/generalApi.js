import { request } from './api'

export function foodtypes() {
    const url = `${process.env.config.BASE_URL}general/foodtype`
    return request('get', url,{})
  }