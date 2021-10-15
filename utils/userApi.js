import {  request,formData } from './api'

export function foodmenusWithPage(pageNo = 0, pageSize = 18) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/page?pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {}, true)
}

export function foodmenusWithPageSearch(searchData = "", pageNo = 0, pageSize = 18) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/page/search?searchData=${searchData}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {}, true)
}

export function foodmenusWithPageSearchFoodtype(searchData = "", foodtypeId = 0, pageNo = 0, pageSize = 18) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/page/search/foodtype?searchData=${searchData}&foodtypeId=${foodtypeId}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {}, true)
}

export function createFoodmenu(newfoodmenu, file) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/add`
  return request('post', url, formData(newfoodmenu, 'newfoodmenu', file), true)
}
