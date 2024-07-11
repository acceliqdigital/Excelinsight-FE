import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/combineStore/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename='/'>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
