import { useNavigate } from "react-router";
import "./homePages.css";
import fetchDownloadFile from "../fetch/fetchDownload";
import selectFilesFormat from "../added/fileFormat";
import dayjs from "dayjs";
import bytesConverter from "../added/byteConverter";

/**
 * Компонент для просмотра пользователем данных отдельного контента
 * @requestor UserItemContent.jsx
 * @returns Увеличеный предпросмотр файла, текстовые данные, кнопки управления
 */

export default function ViewItemContent({ data, exit }) {
  console.log('ViewItemContent')
  // console.log(data)

  const navigate = useNavigate();

  const createDate = dayjs(data.create_at).format('DD.MM.YYYY');
  let downloadDate = '';
  if (data.download_date) downloadDate = dayjs(data.download_date).format('DD.MM.YYYY');

  let url;
  const filetype = /image\//.test(data.type);
  filetype ? url = data.file : url = selectFilesFormat(data.filename);

  const handlerButtonPatch = (e) => {
    e.preventDefault()
    const urlFile = new URL(data.file)
    const downloadURL = `${urlFile.origin}/download/${data.url_hash}`
    navigator.clipboard.writeText(downloadURL)
    console.log(downloadURL)
  }

  const handlerDownload = (e) => {
    e.preventDefault();
    let result = false
    const consol = async () => {
      console.log('START')
      result = await fetchDownloadFile(data.file, data.filename)
      if (result) console.log('STOP')
    }
    consol()
  }

  const handlerButtonExit = (e) => {
    e.preventDefault()
    exit(false)
  }

  const transfer = () => {
    navigate(`/home/${data.id}`)
  }


  return(
    <div className="view_item_content">
      <div className="box-view_item_content">
        <div className="data-box-view_item_content">
          <div className="box_image-view_item_content" >
            <img src={url} alt="Нет картинки" className="image-view_item_content"/>
          </div>
          <div className="texts_box-view_item_content">
            <div className="box_name_content-view_item_content box">
              <span className="head_name_content-view_item_content italic">Название: </span>
              {/* <br /> */}
              <span className="name_content-view_item_content text bold" >{data.filename}</span>
            </div>
            <div className="box_create_content-view_item_content box">
              <span className="head_create_content-view_item_content italic">Дата загрузки: </span>
              {/* <br /> */}
              <span className="date_create_content-view_item_content bold">{createDate} г.</span>
            </div>
            <div className="box_size_content-view_item_content box">
              <span className="head_size_content-view_item_content italic">Размер файла: </span>
              {/* <br /> */}
              <span className="size_content-view_item_content bold">{bytesConverter(Number(data.size))}</span>
            </div>
            <div className="box_download_date_content-view_item_content box">
              <span className="download_date_content-view_item_content italic">Дата последнего скачивания: </span>
              {/* <br /> */}
              <span className="size_content-view_item_content bold">{downloadDate}</span>
            </div>
            <div className="box_comment-view_item_content box">
              <span className="head_comment-view_item_content italic underline">Комментарий:</span>
              <pre className="text_comment-view_item_content">{data.comment}</pre>
            </div>
          </div>
        </div>
        <div className="box_buttons_view_item_content">
          <button className="button_create-url_item_content buttons_view_item_content" onClick={handlerButtonPatch}>Ссылка для скачивания</button>
          <button className="button_update-view_item_content buttons_view_item_content" onClick={transfer}>Изменить</button>
          <button className="buttons_dowmload-view_item_content buttons_view_item_content" onClick={handlerDownload}>Скачать</button>
          <button className="button_cancel-view_item_content buttons_view_item_content" onClick={handlerButtonExit}>Выйти</button>
        </div>
      </div>
    </div>

  )
}