import dayjs from "dayjs"
import selectFilesFormat from "../fileFormat"
import { Link } from "react-router-dom"

export default function UserItemContent({ data, del }) {
  const token = localStorage.getItem('token')
  // const { data } = props
  // const textURL = data.file.match(/.+\/+(.+)\..+$/)
  // const text = decodeURI(textURL[1])
  const date = dayjs(data.create_at).format('DD.MM.YYYY')

  const handlerDelete = (e) => {
    e.preventDefault()
    
    const http = process.env.REACT_APP_API_URL
    const url = `users/item/data/${data.id}`
    const delet = async () => {
      await fetch(http + url, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      })
  
      del(prev => {
        return prev * -1
      })
    }
    delet()
  }

  return (
    <tbody className="user_item_content_table_tbody">
      <tr>
        <td>
          <div className="user_item_div_picture">
            <Link to={`/page/${data.id}`}>
              <img className="user_item_picture" src={selectFilesFormat(data.filename)} alt="картинка" />
            </Link>
          </div>
        </td>
        <td>
          <Link to={`/page/${data.id}`} className="link_name">
            {data.filename}
          </Link>
        </td>
        <td>{data.size}</td>
        <td>{date}</td>
        <td>{data.comment}</td>
        <td>
          <button className="button_update bnt_page" type="button">Изменить</button>
          <button className="button_delete bnt_page" type="button" onClick={handlerDelete}>Удалить</button>
        </td>
    </tr>
  </tbody>
  )
}