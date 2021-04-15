import { APP_MENU_TOGGLING } from '../actions/appMenu'

function appMenuReducer(
  state = { isOpened: false },
  action
) {
  if (action.type === APP_MENU_TOGGLING) {
    return { isOpened: action.value }
  }
  return state
}

export default appMenuReducer
