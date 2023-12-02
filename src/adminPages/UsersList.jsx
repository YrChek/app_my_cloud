import { useEffect, useState } from "react"
import fetchGet from "../fetch/fetchGet";
import { initErrorRequest } from "../data/initData";
import errorRequestText from "../added/errorText";
import UserItem from "./UserItem";
import './adminPages.css'

export default function UsersList() {
  console.log('usersList');
  const token = localStorage.getItem('token');
  const params = localStorage.getItem('param');
  const [errorRequest, setErrorRequest] = useState(initErrorRequest);

  const [users, setUsers] = useState({count: null, next: null, previous: null, results: []});
  const [url, getUrl] = useState(params || 'staff/users')

  useEffect(() => {
    // получение списка пользователей
    // const url = 'staff/users';
    const usersDataFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
        setUsers({...users, count: data.count, next: data.next, previous: data.previous, results: data.results})
    }
    usersDataFeth()
    console.log(url)

  }, [url])

  const handlerNext = () => {
    const str = users.next
    const reg = str.match(/staff\/users.+/)
    localStorage.setItem('param', reg[0])
    getUrl(reg[0])
  }

  const handlerPrevious = () => {
    const str = users.previous
    const reg = str.match(/staff\/users.+/)
    localStorage.setItem('param', reg[0])
    getUrl(reg[0])
  }

  return (
    <div className="usersList">
      <section className="users_data">
        <table className="users_data_table">
          <caption className="users_data_table_caption">Список пользователей</caption>
          <thead className="users_data_table_thead">
            <tr>
              <th>Логин</th>
              <th>Имя</th>
              <th>email</th>
              <th>Администратор</th>
              <th>Количество файлов</th>
              <th>Размер файлов</th>
            </tr>
          </thead>
            {users.results.map((el) => <UserItem data={el} key={el.id}/>)}
        </table>
        <div className="page_buttons">
          {users.previous ? <div className="page_prev" onClick={handlerPrevious}>&lArr; назад</div> : null}
          {users.next ? <div className="page_next" onClick={handlerNext}>вперед &rArr;</div> : null}
        </div>
      </section>
    </div>
  )
}
