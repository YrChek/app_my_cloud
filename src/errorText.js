const translator = {
  'Enter a valid email address.': 'Введите действительный адрес электронной почты.',
  'This password is too short. It must contain at least 8 characters.': 'Этот пароль слишком короткий. Он должно содержать не менее 8 символов.',
  'This password is too common.': 'Этот пароль слишком распространен.',
  'This password is entirely numeric.': 'Этот пароль полностью цифровой.',
  'The password is too similar to the username.': 'Пароль слишком похож на имя пользователя.',
  'A user with that username already exists.': 'Пользователь с таким именем уже существует.',
  'Unable to log in with provided credentials.': 'Не удается войти в систему с предоставленными учетными данными.',
  'Invalid token.': 'Недопустимый токен.',
  "Authentication credentials were not provided.": 'Учетные данные для проверки подлинности предоставлены не были.'
}

export default function errorRequestText(data) {
  let text = false
  if (data.username) text = data.username[0];
  if (data.password) text = data.password[0];
  if (data.email) text = data.email[0];
  if (data.non_field_errors) text = data.non_field_errors[0]
  if (data.detail) text = data.detail
  if (translator[text]) {
    return translator[text]
  }
  if (typeof(text) === 'string') {
    return text
  }
  if (typeof(data) === 'string') {
    text = data
    return data
  }
  return 'Ошибка запроса!'
}
