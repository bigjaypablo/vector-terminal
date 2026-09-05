import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

window.onerror = function (message, source, lineno, colno, error) {
  document.getElementById('root').innerHTML =
    '<pre style="color:red;background:#000;padding:20px;white-space:pre-wrap;font-size:12px;">' +
    'ERROR: ' + message + '\n' +
    'Source: ' + source + ':' + lineno + ':' + colno + '\n' +
    (error && error.stack ? error.stack : '') +
    '</pre>'
}

window.addEventListener('unhandledrejection', function (event) {
  document.getElementById('root').innerHTML =
    '<pre style="color:orange;background:#000;padding:20px;white-space:pre-wrap;font-size:12px;">' +
    'UNHANDLED PROMISE REJECTION: ' + (event.reason && event.reason.stack ? event.reason.stack : event.reason) +
    '</pre>'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
