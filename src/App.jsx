import './App.css'
import {Routes , Route} from 'react-router-dom'

import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Gallery from './components/pages/Gallery'
import Settings from './components/pages/Settings'
import Profile from './components/pages/Profile'
import About from './components/pages/About'
import ForgotPassword from './components/pages/ForgotPassword'
import VerifyOTP from './components/pages/VerifyOTP'
import ResetPassword from './components/pages/ResetPassword'


import MainLayout from './components/layouts/MainLayout'
import ProtectedRoute from './components/routes/ProtectedRoute'
import PublicRoute from './components/routes/PublicRoute'



function App() {
  return (
    <>
    <Routes>
      
      {/* Layout Wrapper */}
      <Route path="/" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>

    {/* Pages */}
    <Route index element={<Gallery/>}/>
    <Route path='/about' element={<About/>}/> 
    <Route path='/settings' element={<Settings/>}/> 
    <Route path='/profile' element={<Profile/>}/> 

    </Route>


    {/* Auth Pages */}
    <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path='/register' element={<PublicRoute><Register/></PublicRoute>} />
    <Route path='/forgot-password' element={<PublicRoute><ForgotPassword/></PublicRoute>} />
    <Route path='/verify-otp' element={<PublicRoute><VerifyOTP/></PublicRoute>} />
    <Route path='/reset-password' element={<PublicRoute><ResetPassword/></PublicRoute>} />



    </Routes>

  
    </>
  )
}

export default App
