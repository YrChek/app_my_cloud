/**
 * @description Сообщение об ошибках в запросе или заполнении форм
 * @requestor Registration.jsx, Authentication.jsx
 * @param PROPS - Текст заголовка, текст сообщения, обработчик нажатия кнопки
 * @returns Отображение сообщения об ошибках
 */
export default function ErrorOutput({title, text, handler}) {
 
  return (
          <div className='error'>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type='button' className='button_reg_error' onClick={handler}>OK</button>
        </div>
  )
}
