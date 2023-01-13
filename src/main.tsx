import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import {WordleApp} from './WordleApp'
import { store } from './store'
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WordleApp />
    </Provider>
  </React.StrictMode>
)
