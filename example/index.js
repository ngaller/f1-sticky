import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import App from './App.jsx'
import reducer from '../src/reducer'


const store = createStore(combineReducers({
  sticky: reducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const div = document.createElement('div')
document.body.appendChild(div)
ReactDOM.render(<Provider store={store}><App /></Provider>, div)
