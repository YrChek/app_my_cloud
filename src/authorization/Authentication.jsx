import { useNavigate } from 'react-router'
import './auth.css'
import { useState } from 'react'
import ErrorOutput from '../ErrorOutput'
import fetchPOST from '../fetch/fetchPOST'
import errorRequestText from '../added/errorText'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/actionCreator'

const initFormAuth = {
  username: '',
  password: ''
}
const initErrorRequest = {
  status: false,
  title: '',
  errorText: ''
}
const initInvalidData = {
  username: '',
  password: '',
}

/**
 * Форма авторизации пользователя для получения токена
 * @requestor Start.jsx || Реакция на нажатие кнопок выхода или сброса ошибок
 * @returns Форма ввода логина и пароля. Переход к регистрации
 */

export default function AuthenticationForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formAuth, setFormAuth] = useState(initFormAuth)
  const [errorRequest, setErrorRequest] = useState(initErrorRequest)
  const [invalidData, setInvalidData] = useState(initInvalidData)

  const handlerChange = (e) => {
    // контроль элементов формы
    const { name, value } = e.target;
    setFormAuth({...formAuth, [name]: value})
    setInvalidData({...invalidData, [name]: ''})
  }

  const handlerButtonReg = (e) => {
    // переход на страницу регистрации
    e.preventDefault()
    const url = '/auth/reg'
    navigate(url)
  }

  const handlerButtonError = () => {
    // закрытие сообщения об ошибке
    setErrorRequest({...errorRequest, status: false, errorText: ''})
  }

  const handlerButtonAuth = (e) => {
    // получение токена
    e.preventDefault()
    const url = 'auth/login/'
    const headers = {
      'Content-Type': 'application/json'
    }
    const aythData = {
      username: formAuth.username.toLowerCase(),
      password: formAuth.password,
    }

    const body = JSON.stringify(aythData)

    const fetch = async () => {
      const { status, data, errorTitle } = await fetchPOST(url, headers, body)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
      if (!data.auth_token) {
        setErrorRequest({...errorRequest, status: true, title: 'Неожиданная ошибка', errorText: 'Отсутствует авторизация'})
        return
      }
      const token = `Token ${data.auth_token}`;
      localStorage.setItem('token', token)
      setToken(dispatch)(token)
      navigate('/home')
    }
    fetch()
  }

  return (
    <div className="auth">
      <h2>Страница входа в приложение</h2>
      <form className='registration_form'>
        <div className="form-row indent">
            <span className="form-hint">Введите имя</span>
            <input type="text" 
              className="field"
              placeholder="Введите nickname, указанный при регистрации"
              name='username'
              value={formAuth.username}
              onChange={handlerChange}
              required />
            <span className="form-hint red">{invalidData.username}</span>
        </div>
        <div className="form-row indent">
            <span className="form-hint">Введите пароль</span>
            <input type="password" 
              className="field" 
              placeholder="Введите пароль, указанный при регистрации"
              name='password'
              value={formAuth.password}
              onChange={handlerChange}
              required />
            <span className="form-hint red">{invalidData.password}</span>
        </div>
        <div className='buttons_auth'>
          <div className="form-row">
              <button className="button_auth" onClick={handlerButtonAuth}>Войти</button>
          </div>
          <div className="form-row">
              <button className="button_auth_reg" onClick={handlerButtonReg}>Зарегистрироваться</button>
          </div>
        </div>
        {
        errorRequest.status
          ? <ErrorOutput title={errorRequest.title} text={errorRequest.errorText} handler={handlerButtonError} />
          : null 
        }
      </form>
      
    </div>
  )
}
