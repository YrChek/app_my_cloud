import dayjs from "dayjs";
import selectFilesFormat from "../added/fileFormat";
import { useNavigate } from "react-router-dom";
import bytesConverter from "../added/byteConverter";
import { http } from "../added/currentUrl";

/**
 * Компонент отображения отдельного контента в списке всего контента пользователя
 * @param  data данные отдельного контента (props) 
 * @param  sig setState для повторного рендеринга HomePage (props)
 * @param  content setState данных текущего контента (props)
 * @returns 
 */
export default function UserItemContent({ data, sig, content }) {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const date = dayjs(data.create_at).format('DD.MM.YYYY')
  // const http = process.env.REACT_APP_API_URL

  const handlerDelete = (e) => {
    // реакция на нажатие кнопки "Удалить"
    e.preventDefault()
    
    const url = `users/item/data/${data.id}`
    const delet = async () => {
      await fetch(http + url, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      })
  
      sig(prev => {
        return prev * -1
      })
    }
    delet()
  }

  const reProps = () => {
    content(data)
  }

  const transfer = () => {
    navigate(`/home/${data.id}`)
  }

  return (
    <tbody className="user_item_content_table_tbody">
      <tr>
        <td onClick={reProps}>
          <div className="user_item_div_picture">
            <img className="user_item_picture" src={selectFilesFormat(data.filename)} alt="картинка" />
          </div>
        </td>
        <td onClick={reProps}>{data.filename}</td>
        <td>{bytesConverter(Number(data.size))}</td>
        <td>{date}</td>
        <td onClick={reProps}>
          <div className="user_comment_item_content">
            {data.comment}
          </div>
        </td>
        <td>
          <button className="button_update bnt_page" type="button" onClick={transfer}>Изменить</button>
          <button className="button_delete bnt_page" type="button" onClick={handlerDelete}>Удалить</button>
        </td>
    </tr>
  </tbody>
  )
}