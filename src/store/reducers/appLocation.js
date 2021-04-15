import { LOCATION_CHANGE } from "connected-react-router"
import routes from 'routes'

function appLocationReducer(state = null, action) {
  if (action.type === LOCATION_CHANGE) {
    if (action.payload.location.pathname.startsWith(routes.orders)) {
      return 'ORDERS'
    }
    return 'DASHBOARD'
  }
  return state
}

export default appLocationReducer
