import axios from 'axios'

import csvToNamedArray from 'utils/csvToArray'
import moment from 'moment'
import React from 'react'

export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';


export function fetchOrdersPending(filters = [], page = 0, count = null) {
  return {
    type: FETCH_ORDERS_PENDING,
    filters,
    page: page,
    count: count,
  }
}

export function fetchOrdersSuccess(orders, total) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders,
    total: total,
  }
}

export function fetchOrdersError(error) {
  return {
    type: FETCH_ORDERS_ERROR,
    error: error
  }
}

export function fetchOrders(filters = [], page = 0, count = null) {
  return async dispatch => {
    dispatch(fetchOrdersPending(filters, page, count))
    try {
      let orders = await getOrders()
      for (let filter of filters) {
        orders = orders.filter(filter.filter)
      }
      const total = orders.length
      if (count !== null) {
        orders = orders.slice(page * count, (page + 1) * count)
      }
      dispatch(fetchOrdersSuccess(orders, total))
    } catch (err) {
      console.error(err)
      dispatch(fetchOrdersError(err.message))
    }
  }
}


export const FETCH_ORDERS_AGGREGATION_PENDING = 'FETCH_ORDERS_AGGREGATION_PENDING';
export const FETCH_ORDERS_AGGREGATION_SUCCESS = 'FETCH_ORDERS_AGGREGATION_SUCCESS';
export const FETCH_ORDERS_AGGREGATION_ERROR = 'FETCH_ORDERS_AGGREGATION_ERROR';


export function fetchOrdersAggregationPending() {
  return {
    type: FETCH_ORDERS_AGGREGATION_PENDING,
  }
}

export function fetchOrdersAggregationSuccess(aggregation) {
  return {
    type: FETCH_ORDERS_AGGREGATION_SUCCESS,
    aggregation: aggregation
  }
}

export function fetchOrdersAggregationError(error) {
  return {
    type: FETCH_ORDERS_AGGREGATION_ERROR,
    error: error
  }
}

export function fetchOrdersAggregation() {
  return async dispatch => {
    dispatch(fetchOrdersAggregationPending())
    try {
      const aggregation = (await getOrders())
        .reduce(
          (p, c) => {
            p.meals[c.meals] = (Number(p.meals[c.meals]) || 0) + 1
            p.unpaid += !c.invoice
            p.totalCount += 1
            const strDate = c.date.format('MM/DD/YYYY')
            p.forDates[strDate] = (p.forDates[strDate] || 0) + 1
            return p
          },
          {
            meals: [],
            unpaid: 0,
            totalCount: 0,
            forDates: {},
          }
        )
      dispatch(fetchOrdersAggregationSuccess(aggregation))
    } catch (err) {
      console.error(err)
      dispatch(fetchOrdersAggregationError(err.message))
    }
  }
}

function getOrders() {
  return axios.get('/orders.csv')
    .then(res =>
      csvToNamedArray(res.data)
        .filter(order => order.id)
        .map(order => ({
          ...order,
          invoice: order.invoice.toLowerCase().startsWith('t'),
          date: moment(order.date, 'MM/DD/YYYY'),
          'start date': moment(order['start date'], 'MM/DD/YYYY'),
        }))
    )
}
