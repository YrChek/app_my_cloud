import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import selectFilesFormat from "../fileFormat";
import "./homePages.css";

export default function DisplayItemContent() {

  const param = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({});
  const [url, setUrl] = useState('#');
  const [textForm, setTextForm] = useState({filename: '', comment: '', type: ''})

  useEffect(() => {
    const userStorage = localStorage.getItem('userData');
    let itemContent;
    try {
      const userContent = JSON.parse(userStorage);
      itemContent = userContent.filter((el) => Number(el.id) === Number(param.id))[0];
      setContent(itemContent);
      // const filename = itemContent.filename;
      const comment = itemContent.comment;
      const regxp = /(^.+)(\.[a-zA-Z0-9]+)$/.exec(itemContent.filename)
      const filename = regxp[1]
      const type = regxp[2]
      setTextForm({filename, comment, type})
    } catch (error) {
      console.log(error.message);
      navigate('/');
    }
    const file = itemContent.file;
    console.log(file);
  }, [])

  useEffect(() => {
    if (content.type) {
      const type = /image\//.test(content.type);
      type ? setUrl(content.file) : setUrl(`../${selectFilesFormat(content.filename)}`)
      console.log(selectFilesFormat(content.filename))
    }
  }, [content])

  const handlerChange = (e) => {
    // контроль элементов формы
    const { name, value } = e.target;
    setTextForm({...textForm, [name]: value})
  }

  return(
    <div className="display_item_content">
      <form className="update_form">
        <div className="box_image_item_content">
          <img src={url} alt="Нет картинки" className="image_item_content"/>
        </div>
        <div className="texts_box_item_content">
          <div className="box_name_item_content">
            <span className="form-hint">Название файла</span>
            <input type="text"
              className="name_item_content"
              name="filename"
              value={textForm.filename}
              onChange={handlerChange}
            />
          </div>
          <div className="box_comment_item_content">
            <span className="form-hint">Комментарий</span>
            <textarea type="text"
              className="comment_item_content"
              name="comment"
              value={textForm.comment}
              onChange={handlerChange}
            />
          </div>
        </div>
      </form>
      <div>{textForm.type}</div>
      <div className="box_buttons_display_content">
        <button className="button_save_display_item_content buttons_display_item_content">Сохранить</button>
        <button className="button_cancel_display_item_content buttons_display_item_content">Отмена</button>
      </div>
    </div>

  )
}