import { createContext } from "react";

const AppContext = createContext({
  user: {
    username: 'No user', 
    full_name: 'No name', 
    email: 'No email'
  },
  userContent: [],
})

export default AppContext
