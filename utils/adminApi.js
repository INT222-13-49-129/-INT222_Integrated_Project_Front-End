import { request,formData,requestImg } from './api'

export function createFoodtype(newfoodtype) {
  const url = `${process.env.config.BASE_URL}admin/foodtype/add`
  return request('post', url, formData(newfoodtype, 'newfoodtype'), true)
}

export function updateFoodtype(updatefoodtype, id) {
  const url = `${process.env.config.BASE_URL}admin/foodtype/edit/${id}`
  return request('put', url, formData(updatefoodtype, 'updatefoodtype'), true)
}

export function deleteFoodtype(id) {
  const url = `${process.env.config.BASE_URL}admin/foodtype/delete/${id}`
  return request('delete', url, {}, true)
}

export function createIngredients(newingredients) {
  const url = `${process.env.config.BASE_URL}admin/ingredients/add`
  return request('post', url, formData(newingredients, 'newingredients'), true)
}

export function updateIngredients(updateingredients, id) {
  const url = `${process.env.config.BASE_URL}admin/ingredients/edit/${id}`
  return request('put', url, formData(updateingredients, 'updateingredients'), true)
}

export function deleteIngredients(id) {
  const url = `${process.env.config.BASE_URL}admin/ingredients/delete/${id}`
  return request('delete', url, {}, true)
}

export function foodmenusWithPageSearchFoodtype(searchData = "", foodtypeId = 0, pageNo = 0, pageSize = 15) {
  const url = `${process.env.config.BASE_URL}admin/foodmenu/page/search/foodtype?searchData=${searchData}&foodtypeId=${foodtypeId}&pageNo=${pageNo}&pageSize=${pageSize}`
  return request('get', url, {}, true)
}

export function foodmenuImg(id) {
  const url = `${process.env.config.BASE_URL}admin/foodmenu/img/${id}`
  return requestImg(url,true)
}