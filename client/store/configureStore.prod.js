import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

export default function configureStore(initialState) {
  const middlewares = [
    // Add other middleware on this line...
    routerMiddleware(browserHistory),
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}
