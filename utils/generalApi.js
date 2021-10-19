import {
  request,
  requestImg
} from './api'

export function foodtypes() {
  const url = `${process.env.config.BASE_URL}general/foodtype`
  return request('get', url, {})
}

export function foodmenuImg(id) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/img/${id}`
  return requestImg(url)
}

export function foodmenusWithPage(pageNo=0,pageSize=18) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page?pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}

export function foodmenusWithPageSearch(searchData="",pageNo=0,pageSize=18) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page/search?searchData=${searchData}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}

export function foodmenusWithPageSearchFoodtype(searchData="",foodtypeId=0,pageNo=0,pageSize=18) {
  const url = `${process.env.config.BASE_URL}general/foodmenu/page/search/foodtype?searchData=${searchData}&foodtypeId=${foodtypeId}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}

export function ingredientsType() {
  const url = `${process.env.config.BASE_URL}general/ingredients/type`
  return request('get', url, {})
}

export function ingredientsWithPage(type="",searchData="",pageNo=0,pageSize=7) {
  const url = `${process.env.config.BASE_URL}general/ingredients/page?type=${type}&searchData=${searchData}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {})
}
