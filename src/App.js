import { Route, Routes } from 'react-router'
import './App.css'
import FormDataReq from './formData'
import Start from './start'
import RegistrationForm from './authorization/Registration'
import AuthenticationForm from './authorization/Authentication'
import HomePage from './usersPages/HomePage'
import DisplayItemContent from './usersPages/DisplayItemContent'

function App() {
  console.log('App')

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/page' element={<FormDataReq />} />
        <Route path='/page/:id' element={<DisplayItemContent />} />
        <Route path='/auth' element={<AuthenticationForm />} />
        <Route path='/auth/reg' element={<RegistrationForm />} />
      </Routes>
    </div>
  )
}

export default App
