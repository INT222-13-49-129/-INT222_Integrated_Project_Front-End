import {
  request
} from './api'

export function foodtypes() {
  const url = `${process.env.config.BASE_URL}general/foodtype`
  return request('get', url, {})
}

export function foodmenusWithPage() {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page`
  return request('get', url, {})
}
