import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'

import appLocationReducer from './reducers/appLocation'
import appMenuReducer from './reducers/appMenu'
import { ordersAggregationReducer, ordersReducer } from './reducers/orders'

export const history = createBrowserHistory();

const createRootStore = () => {
  const middlewares = [routerMiddleware(history), thunk];
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      location: appLocationReducer,
      menu: appMenuReducer,
      orders: ordersReducer,
      ordersAggregation: ordersAggregationReducer,
    }),
    compose(applyMiddleware(...middlewares)),
  );

  return {
    store,
    history,
  };
};

export default createRootStore
