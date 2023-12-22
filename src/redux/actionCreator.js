import { USER_TOKEN, USER_DATA, USER_CONTENT  } from "./action";

export const setToken = (dispatch) => (token) => {
  const action = {
    type: USER_TOKEN,
    payload: token
  }
  dispatch(action)
}

export const setUserData = (dispatch) => (userData) => {
  const action = {
    type: USER_DATA,
    payload: userData
  }
  dispatch(action)
}

export const setReduserUserContent = (dispatch) => (userContent) => {
  const action = {
    type: USER_CONTENT,
    payload: userContent
  }
  dispatch(action)
}
