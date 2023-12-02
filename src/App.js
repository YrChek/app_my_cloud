import { Route, Routes } from 'react-router'
import './App.css'
import FormDataReq from './formData'
import Start from './start'
import RegistrationForm from './authorization/Registration'
import AuthenticationForm from './authorization/Authentication'
import HomePage from './usersPages/HomePage'
import UpdateItemContent from './usersPages/UpdateItemContent'
import UsersList from './adminPages/UsersList'
import UserFiles from './adminPages/UserFiles'
import ControlButtons from './adminPages/ControlButtons'

function App() {
  console.log('App')

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Start />} />
        {/* <Route path='/admin' element={<UsersList />} /> */}
        <Route path='/admin' element={<ControlButtons />}>
          <Route path='users' element={<UsersList />} />
          <Route path='user/:id/:login/:name/:email' element={<UserFiles />}/>
        </Route>
        <Route path='/home' element={<HomePage />} />
        <Route path='/page' element={<FormDataReq />} />
        <Route path='/home/:id' element={<UpdateItemContent />} />
        <Route path='/auth' element={<AuthenticationForm />} />
        <Route path='/auth/reg' element={<RegistrationForm />} />
      </Routes>
    </div>
  )
}

export default App
