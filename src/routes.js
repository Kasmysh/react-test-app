import { history } from './store'

class AppRoutes {
  get orders() {
    return this._route('/orders');
  }
  get dashboard() {
    return this._route('/dashboard');
  }

  goToOrders() {
    history.push(this.orders)
  }

  goToDashboard() {
    history.push(this.dashboard)
  }

  _route(path) {
    return path;
  }
}

export default new AppRoutes();
