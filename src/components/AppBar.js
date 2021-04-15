import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import MenuIcon from './MenuIcon'
import toggleAppMenu from 'store/actions/appMenu'

function AppBar ({ locationName, isMenuOpened, toggleMenu, ...rest }) {
  return (
    <MaterialAppBar position="static" {...rest}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => toggleMenu(!isMenuOpened)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {locationName}
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  )
}

export default connect(
  (state) => ({
    locationName: state.location,
    isMenuOpened: state.menu.isOpened,
  }),
  (dispatch) => ({
    toggleMenu: bindActionCreators(toggleAppMenu, dispatch),
  })
)(AppBar)
