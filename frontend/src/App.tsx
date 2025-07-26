import { Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import { MainLayout } from './layouts/MainLayout'
import './App.css'
import AuthPage from './pages/authPage'

function App() {
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App