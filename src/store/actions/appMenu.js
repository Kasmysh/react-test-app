export const APP_MENU_TOGGLING = 'APP_MENU_TOGGLING';

function toggleAppMenu(isOpen) {
  return {
    type: APP_MENU_TOGGLING,
    value: isOpen
  }
}

export default toggleAppMenu
