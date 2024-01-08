import { Link } from "react-router-dom";
import bytesConverter from "../added/byteConverter";
import { useState } from "react";
import fetchPATH from "../fetch/fetchPATCH";

export default function UserItem({ data }) {
  
  const token = localStorage.getItem('token');
  const [dataUser, setDataUser] = useState(data)

  const handlerClickingIsStaff = (e) => {
    // Изменение статуса администратора
    e.preventDefault();
    const url = `staff/users/${dataUser.id}/`;
    let staff;
    dataUser.is_staff ? staff = 'False' : staff = 'True'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const bodyData = {
      'is_staff': staff
    }
    const body = JSON.stringify(bodyData)
    const fetch = async () => {
      const { status, data } = await fetchPATH(url, headers, body)
      if (status) {
        setDataUser({...dataUser, is_staff: 'error'})
        return
      }
      setDataUser({...dataUser, is_staff: data.is_staff})
    }
    fetch()
  }

  return (
    <tbody className="user_data_item_content_table_tbody">
      <tr>
        <td><Link to={`/manager/user/${dataUser.id}/${dataUser.username}/${dataUser.full_name 
          ? dataUser.full_name 
          : 'no name'}/${dataUser.email}`}>{dataUser.username}</Link></td>
        <td>{dataUser.full_name}</td>
        <td>{dataUser.email}</td>
        <td onClick={handlerClickingIsStaff}>
          {
            dataUser.is_staff 
              ? dataUser.is_staff === 'error'
                ? 'Ошибка'
                : 'Да'
              : 'Нет'
          }
        </td>
        <td>{dataUser.files.count}</td>
        <td>{bytesConverter(Number(dataUser.files.sum))}</td>
    </tr>
  </tbody>
  )
}
