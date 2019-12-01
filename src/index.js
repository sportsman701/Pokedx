import React from 'react'
import ReactDOM from 'react-dom'
import store from './mobX/pokemon'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App store={store} />, document.getElementById('root'))

serviceWorker.unregister()
