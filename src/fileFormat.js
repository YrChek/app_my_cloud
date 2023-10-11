const filesFormat = {
  '.jpg': 'picture-80.png',
  '.png': 'picture-80.png',
  '.bmp': 'picture-80.png',
  '.gif': 'picture-80.png',
  '.doc': 'microsoft-96.png',
  '.docx': 'microsoft-96.png',
  '.xls': 'microsoft-excel-96.png',
  '.xlsx': 'microsoft-excel-96.png',
  '.pdf': 'pdf-94.png',
  '.txt': 'txt-80.png',
  '.zip': 'zip-80.png',
  '.rar': 'zip-80.png',
  '.7z': 'zip-80.png',
  '.gzip': 'zip-80.png',
  '.mp3': 'audio-80.png',
  '.wav': 'audio-80.png',
  '.mp4': 'video-80.png',
  '.avi': 'video-80.png',
  '.mkv': 'video-80.png',
  '.wmv': 'video-80.png',
  '.flv': 'video-80.png',
  '.mpeg': 'video-80.png',
  '.fb2': 'FB-94.png',
  '.epub': 'FB-94.png',
  '.mobi': 'FB-94.png'
}

export default function selectFilesFormat(filesName) {
  let fileExtension
  if (filesName.match(/\.[a-zA-Z0-9]+$/i)) fileExtension = filesName.match(/\.[a-zA-Z0-9]+$/i)[0]
  if (fileExtension && filesFormat[fileExtension]) {
    return filesFormat[fileExtension]
  } else {
    return '#'
  }
}
