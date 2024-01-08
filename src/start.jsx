import { useEffect } from "react"
import { useNavigate } from "react-router"


/**
 * Стартовая страница при загрузке приложения
 * @returns Перенаправления на другие страницы, по состоянию аутентификации
 */
export default function Start() {
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home', {replace: true})
    } else {
      const url = '/auth'
      navigate(url,  {replace: true})
      }
  }, [])

  return (
    <></>
  )
}
