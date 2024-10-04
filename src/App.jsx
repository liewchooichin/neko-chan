import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { router } from './routers/RouterMap'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
