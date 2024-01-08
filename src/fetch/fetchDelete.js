import { http } from "../added/currentUrl"

// const http = process.env.REACT_APP_API_URL

export default async function fetchDelete(url, token) {
  try {
    const response = await fetch(http + url, {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    })
    if (!response.ok) {
      console.log('ststus_error',response.status)
      const data = await response.json()
      return {status: true, data: data, errorTitle: response.statusText}
    }
    return {status: false, data: 'Удалено', errorTitle: ''}
  } catch (e) {
    console.log(e)
    return {status: true, data: 'Ошибка запроса', errorTitle: 'Неожиданная ошибка!'}
  } 
}
