import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import CircularProgress from '@material-ui/core/CircularProgress'

import Toolbar from './components/Toolbar'
import ErrorNotice from 'components/notices/ErrorNotice'
import { fetchOrders } from 'store/actions/orders'
import { useAppStyles } from 'styles'

function Orders ({ orderData, filters, page, count, total, is_fetching, error, fetchOrders }) {
  useEffect(() => fetchOrders([], 0, 15), [])

  const handleChangePage = React.useCallback((_, page) => {
    fetchOrders(filters, page, count)
  }, [fetchOrders, filters, count])
  const handleChangeRowsPerPage = React.useCallback((ev) => {
    fetchOrders(filters, 0, parseInt(ev.target.value, 10))
  }, [fetchOrders, filters])

  const classes = useAppStyles()
  const emptyRow = (is_fetching || error)
    ? (
      <TableRow>
        <TableCell colSpan={7}>
          <div style={{ margin: 'auto', display: 'table' }}>
            {
              is_fetching
                ? <CircularProgress />
                : <ErrorNotice />
            }
          </div>
        </TableCell>
      </TableRow>
    )
    : null

  return (
    <div className={classes.main}>
      <Toolbar />
      <div>
        <TableContainer>
          <Table size='medium'>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Start date</TableCell>
                <TableCell align="right">Meals</TableCell>
                <TableCell align="right">Invoice status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                emptyRow
                  ? emptyRow
                  : (
                    orderData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell component="th" scope="row">{order.date.format('YYYY/MM/DD')}</TableCell>
                        <TableCell align="right">{order['firstname lastname']}</TableCell>
                        <TableCell align="right">{order.phone}</TableCell>
                        <TableCell align="right">{order.email}</TableCell>
                        <TableCell align="right">{order['start date'].format('YYYY/MM/DD')}</TableCell>
                        <TableCell align="right">{order.meals}</TableCell>
                        <TableCell align="right">{order.invoice ? 'paid' : 'unpaid'}</TableCell>
                      </TableRow>
                    ))
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 20, 30]}
          component="div"
          count={total}
          rowsPerPage={count || 0}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default connect(
  (state) => ({
    orderData: state.orders.data,
    filters: state.orders.filters,
    page: state.orders.page,
    count: state.orders.count,
    total: state.orders.total,
    is_fetching: state.orders.pending,
    error: state.orders.error,
  }),
  dispatch => bindActionCreators({
    fetchOrders: fetchOrders
  }, dispatch)
)(Orders);
