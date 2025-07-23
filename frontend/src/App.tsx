import { Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import { MainLayout } from './layouts/MainLayout'
import './App.css'

function App() {
  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App