import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.jsx'

// simple solution to get initial value from query string
let amount = 3
if(window.location.search) {
  amount = Math.min(9, parseInt(window.location.search.replace(/[^0-9\.]/g, ''), 10))
}

ReactDOM.render(<App amount={amount}/>, document.getElementById('root'))
