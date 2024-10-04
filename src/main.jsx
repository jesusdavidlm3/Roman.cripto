import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContextProvider'
import Root from './pages/root'
import errorPage from './pages/errorPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import page3 from './pages/page3'
import './style.scss'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <errorPage/>,
    children: [
      {
        path: '/Home',
        element: <Home/>
      },
      {
        path: '/Dashboard',
        element: <Dashboard/>
      },
      {
        path: '/ch3',
        element: <page3/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider  router={router}/>
  </AppContextProvider>
)
