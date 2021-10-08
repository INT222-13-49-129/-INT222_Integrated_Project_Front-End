import {
  request
} from './api'

export function foodtypes() {
  const url = `${process.env.config.BASE_URL}general/foodtype`
  return request('get', url, {})
}

export function foodmenusWithPage(pageNo=0,pageSize=18) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page?pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}

export function foodmenusWithPageSearch(searchData="",pageNo=0,pageSize=18) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page/search?searchData=${searchData}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}
