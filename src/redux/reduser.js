import { USER_TOKEN, USER_DATA, USER_CONTENT } from "./action";

const initialState = {
  getToken: false,
  getUserData: {
    username: 'No user',
    full_name: 'No name',
    email: 'No email',
  },
  getUserContent: []
}

const reduser = (state=initialState, action) => {
  switch(action.type) {
    case USER_TOKEN: 
      return {
        ...state,
        getToken: action.payload
      }
    case USER_DATA: 
      return {
        ...state,
        getUserData: action.payload
      }
    case USER_CONTENT: 
      return {
        ...state,
        getUserContent: action.payload
      }
    default: return state
  }
}

export default reduser
