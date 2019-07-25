import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

// const rootReducer = combineReducers({
//   rootReducer
// });

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
};

export default configureStore;
