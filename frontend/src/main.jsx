import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </div>
    </Provider>
  </StrictMode>,
)
