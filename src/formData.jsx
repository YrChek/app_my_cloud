// import fetchFormData from "./fetchFormData"
import fetchPOST from "./fetch/fetchPOST"
import fetchGet from "./fetch/fetchGet"
import { useRef, useState } from "react";

/**
 * Черновик, для формирования HTTP запросов и анализа ответов
 * @returns кнопки управления
 */
export default function FormDataReq() {

  const token = localStorage.getItem('token')
  const uploadRef = useRef()
  const [files, setFiles] = useState(false)
  const [userComment, setUserComment] =useState('')
  const listAccepFileTypes = `audio/*, video/*, image/*, application/zip, application/x-rar-compressed,
    application/pdf, text/plain, text/xml, text/csv,
    .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`;
  

  const handleChange = (e) => {
    e.preventDefault()
    // const file = e.target.files[0]
    const fileName = files.name
    const fileSize = files.size
    const comment = userComment

    const formData = new FormData()
    formData.append('file', files, fileName)
    formData.append('comment', comment)
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
    const val = files
    console.log(val)
  }

  const handleClick = (e) => {
    e.preventDefault()
    fetchGet()
  }

  const handlerDown = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return
    setFiles(file)
    e.target.value = ''
  }

  const handlerTextarea = (e) => {
    const text = e.target.value
    setUserComment(text)
  }

  return (
    <div className="formData">
      <div className="form_container">
        <input type="file" 
          accept={listAccepFileTypes}
          ref={uploadRef}
          onChange={handlerDown}/>
      </div>
      <div className="view_block">
        {files 
          ? <div className="hidden-view_block">
              <span>название файла: {files.name}</span><br />
              <span>напишите комментарий</span><br />
              <textarea
                name="comment"
                value={userComment}
                onChange={handlerTextarea}
              >
              </textarea><br />
              <button onClick={handleChange}>Отправить</button>
            </div>
          : <button className="button_view_blok" onClick={() => uploadRef.current?.click()}>Загрузить</button> }
      </div>
      <div>
        <button onClick={(e) => handleClick(e)}>получить</button>
      </div>
    </div>
  )
}
