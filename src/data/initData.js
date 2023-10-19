const initItemContent = {
  "id": 0,
  "user": 0,
  "comment": '',
  "file": '',
  "filename": '',
  "create_at": '',
  "download_date": null,
  "size": 0,
  "type": '',
  "url_hash": '',
}

const initErrorRequest = {
  status: false,
  title: '',
  errorText: ''
}

const initTextFormUpdate = {
  filename: '',
  comment: '',
  type: '',
}

const initUser = {
  "email": '',
  "username": '',
  "full_name": '',
  "is_staff": false,
}

const initDownloadSection = {
  comment: '',
  color: 'white',
  height: '22px',
  loading: 'off',
  type: true
}

export { initItemContent, initErrorRequest, initTextFormUpdate, initUser, initDownloadSection }
