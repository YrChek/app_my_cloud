import { useState } from 'react'
import './auth.css'
import ErrorOutput from '../ErrorOutput'
import fetchPOST from '../fetch/fetchPOST'
import errorRequestText from '../added/errorText'
import { validateDataEmail, validateDataPassword, validateDataUsername } from '../added/validateData'
import { useNavigate } from 'react-router'


/**
 * Форма регистрации пользователя
 * @requestor Authentication.jsx
 * @operations Отправка данных формы регистрации на сервер по POST запросу
 * @operations При успешной регистрации, возврат к форме авторизации
 * @returns Форма регистрации либо сообщение ошибки регистрации
 */
export default function RegistrationForm() {
  
  const initForm = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  }
  const initErrorRequest = {
    status: false,
    title: '',
    errorText: ''
  }
  const initInvalidData = {
    username: '',
    password: '',
    email: ''
  }

  const navigate = useNavigate()
  const [form, setForm] = useState(initForm)
  const [errorRequest, setErrorRequest] = useState(initErrorRequest)
  const [invalidData, setInvalidData] = useState(initInvalidData)

  const handlerChange =(e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value})
    setInvalidData({...invalidData, [name]: ''})
  }

  const handlerButtonError = () => {
    setErrorRequest({...errorRequest, status: false, errorText: ''})
  }

  const handlerButtonReg = (e) => {
    e.preventDefault()
    const url = 'reg/'
    const headers = {
      'Content-Type': 'application/json'
    }
    const regData = {
      username: form.username.toLowerCase(),
      password: form.password,
      email: form.email,
      full_name: form.full_name
    }

    const body = JSON.stringify(regData)

    const validUsername = validateDataUsername(regData.username)
    if (validUsername) {
      setInvalidData({...invalidData, username: validUsername})
      return
    }

    const validPassword = validateDataPassword(regData.password)
    if (validPassword) {
      setInvalidData({...invalidData, password: validPassword})
      return
    }

    const validEmail = validateDataEmail(regData.email)
    if (validEmail) {
      setInvalidData({...invalidData, email: validEmail})
      return
    }

    const fetch = async () => {
      const { status, data, errorTitle } = await fetchPOST(url, headers, body)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
      navigate('/auth')
    }
    fetch()
  }

  return (
    <div className="auth">
      <h2>Страница регистрации</h2>
      <form className='registration_form'>
        <div className="form-row indent">
            <span className="form-hint">Придумайте себе Login</span>
            <input type="text" 
              className="field"
              placeholder="Login должен быть не менее четырех символов"
              name='username'
              value={form.name}
              onChange={handlerChange}
              required />
            <span className="form-hint red">{invalidData.username}</span>
        </div>
        <div className="form-row indent">
            <span className="form-hint">Придумайте пароль</span>
            <input type="password" 
              className="field" 
              placeholder="Пароль должен быть не менее 6 символов и состоять из букв, цифр и знаков"
              name='password'
              value={form.password}
              onChange={handlerChange}
              required />
            <span className="form-hint red">{invalidData.password}</span>
        </div>
        <div className="form-row indent">
            <span className="form-hint">Введите ваш email</span>
            <input type="email" 
              className="field" 
              placeholder="Например, ivan@gmail.com"
              name='email'
              value={form.email}
              onChange={handlerChange}
              required />
            <span className="form-hint red">{invalidData.email}</span>
        </div>
        <div className="form-row indent">
            <span className="form-hint">Введите ваше полное имя</span>
            <input type="text" 
              className="field" 
              placeholder="Например, Василий Пупкин"
              name='full_name'
              value={form.full_name}
              onChange={handlerChange} />
        </div>
        <div className="form-row">
            <button className="button_reg" onClick={handlerButtonReg}>Создать учетную запись</button>
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
