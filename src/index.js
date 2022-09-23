import React from 'react'
//import ReactDOM from 'react-dom/client'
import { render } from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

const container = document.getElementById('root')
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
)
