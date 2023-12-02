import dayjs from "dayjs"
import bytesConverter from "../added/byteConverter"
import { useState } from "react";
import fetchDelete from "../fetch/fetchDelete";

export default function({data}) {

  const [deleted, setDeleted] = useState('no')
  const date = dayjs(data.create_at).format('DD.MM.YYYY');
  const comment = data.comment ? data.comment : 'no comment'
  const token = localStorage.getItem('token');

  const handlerDelete = (e) => {
    // реакция на нажатие кнопки "Удалить"
    e.preventDefault()
    
    const url = `staff/content/${data.id}`
    const delet = async () => {
      const { status, data } = await fetchDelete(url, token)
      if (status) {
        setDeleted('error')
        console.log(data)
        return
      }
      setDeleted('deleted')
    }
    delet()
  }
  return (
    <tr>
      <td>{data.filename}</td>
      <td>{data.type}</td>
      <td>{bytesConverter(Number(data.size))}</td>
      <td>{date}</td>
      <td>{comment}</td>
      <td style={{color: 'red'}}>
        {deleted === 'deleted' ? 'Удалено' : null}
        {deleted === 'error' ? 'Ошибка удаления' : null}
        {deleted === 'no' ? <button onClick={handlerDelete}>Удалить</button> : null}

      </td>
    </tr>
  )
}
