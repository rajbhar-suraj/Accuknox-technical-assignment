import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App