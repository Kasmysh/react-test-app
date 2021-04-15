import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import toggleAppMenu from 'store/actions/appMenu'
import { useAppStyles } from 'styles'
import routes from 'routes'

function AppMenu ({ isOpened, closeMenu }) {
  const classes = useAppStyles()

  return (
    <Drawer anchor='left' open={isOpened} onClose={closeMenu}>
      <div
        style={{ width: '200px' }}
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <List>
          <ListItem button>
            <Link className={classes.link} to={routes.dashboard}>
              DASHBOARD
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={classes.link} to={routes.orders}>
              ORDERS
            </Link>
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}

export default connect(
  (state) => ({
    isOpened: state.menu.isOpened
  }),
  dispatch => ({
    closeMenu: bindActionCreators(() => toggleAppMenu(false), dispatch)
  })
)(AppMenu)
