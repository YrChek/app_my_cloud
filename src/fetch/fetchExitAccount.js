import fetchPOST from "./fetchPOST"

export default async function fetchExitAccount() {
  if (!localStorage.getItem('token')) return false
    // const url = 'auth/token/logout/'
    const url = 'auth/logout/'
    const token = localStorage.getItem('token')
    const headers = {
      'Authorization': token
    }
    const body = false

    const { status, data } = await fetchPOST(url, headers, body)
      if (status) {
        console.log('ERROR ->', data)
        return false
      }
      localStorage.clear()
      return true
}
