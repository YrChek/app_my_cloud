import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserItemContent from "./UserItemContent";
import './homePages.css'
import fetchGet from "../fetch/fetchGet";
import fetchPOST from "../fetch/fetchPOST";
import fetchExitAccount from "../fetch/fetchExitAccount";
import errorRequestText from "../errorText";
import ErrorOutput from "../errorOutput";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData, setUserContent } from "../redux/actionCreator";

const initErrorRequest = {
  status: false,
  title: 'Заголовок',
  errorText: 'Текст ошибки'
}


export default function HomePage() {
  console.log('HomePage')
  
  const token = localStorage.getItem('token')


  const navigate = useNavigate()
  const [user, setUser] = useState({username: 'No user', full_name: 'No name', email: 'No email'})
  const [userContent, setUserContent] = useState([])
  const [download, setDownload] = useState(1)
  const [errorRequest, setErrorRequest] = useState(initErrorRequest)

  // const { user_data, user_content} = useSelector((state) => state.reduser) // почему при перезагрузке страницы редюсер заново инициализируется?
  // const dispatch = useDispatch();

  useEffect(() => {
    const url = 'user/'
    const userDataFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
      // setUserData(dispatch)(data[0])
        setUser(data[0])
    }
    userDataFeth()
  }, [])

  useEffect(() => {
    const url = 'users/item/data/'
    const contentFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        setUserContent([])
        return
      }
        setUserContent(data)
        localStorage.setItem('userData', JSON.stringify(data))
    }
    contentFeth()
  }, [download])

  const handleChangeDownload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return
    const fileName = file.name
    const fileSize = file.size
    const fileType = file.type

    const formData = new FormData()
    formData.append('file', file, fileName)
    formData.append('comment', 'Нет комментария')
    formData.append('filename', fileName)
    formData.append('size', fileSize)
    formData.append('type', fileType)

    const url = 'users/item/data/'
    const headers = {
      Authorization: token
    }
    const body = formData

    const fetchDownload = async () => {
      const { status, data, errorTitle } = await fetchPOST(url, headers, body)
      console.log('STATUS =>', status)
      console.log('DATA =>', data)
      console.log('ERROR =>', errorTitle)
      if (!status) {
        setDownload(prev => {
          return prev * -1
        })
      }
    }

    fetchDownload()

  }

  const handlerButtonExit = (e) => {
    e.preventDefault()
    const exit = async () => {
      return await fetchExitAccount()
    }

    const exitBool = exit()

    if (exitBool) navigate('/auth', {replace: true})
  }

  const handlerButtonError = () => {
    setErrorRequest({...errorRequest, status: false, errorText: ''})
  }

  return (
    <div className="home_page">
        <section className="exit_section">
          <button className="button_exit" onClick={handlerButtonExit}>Выйти</button>
        </section>
        <main>
          <aside className="user_profile">
            <h2>Пользователь <br /> {user.username}</h2>
            <ul className="user_profile_list">
              <li>Имя: <br /> {user.full_name || 'No name'}</li>
              <li>Почта: <br /> {user.email}</li>
            </ul>
            <Link>Изменить</Link>
          </aside>
          <section className="user_contetn">
            <table className="user_content_table">
              <caption className="user_content_table_caption">Ваши файлы</caption>
              <thead className="user_content_table_thead">
                <tr>
                  <th>Превью</th>
                  <th>Название</th>
                  <th>Размер</th>
                  <th>Загружен</th>
                  <th>Коментарий</th>
                  <th>Действия</th>
                </tr>
              </thead>
              {/* <br /> */}
              {userContent.map((el) => <UserItemContent data={el} del={setDownload} key={el.id}/>)}
              {/* <UserItemContent data={initContetnt} /> */}
            </table>
            
          </section>
        </main>
        <section className="download_section">
          {/* <button className="button_download">Загрузить файл в хранилище</button> */}
          <input type="file" onChange={handleChangeDownload}/>
        </section>
        {errorRequest.status 
          ? <div className="error_page">
              <div className="error_popup">
                <ErrorOutput title={errorRequest.title} text={errorRequest.errorText} handler={handlerButtonError} />
              </div>
            </div>
          : null}
    </div>
  )
}