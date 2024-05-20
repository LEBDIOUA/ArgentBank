import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import myStore from './redux/myStore.js';
import App from './App.jsx'
import { EtatCnxProvider } from './context/context.jsx'
import './stylesheet/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={myStore} >
    <EtatCnxProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </EtatCnxProvider>
  </Provider >
)
