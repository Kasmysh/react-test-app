import React from 'react'
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'

import AppBar from 'components/AppBar'
import AppMenu from 'components/AppMenu'
import Dashboard from 'containers/dashboard'
import Orders from 'containers/orders'
import createRootStore from 'store'
import routes from 'routes'


const { history, store } = createRootStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppBar style={{ height: '80px' }} />
        <AppMenu />
        <div style={{ height: 'calc(100% - 80px - 32px)', padding: '16px' }}>
          <Switch>
            <Route path={routes.orders} component={Orders} />
            <Route path={routes.dashboard} component={Dashboard} />
            <Redirect to={routes.orders} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
