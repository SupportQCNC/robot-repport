import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' 
import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <div className="bg-gray-100">
        <div>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
