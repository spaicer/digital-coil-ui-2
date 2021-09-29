import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { ApiProvider } from './ApiProvider'
import App from './App'
import { Configuration } from './client'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider
      configuration={
        new Configuration({
          basePath:
            process.env.RECOMMENDER_BASE_PATH || 'http://localhost:8080',
        })
      }
    >
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
