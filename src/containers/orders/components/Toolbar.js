import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialToolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import DatePicker from 'components/DatePicker'
import FilterIcon from 'components/FilterIcon'
import { fetchOrders } from 'store/actions/orders'
import { useAppStyles } from 'styles'

function Toolbar({ isFetching, appliedFilters, page, count, fetchOrders }) {
  const classes = useAppStyles()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = React.useState([]);

  const handleFilterChanged = React.useCallback((filter) => {
    const _filters = [...filters.filter(f => f.id !== filter.id)]
    if (!(filter.value === undefined || filter.value === null || filter.value === '')) {
      _filters.push(filter)
    }
    setFilters(_filters)
  }, [filters, setFilters])

  const handleOpen = React.useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    }, [setAnchorEl]
  );

  const handleClose = () => {
    setAnchorEl(null);
    const applyingFilters = [...appliedFilters]
    let hasNew = false
    for (let filter of filters) {
      const inx = applyingFilters.findIndex(f => f.id === filter.id)
      if (inx === -1) {
        applyingFilters.push(filter)
        hasNew = true
      } else if (applyingFilters[inx].value !== filter.value) {
        hasNew = true
        applyingFilters[inx] = filter
      }
    }
    if (hasNew) {
      fetchOrders(applyingFilters, page, count)
    }
    setFilters([])
  }

  return (
    <MaterialToolbar>
      <div style={{ flex: '1 1 100%' }}>
        {
          appliedFilters.map(f => (
            <Button
              variant="contained" color="secondary"
              style={{ marginRight: '1rem' }}
              key={f.id}
              onClick={() => {
                fetchOrders(appliedFilters.filter(ff => ff.id !== f.id), page, count)
              }}>
              {f.id}: {f.repr}
            </Button>
          ))
        }
      </div>
      <Tooltip title="filter list">
        <IconButton aria-label="filter list" onClick={handleOpen}>
          <FilterIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <DatePicker
            label='Date'
            onChange={date => handleFilterChanged({
                id: 'date',
                filter: order => order.date.isSame(date),
                value: date,
                repr: date.format('YYYY/MM/DD')
              })
            }
          />
        </MenuItem>
        <MenuItem>
          <DatePicker
            label='Start date'
            onChange={date => handleFilterChanged({
                id: 'start date',
                filter: order => order['start date'].isSame(date),
                value: date,
                repr: date.format('YYYY/MM/DD')
              })
            }
          />
        </MenuItem>
        <MenuItem>
          <TextField
            className={classes.textField}
            type='text'
            label='meals'
            onChange={ev => {
              const { value } = ev.target
              handleFilterChanged({
                id: 'meals',
                filter: order => order['meals'] === value,
                value: value,
                repr: value
              })
            }}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                onChange={ev => {
                  const { checked } = ev.target
                  handleFilterChanged({
                    id: 'invoice status',
                    filter: order => order['invoice'] === checked,
                    value: checked,
                    repr: checked
                      ? 'paid'
                      : 'unpaid',
                  })
                }}
                color='primary'
                name='Invoice status'
              />
            }
            label='unpaid / paid'
          />
        </MenuItem>
      </Menu>
    </MaterialToolbar>
  )
}

export default connect(
  (state) => ({
    isFetching: state.orders.pending,
    appliedFilters: state.orders.filters,
    page: state.orders.page,
    count: state.orders.count,
  }),
  dispatch => bindActionCreators({
    fetchOrders: fetchOrders
  }, dispatch)
)(Toolbar)
