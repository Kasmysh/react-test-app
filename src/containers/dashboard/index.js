import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import OrdersChart from './components/OrdersChart'
import { fetchOrdersAggregation } from 'store/actions/orders'
import ErrorNotice from 'components/notices/ErrorNotice'
import { useAppStyles } from 'styles'
import { makeStyles } from '@material-ui/core/styles'

const useDashboardStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    minHeight: '400px',
    width: '100%',
    maxWidth: '1000px',
    alignItems: 'center',
  },
  aggregation: {
    maxWidth: '300px',
    fontSize: '22px',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '600px',
    padding: '34px',
  },
  chart: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '600px'
  },
  '@media (max-width: 800px)': {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '600px',
    }
  }
}))

function Dashboard ({ isFetching, error, aggregation, fetchOrdersAggregation}) {
  useEffect(fetchOrdersAggregation, [])

  const classes = useAppStyles()
  const dashboardClasses = useDashboardStyles()
  const emptyRow = (isFetching || error || aggregation.length === 0)
    ? (
      <div style={{ margin: 'auto', display: 'table' }}>
        {
          error
            ? <ErrorNotice />
            : <CircularProgress />
        }
      </div>
    )
    : null

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    }}>
      {
        emptyRow
          ? emptyRow
          : (
            <div className={dashboardClasses.container}>
              <div className={dashboardClasses.aggregation}>
                {aggregation.meals.map((mc, i) => (
                  <div key={`${i}_meals`} className={classes.infoLine}>
                    <div>{i} meal(s)</div>
                    <div>{mc}</div>
                  </div>
                ))}
                {Object.keys(aggregation.forDates).slice(0, 1).map((key) => (
                  <div key={key} className={classes.infoLine}>
                    <div>{key}</div>
                    <div>{aggregation.forDates[key]}</div>
                  </div>
                ))}
                <div className={classes.infoLine}>
                  <div>unpaid</div>
                  <div>{aggregation.unpaid}</div>
                </div>
                <div className={classes.infoLine}>
                  <div>total count</div>
                  <div>{aggregation.totalCount}</div>
                </div>
              </div>
              <OrdersChart className={dashboardClasses.chart} data={aggregation.forDates} />
            </div>
          )
      }
    </div>
  )
}

export default connect(
  (state) => ({
    error: state.ordersAggregation.error,
    isFetching: state.ordersAggregation.pending,
    aggregation: state.ordersAggregation.data,
  }),
  dispatch => bindActionCreators({
    fetchOrdersAggregation: fetchOrdersAggregation
  }, dispatch)
)(Dashboard)
