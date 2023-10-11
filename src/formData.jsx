// import fetchFormData from "./fetchFormData"
import fetchPOST from "./fetch/fetchPOST"
import fetchGet from "./fetch/fetchGet"

export default function FormDataReq() {

  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    const file = e.target.files[0]
    const fileName = file.name
    const fileSize = file.size

    const formData = new FormData()
    formData.append('file', file, fileName)
    formData.append('comment', 'no comment')
    formData.append('filename', fileName)
    formData.append('size', fileSize)

    const url = 'users/item/data/'
    const headers = {
      Authorization: token
    }
    const body = formData

    // eslint-disable-next-line no-unused-vars
    const { status, data, errorTitle } = fetchPOST(url, headers, body)

    // fetchFormData(url, headers, body)
    console.log(file.type)
  }

  const handleClick = (e) => {
    e.preventDefault()
    fetchGet()
  }

  return (
    <>
    <div className="form_container">
      <input type="file" onChange={(e) => handleChange(e)}/>
    </div>
    <div>
      <button onClick={(e) => handleClick(e)}>получить</button>
    </div>
    </>
  )
}
