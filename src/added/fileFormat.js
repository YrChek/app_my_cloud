const filesFormat = {
  '.jpg': 'files/img/picture-80.png',
  '.png': 'files/img/picture-80.png',
  '.bmp': 'files/img/picture-80.png',
  '.gif': 'files/img/picture-80.png',
  '.doc': 'files/img/microsoft-96.png',
  '.docx': 'files/img/microsoft-96.png',
  '.xls': 'files/img/microsoft-excel-96.png',
  '.xlsx': 'files/img/microsoft-excel-96.png',
  '.pdf': 'files/img/pdf-94.png',
  '.txt': 'files/img/txt-80.png',
  '.zip': 'files/img/zip-80.png',
  '.rar': 'files/img/zip-80.png',
  '.7z': 'files/img/zip-80.png',
  '.gzip': 'files/img/zip-80.png',
  '.mp3': 'files/img/audio-80.png',
  '.wav': 'files/img/audio-80.png',
  '.mp4': 'files/img/video-80.png',
  '.avi': 'files/img/video-80.png',
  '.mpeg': 'files/img/video-80.png',
  '.fb2': 'files/img/FB-94.png',
  '.epub': 'files/img/FB-94.png',
  '.mobi': 'files/img/FB-94.png'
}

/**
 * Функция определения ссылки на заглушку-изображение в зависимости от расширения файла
 * @param filesName Имя файла с расширением
 * @returns Ссылка на изображение в папке public
 */
export default function selectFilesFormat(filesName) {
  let fileExtension
  if (filesName.match(/\.[a-zA-Z0-9]+$/i)) fileExtension = filesName.match(/\.[a-zA-Z0-9]+$/i)[0]
  if (fileExtension && filesFormat[fileExtension]) {
    return filesFormat[fileExtension]
  } else {
    return '#'
  }
}
