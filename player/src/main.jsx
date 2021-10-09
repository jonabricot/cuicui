import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { globalCss } from '@player_root/stitches.config'

const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },
  body: {
    fontFamily: '$normal',
    backgroundColor: '$background',
    color: '$text',
    fontSize: '$root'
  }
});

globalStyles()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
