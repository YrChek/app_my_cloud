const http = process.env.REACT_APP_API_URL

export default async function fetchGet(url, token) {
  try {
    const response = await fetch(http + url, {
      headers: {
        Authorization: token
      }
    })
    console.log(url)
    if (!response.ok) {
      const data = await response.json()
      return {status: true, data: data, errorTitle: response.statusText}
    }
    const data = await response.json()
    return {status: false, data: data, errorTitle: ''}
  } catch (e) {
    console.log(e)
    return {status: true, data: 'Ошибка запроса', errorTitle: 'Неожиданная ошибка!'}
  } 
}