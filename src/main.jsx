import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContextProvider'
import Root from './pages/root'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import './style.scss'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
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
        path: '/History',
        element: <History/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider  router={router}/>
  </AppContextProvider>
)
