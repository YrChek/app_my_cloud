import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
// import { useSelector } from "react-redux"
// import { setToken } from "./redux/actionCreator"

const http = process.env.REACT_APP_API_URL

/**
 * Стартовая страница при загрузке приложения
 * @returns Перенаправления на другие страницы, по состоянию аутентификации
 * @returns Вывод сообщения при недоступности сервера 
 */
export default function Start() {
  // const dispatch = useDispatch();
  const navigate = useNavigate()
  const [response, setResponse] = useState(true)
  const [useSignal, setUseSignal] = useState(1)
  // const { getUserContent} = useSelector((state) => state.reduser)


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
        // const token = getUserContent
        if (token) {
          // setToken(dispatch)(token)
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

  return (
    <>
      {!response 
        ? <div className="no_response">
            Нет связи с сервером
            <button onClick={handlerButtonOk}>OK</button>
          </div>
      : null}
    </>
  )
}

