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



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      { path: "task",
        element: <App/> 
      },
      { path: "signIn",
        element: <SignIn/>
      },
      { path: "signUp",
        element: <SignUp/>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
