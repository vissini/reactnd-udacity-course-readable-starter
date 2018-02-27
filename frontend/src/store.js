import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'

import reducers from './reducers'
import api from './services/api'

const services = {
  api
}

export default ({ history }) => {
  const thunkWithExtras = thunk.withExtraArgument({ services })
  const reactRouterMiddleware = routerMiddleware(history)
  // Add support for Redux Dev Tools
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middlewares = [
    thunkWithExtras,
    reactRouterMiddleware
  ]

  return createStore(
    reducers,
    composeEnhancer(
      applyMiddleware(...middlewares)
    )
  )  
}
