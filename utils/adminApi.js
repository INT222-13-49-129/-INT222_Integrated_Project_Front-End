import { request,formData } from './api'

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
