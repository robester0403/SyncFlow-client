
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthorizationProvider } from './context/AuthContext.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <AuthorizationProvider>
      <App />
    </AuthorizationProvider>
 
)
