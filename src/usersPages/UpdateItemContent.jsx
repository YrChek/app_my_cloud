import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import selectFilesFormat from "../added/fileFormat";
import "./homePages.css";
import errorRequestText from "../added/errorText";
import fetchPATH from "../fetch/fetchPATCH";
import { initItemContent, initErrorRequest, initTextFormUpdate } from "../data/initData";
import { useSelector } from "react-redux";

/**
 * Компонент для проведения пользователем доступных изменений контента
 * @requestor HomePage.jsx
 * @returns Увеличеный предпросмотр файла, форма для изменения контента, кнопки управления
 */

export default function UpdateItemContent() {

  const param = useParams();
  const navigate = useNavigate();
  const [itemContent, setItemContent] = useState(initItemContent);           // itemContent - данные item контента найденные по его id
  const [url, setUrl] = useState('#');                                       // url - url адрес для загрузки изображения
  const [textFormUpdate, setTextFormUpdate] = useState(initTextFormUpdate);  // вводимые пользователем данные в форму ввода
  const [errorRequest, setErrorRequest] = useState(initErrorRequest);        // параметры для отображения сообщения об ошибке
  const token = localStorage.getItem('token');
  const { getUserContent } = useSelector((state) => state.reduser)
  
  useEffect(() => {
    // получение и обработка данных из Local Storage 
    // const userStorage = localStorage.getItem('userData');
    let itemContent;
    try {
      // const userContent = JSON.parse(userStorage);
      // itemContent = userContent.filter((el) => Number(el.id) === Number(param.id))[0];

      itemContent = getUserContent.filter((el) => Number(el.id) === Number(param.id))[0];
      const comment = itemContent.comment;
      const regxp = /(^.+)(\.[a-zA-Z0-9]+)$/.exec(itemContent.filename)
      const filename = regxp[1]
      const type = regxp[2]

      setItemContent(itemContent);
      setTextFormUpdate({filename, comment, type})
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
  }, [])

  useEffect(() => {
    // получение url адреса для загрузки изображения
    if (itemContent.type) {
      const filetype = /image\//.test(itemContent.type);
      filetype ? setUrl(itemContent.file) : setUrl(`../${selectFilesFormat(itemContent.filename)}`);
    }
  }, [itemContent])

  const handlerChange = (e) => {
    // контроль элементов формы
    const { name, value } = e.target;
    setTextFormUpdate({...textFormUpdate, [name]: value});
  }

  const handlerButtonSave = (e) => {
    // Сохранение изменений при нажатии кнопки "Сохранить изменения"
    e.preventDefault();
    const filename = textFormUpdate.filename + textFormUpdate.type;
    const comment = textFormUpdate.comment;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    const body = JSON.stringify({filename, comment, headers});
    const http = `users/item/data/${param.id}/`;

    const fetch = async () => {
      const { status, data, errorTitle } = await fetchPATH(http, headers, body)
      if (status) {
        const errorText = errorRequestText(data)
        setErrorRequest({...errorRequest, status, title: errorTitle, errorText})
        return
      }
      console.log('Update OK')
      setTimeout(() => {
        navigate('/home')
      }, 500)

    }
    fetch()
  }

  const handlerButtonCancel = () => {
    // возврат к оновной странице пользователя
    navigate('/home')
  }


  return(
    <div className="update_item_content">
      <form className="update_form">
        <div className="box_image_update_item_content" >
          <img src={url} alt="Нет картинки" className="image_update_item_content"/>
        </div>
        <div className="texts_box_update_item_content">
          <div className="box_name_update_item_content">
            <span className="form-hint">Изменить название файла</span>
            <input type="text"
              className="name_update_item_content"
              name="filename"
              value={textFormUpdate.filename}
              onChange={handlerChange}
            />
          </div>
          <div className="box_comment_update_item_content">
            <span className="form-hint">Изменить комментарий</span>
            <textarea type="text"
              className="comment_update_item_content"
              name="comment"
              value={textFormUpdate.comment}
              onChange={handlerChange}
            />
          </div>
        </div>
      </form>
      <div className="box_buttons_update_content">
        <button className="button_save_update_item_content buttons_update_item_content" onClick={handlerButtonSave}>Сохранить изменения</button>
        <button className="button_cancel_update_item_content buttons_update_item_content" onClick={handlerButtonCancel}>Выйти</button>
      </div>
    </div>

  )
}