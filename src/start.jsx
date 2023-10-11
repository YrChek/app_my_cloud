import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import fetchPOST from "./fetch/fetchPOST"
import fetchGet from "./fetch/fetchGet"
import { useDispatch } from "react-redux"
import { setToken } from "./redux/actionCreator"

const http = process.env.REACT_APP_API_URL

export default function Start() {
  console.log('START')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [response, setResponse] = useState(true)
  const [useSignal, setUseSignal] = useState(1)


  useEffect(() => {
    const request = async () => {
      let resp
      try {
        resp = await fetch(`${http}/test`)
      } catch (error) {
        console.log(error)
      }
      if (resp && resp.ok) {
        const token = localStorage.getItem('token')
        if (token) {
          setToken(dispatch)(token)
          navigate('/home', {replace: true})
        } else {
          const url = '/auth'
          navigate(url,  {replace: true})
        }
      } else {
        setResponse(false)
      }
    }
    request()
  }, [useSignal])

  const handlerButtonOk = (e) => {
    e.preventDefault()
    console.log('Press button')
    setUseSignal(prev => {
      return prev + 1
    })
  }

  const handlerButtonExit = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('token')) return
    const url = 'auth/token/logout/'
    const token = localStorage.getItem('token')
    const headers = {
      'Authorization': token
    }
    const body = false

    const fetchu = async () => {
      const { status, data } = await fetchPOST(url, headers, body)
      if (status) {
        console.log('ERROR ->', data)
        return
      }
      localStorage.clear()
      const localUrl = '/auth'
      navigate(localUrl,  {replace: true})
    }
    fetchu()
    }
  const handlerButtonDemo = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    // const url = 'demo/registration/auth/users/me/'
    // const url = 'users/' // вывод данных текущего пользователя
    const url = 'users/item/data/'
    const request = async () => {
      const data = await fetchGet(url, token)
      console.log(data)
    }
    request()

  }

  return (
    <>
      <div className="start_page">
        <button onClick={handlerButtonExit}>Выйти</button>
      </div>
      <div>
        <button onClick={handlerButtonDemo}>Разное</button>
      </div>
      {!response 
        ? <div className="no_response">
            Нет связи с сервером
            <button onClick={handlerButtonOk}>OK</button>
          </div>
      : null}
    </>
  )
}

