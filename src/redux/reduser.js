import { USER_TOKEN, USER_DATA, USER_CONTENT } from "./action";

const initialState = {
  token: false,
  user_data: {
    username: 'No user',
    full_name: 'No name',
    email: 'No email',
  },
  user_content: []
}

const reduser = (state=initialState, action) => {
  switch(action.type) {
    case USER_TOKEN: 
      return {
        ...state,
        token: action.payload
      }
    case USER_DATA: 
      return {
        ...state,
        user_data: action.payload
      }
    case USER_CONTENT: 
      return {
        ...state,
        user_content: action.payload
      }
    default: return state
  }
}

export default reduser
