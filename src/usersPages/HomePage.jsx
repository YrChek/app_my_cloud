import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserItemContent from "./UserItemContent";
import ViewItemContent from "./ViewItemContent";
import listAccepFileTypes from "../data/listAccepFileTypes";
import './homePages.css'
import fetchGet from "../fetch/fetchGet";
import fetchPOST from "../fetch/fetchPOST";
import fetchExitAccount from "../fetch/fetchExitAccount";
import errorRequestText from "../added/errorText";
import ErrorOutput from "../ErrorOutput";
import { initUser, initErrorRequest, initDownloadSection  } from "../data/initData";
import { useDispatch, useSelector } from "react-redux";
import { setReduserUserContent } from "../redux/actionCreator";


/**
 * Основная страница после успешной аутентификации пользователя
 * @returns Личные данные пользователя, список его контента, кнопки управления, выбор и загрузка файлов на сервер
 */
export default function HomePage() {
  
  const token = localStorage.getItem('token')


  const navigate = useNavigate()
  const uploadRef = useRef();
  const [user, setUser] = useState(initUser);
  const [itemContent, setItemContent] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);
  const [dataDownloadSection, setdataDownloadSection] =useState(initDownloadSection);
  const [signal, setSignal] = useState(1);
  const [errorRequest, setErrorRequest] = useState(initErrorRequest);

  const { getUserContent } = useSelector((state) => state.reduser)
  const dispatch = useDispatch();

  useEffect(() => {
    // получение личных данных пользователя
    const url = 'user/'
    const userDataFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
        const { username, full_name,  email, is_staff} = data[0]
        setUser({...user, username, full_name, email, is_staff})
    }
    userDataFeth()
  }, [])

  useEffect(() => {
    // Получение списка контента пользователя и добавления его в localStorage
    const url = 'users/item/data/'
    const contentFeth = async () => {
      const { status, data, errorTitle } = await fetchGet(url, token)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        setReduserUserContent(dispatch)([])
        // setUserContent([])
        return
      }
        setdataDownloadSection({...dataDownloadSection, loading: 'off', comment:'', color:'white', height: '22px'})
        setReduserUserContent(dispatch)(data)
    }
    contentFeth()
  }, [signal])

  const handlerFileSelection = (e) => {
    // выбор файла
    const file = e.target.files && e.target.files[0];
    if (!file) return
    setSelectedFile(file)
    const typeFile = listAccepFileTypes.includes(file.type)
    setdataDownloadSection({...dataDownloadSection, color: 'black', height: '400px', type: typeFile})
    e.target.value = ''
  }

  const handlerTextarea = (e) => {
    // контроль заполнения поля для комментариев
    const text = e.target.value
    setdataDownloadSection({...dataDownloadSection, comment: text})
  }

  const handlerButtonDownload = () => {
    // Загрузка файла на сервер
    const fileName = selectedFile.name
    const fileSize = selectedFile.size
    const fileType = selectedFile.type
    const comment = dataDownloadSection.comment

    const formData = new FormData()
    formData.append('file', selectedFile, fileName)
    formData.append('comment', comment)
    formData.append('filename', fileName)
    formData.append('size', fileSize)
    formData.append('type', fileType)

    const url = 'users/item/data/'
    const headers = {
      Authorization: token
    }
    const body = formData

    setdataDownloadSection({...dataDownloadSection, loading: 'on'})

    const fetchDownload = async () => {
      const { status, data, errorTitle } = await fetchPOST(url, headers, body)
      console.log('ERROR =>', errorTitle)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest,  errorText: errorText})
        setSelectedFile(false)
        setdataDownloadSection({...dataDownloadSection, loading: 'error'})
        return
      }
      setSignal(prev => { return prev * -1 })
      setSelectedFile(false)
      setdataDownloadSection({...dataDownloadSection, loading: 'stop'})

    }

    fetchDownload()

  }

  const handlerButtonExit = (e) => {
    // выход из аккаунта
    e.preventDefault()
    const exit = async () => {
      return await fetchExitAccount()
    }

    const exitBool = exit()

    if (exitBool) navigate('/auth', {replace: true})
  }

  const handlerButtonCanelDownload = (e) => {
    // кнопка отмена загрузки файла
    e.preventDefault()
    setdataDownloadSection(initDownloadSection)
    setSelectedFile(false)
  }

  const handlerButtonError = () => {
    // управление нажатием кнопки "ОК" в сообщении об ошибке на странице
    setErrorRequest({...errorRequest, status: false, errorText: ''})
  }

  const handlerButtonControlPanel = (e) => {
    e.preventDefault()
    localStorage.removeItem('param')
    navigate('/manager/users')
  }

  return (
    <div className="home_page">
        <section className="exit_section">
          {user.is_staff? <button className="control_button" onClick={handlerButtonControlPanel}>Панель управления</button> : null}
          <button className="button_exit" onClick={handlerButtonExit}>Выйти</button>
        </section>
        <main>
          <aside className="user_profile">
            <h2>Пользователь <br /> {user.username}</h2>
            <ul className="user_profile_list">
              <li>Имя: <br /> {user.full_name || 'No name'}</li>
              <li>Почта: <br /> {user.email}</li>
            </ul>
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
              {getUserContent.map((el) => <UserItemContent data={el} sig={setSignal} content={setItemContent} key={el.id}/>)}
            </table>
            
          </section>
        </main>

        <section className="download_section">
          <input type="file"
            ref={uploadRef}
            accept={listAccepFileTypes}
            onChange={handlerFileSelection}
          />
          <div className="view_block-download_section" style={{'backgroundColor': dataDownloadSection.color, 'height': dataDownloadSection.height}}>
        {selectedFile 
          ? <div className="hidden-wiew_block-download_section">
              <div>
                <span className="head_select_file-download_section italic">Выбран файл: </span><span className="bold">{selectedFile.name}</span><br />
              </div>
              {!dataDownloadSection.type ? <div className="loading-download_section">Такой тип файла недопустим для загрузки</div> : null}
              <span className="head_textarea-download_section italic">Вы можете добавить комментарий</span>
              <textarea
                className="textarea-download_section"
                name="comment"
                value={dataDownloadSection.comment}
                onChange={handlerTextarea}
              >
              </textarea>
              <div className="buttons_section-view_block-download_section">
                <button className="buttons-download_section" onClick={handlerButtonCanelDownload}>Отмена</button>
                {dataDownloadSection.type ? <button className="buttons-download_section" onClick={handlerButtonDownload}>Загрузить</button> : null}
              </div>
            </div>
          : dataDownloadSection.loading === 'off'
            ? <button className="button_view_blok" onClick={() => uploadRef.current?.click()}>Выберите файл</button>
            : null
            }
          {dataDownloadSection.loading === 'on' ? <div className="loading-download_section">...loading</div> : null}
          {dataDownloadSection.loading === 'stop' ? <div className="response-download_section">Ждем ответа</div> : null}
          {dataDownloadSection.loading === 'error' ? <div className="response-download_section">{errorRequest.errorText}</div> : null}
          {dataDownloadSection.loading === 'error' ? <button className="buttom_error-download_section" onClick={handlerButtonCanelDownload}>OK</button> : null}
      </div>
        </section>

        {errorRequest.status 
          ? <div className="error_page">
              <div className="error_popup">
                <ErrorOutput title={errorRequest.title} text={errorRequest.errorText} handler={handlerButtonError} />
              </div>
            </div>
          : null}
        {itemContent ? <ViewItemContent data={itemContent} exit={setItemContent}/> : null}
    </div>
  )
}