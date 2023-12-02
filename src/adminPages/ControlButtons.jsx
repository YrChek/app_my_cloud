import { Outlet, useNavigate } from "react-router";
import './adminPages.css';
import fetchExitAccount from "../fetch/fetchExitAccount";

export default function ControlButtons () {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  };

  const handlerButtonExit = (e) => {
    // выход из аккаунта
    e.preventDefault()
    const exit = async () => {
      return await fetchExitAccount()
    }

    const exitBool = exit()

    if (exitBool) navigate('/auth', {replace: true})
  }

  return (
    <div>
      <div className="control_buttons">
        <button className="back_button-control_buttons" onClick={goBack}>Назад</button>
        <button className="exit_button-control_buttons" onClick={handlerButtonExit}>Выйти</button>
      </div>
      <Outlet />
    </div>
  )
}
