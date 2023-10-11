const http = process.env.REACT_APP_API_URL

export default async function fetchFormData(url, headers, body) {
  // const formData = new FormData()
  // formData.append('file', file, fileName)
  // formData.append('comment', 'new comment')
  // formData.append('filename', fileName)
  try {
    const response = await fetch(http + url, {
      method: 'POST',
      headers: headers,
      body: body
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  } 
  // console.log(formData)
}