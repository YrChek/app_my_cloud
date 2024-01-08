import { http } from "../added/currentUrl"

// const http = process.env.REACT_APP_API_URL

export default async function fetchPATH(url, headers, body) {
  try {
    const response = await fetch(http + url, {
      method: 'PATCH',
      headers,
      body
    })
    if (!response.ok) {
      const data = await response.json()
      return {status: true, data: data, errorTitle: response.statusText}
    }
    if (response.status !== 200) {
      return {status: false, data: response.statusText, errorTitle: response.statusText}
    }
    const data = await response.json()
    return {status: false, data: data, errorTitle: ''}
  } catch (e) {
    console.log(e)
    return {status: true, data: 'Ошибка запроса', errorTitle: 'Неожиданная ошибка!'}
  } 
}
