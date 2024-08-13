import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root.jsx';
import SignIn from './auth/SignIn.jsx';
import SignUp from './auth/SignUp.jsx';
import Erropage from './Erropage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
    errorElement: <Erropage/>
  },
  { path: "/task",
    errorElement: <Erropage/>,
    element: <App/> 
  },
  
  { path: "/signIn",
    errorElement: <Erropage/>,
    element: <SignIn/>
  },
  
  { path: "signUp",
    errorElement: <Erropage/>,
    element: <SignUp/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
