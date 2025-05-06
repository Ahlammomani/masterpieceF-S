// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // استيراد GoogleOAuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>

 
    <GoogleOAuthProvider clientId="395531198719-9j7rsgfooiro6dignca9k6684h4c8lqv.apps.googleusercontent.com"> 
 
      <App />
     
      </GoogleOAuthProvider>
   
  </StrictMode>,
)