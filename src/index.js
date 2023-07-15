import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import {applyMiddleware,compose} from 'redux'
import { legacy_createStore as createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducers/'

import App from './App'

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}>
                <BrowserRouter> 
                <App/>
                </BrowserRouter>
                </Provider>,
                document.getElementById('root')) 