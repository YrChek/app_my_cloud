export function validateDataUsername (username) {
  if (username.length < 4) return 'Короткое имя';
  if (username.length > 150) return 'Слишком длинное имя';
  if (/.*[\s].*/.test(username)) return 'Не используйте пробел.'
  if (!/^[a-zA-Z]/.test(username)) return 'Первым символом должна быть буква'
  if (!/^[a-zA-Z][a-zA-Z0-9-_@+-]{3,150}$/.test(username)) return 'Имя пишется латинскими буквами и может включать в себя знаки "@ _ + - "'
  return false
}

export function validateDataPassword (password) {
  if (password.length < 6) return 'Короткий пароль. Пароль должен быть не менее 6 символов';
  if (/^\d+$/.test(password)) return 'Пароль не должен состоять только из цифр: как минимум одна заглавная буква, одна цифра и один специальный символ.'
  if (/^[a-zA-Z]+$/.test(password)) return 'Пароль не должен состоять только из букв: как минимум одна заглавная буква, одна цифра и один специальный символ.'
  if (/.*[а-яА-Я].*/.test(password)) return 'Используйте только латинские буквы.'
  if (/.*[\s].*/.test(password)) return 'Не используйте пробел.'
  if (!/^.*[A-Z].*$/.test(password)) return 'Должна быть хоть одна заглавная буква, как минимум одна цифра и минимум один специальный символ'
  if (!/^.*[0-9].*$/.test(password)) return 'Должна быть хоть одна цифра, как минимум одна заглавная буква и минимум один специальный символ'
  if (/^[a-zA-Z0-9]+$/.test(password)) return 'Должен быть хоть однин специальный символ'
  return false
}

export function validateDataEmail (email) {
  if (!/@[^.]+\.[a-z]{2,4}$/.test(email)) return 'Проверьте правильность написания электронной почты'
  return false
}
