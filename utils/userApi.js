import {  request,formData,requestImg } from './api'

export function addImgProfile(file) {
  const url = `${process.env.config.BASE_URL}user/addimgprofile`
  return request('post', url, formData({}, '', file), true)
}

export function getImgProfile() {
  const url = `${process.env.config.BASE_URL}user/imgprofile`
  return requestImg(url,true)
}

export function foodmenuImg(id) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/img/${id}`
  return requestImg(url,true)
}

export function foodmenu(id) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/${id}`
  return request('get', url, {}, true)
}

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

export function updateFoodmenu(updatefoodmenu, file) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/edit/${updatefoodmenu.foodmenuid}`
  return request('put', url, formData(updatefoodmenu, 'updatefoodmenu', file), true)
}

export function deleteFoodmenu(id) {
  const url = `${process.env.config.BASE_URL}user/foodmenu/delete/${id}`
  return request('delete', url, {}, true)
}

export function requestsWithPage(pageNo = 0, pageSize = 10) {
  const url = `${process.env.config.BASE_URL}user/request/page?pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {}, true)
}

export function createRequest(newrequest) {
  const url = `${process.env.config.BASE_URL}user/request/add`
  return request('post', url, formData(newrequest,'newrequest'), true)
}

export function deleteRequest(id) {
  const url = `${process.env.config.BASE_URL}user/request/delete/${id}`
  return request('delete', url, {}, true)
}

export function mealDate(date) {
  const url = `${process.env.config.BASE_URL}user/meal/date/${date}`
  return request('get', url, {}, true)
}

export function createMeal(newmeal) {
  const url = `${process.env.config.BASE_URL}user/meal/add`
  return request('post', url, formData(newmeal,'newmeal'), true)
}

export function updateMeal(updatemeal,id) {
  const url = `${process.env.config.BASE_URL}user/meal/edit/${id}`
  return request('put', url, formData(updatemeal,'updatemeal'), true)
}

export function deleteMeal(id) {
  const url = `${process.env.config.BASE_URL}user/meal/delete/${id}`
  return request('delete', url, {}, true)
}