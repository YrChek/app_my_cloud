import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchGet from "../fetch/fetchGet";
import errorRequestText from "../added/errorText";
import { initErrorRequest } from "../data/initData";
import UserItemFile from "./UserItemFile";
import fetchDelete from "../fetch/fetchDelete";

export default function UserFiles() {
  const token = localStorage.getItem('token')

  const params = useParams();
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [errorRequest, setErrorRequest] = useState(initErrorRequest);

  const userId = params.id
  const userLogin = params.login
  const userName = params.name
  const userEmail = params.email

  useEffect(() => {
    // получение файлов пользователя
    const url = `staff/content/?user=${userId}`
    const userDataFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
        setFiles(data)
    }
    userDataFeth()
  }, [])

  const handlerButtonDeleteUser = (e) => {
    // удаление пользователя
    e.preventDefault();
    const url = `/staff/users/${userId}/`
    const userDelete = async () => {
      const { status, data, errorTitle } = await fetchDelete(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
        navigate('/manager/users',  {replace: true})
    }
    userDelete()
  }

  return (
    <div className="user_fiels">
      <div className="user_data-user_files">
        <table className="user_data_table-user_files">
          <thead className="thead-user_data_table">
            <tr>
              <th>Пользователь</th>
              <th>Имя пользователя</th>
              <th>Email пользователя</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tbody-user_data_table">
              <td>{userLogin}</td>
              <td>{userName}</td>
              <td>{userEmail}</td>
              <td><button onClick={handlerButtonDeleteUser}>Удалить</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="data_files-user_files">
        <table className="data_files_table-user_files">
          <thead className="thead-data_files_table">
            <tr>
              <th>Название файла</th>
              <th>Тип файла</th>
              <th>Размер файла</th>
              <th>Дата создания</th>
              <th>Комментарий пользователя</th>
              <th>Действия</th>
            </tr>
          </thead>
        </table>
        <div className="scrol-tbody-data_files_table">
        <table className="data_files_table-user_files">
          <tbody className="tbody-data_files_table">
            {files.map((el) => <UserItemFile data={el} key={el.id} />)}    
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
