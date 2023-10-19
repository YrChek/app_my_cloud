import { Route, Routes } from 'react-router'
import './App.css'
import FormDataReq from './formData'
import Start from './start'
import RegistrationForm from './authorization/Registration'
import AuthenticationForm from './authorization/Authentication'
import HomePage from './usersPages/HomePage'
import UpdateItemContent from './usersPages/UpdateItemContent'

function App() {
  console.log('App')

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Start />} />
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
