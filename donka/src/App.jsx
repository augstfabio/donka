import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Timeline from './pages/Timeline'
import NavBar from './components/NavBar'
import Training from './pages/Training'
import LayoutWithSidebar from './components/LayoutWithSidebar'
import Footer from './components/Footer'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ScrollToTop from './assets/tools/ScrollToTop.js'
import Profile from './pages/Profile.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PrivateLoginAndRegister from './components/PrivateLoginAndRegister.jsx'
import EditProfile from './pages/EditProfile.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import PetProfile from './pages/PetProfile.jsx'
import MultiStepForm from './components/multiStepForm/MultiStepForm.jsx'
import Terms from './pages/Terms.jsx'
import Vaccine from './pages/Vaccine.jsx'
import EditPetProfile from './pages/EditPetProfile.jsx'
import { LoadingProvider } from './context/LoadingContext.jsx'
import { MessageProvider } from './context/MessageContext.jsx'
import BannerAlert from './components/BannerAlert.jsx'
import ConsultaForm from './pages/ConsultaForm.jsx'


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <MessageProvider>
            <BannerAlert type='info' message="Bem vindo ao Donka" />
            <LoadingProvider>
              <ScrollToTop />
              <NavBar />

              <Routes>
                <Route path='/termos-de-serviço' element={<Terms />} />

                <Route path='/login' element={<PrivateLoginAndRegister><Login /></PrivateLoginAndRegister>} />
                <Route path='/register' element={<PrivateLoginAndRegister><Register /></PrivateLoginAndRegister>} />
                <Route path='/restaurar-senha' element={<PrivateLoginAndRegister><ForgotPassword /></PrivateLoginAndRegister>} />
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route element={<PrivateRoute><LayoutWithSidebar /></PrivateRoute>}>
                  <Route path='/pet/:id/timeline' element={<Timeline />} />
                  <Route path='/pet/:id/training' element={<Training />} />
                  <Route path='/pet/:id/vacinas' element={<Vaccine />} />
                  <Route path='/pet/:id/perfil-do-pet' element={<PetProfile />} />
                  <Route path='/pet/:id/consultas/nova-consulta' element={<ConsultaForm />} />
                </Route>
                <Route path='/perfil' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/perfil/editar-perfil' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                <Route path='/pet/novo-pet' element={<PrivateRoute><MultiStepForm /></PrivateRoute>} />
                <Route path='/pet/:id/editar-perfil' element={<PrivateRoute><EditPetProfile /></PrivateRoute>} />

              </Routes>
              <Footer />
            </LoadingProvider>
          </MessageProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
