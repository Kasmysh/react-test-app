import {
  FETCH_ORDERS_ERROR, FETCH_ORDERS_PENDING, FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_AGGREGATION_PENDING, FETCH_ORDERS_AGGREGATION_SUCCESS, FETCH_ORDERS_AGGREGATION_ERROR,
} from '../actions/orders'

const initialState = {
  error: null,
  pending: false,
  data: [],
  filters: [],
  page: 0,
  count: 0,
  total: 0,
}

export function ordersReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_ORDERS_PENDING:
      return {
        ...state,
        error: null,
        pending: true,
        filters: action.filters,
        page: action.page,
        count: action.count,
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.orders,
        total: action.total,
        count: state.count === null ? action.total : state.count,
      }
    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    default:
      return state;
  }
}
const initialAggregationState = {
  pending: false,
  data: [],
  error: null
}

export function ordersAggregationReducer(state = initialAggregationState, action) {
  switch(action.type) {
    case FETCH_ORDERS_AGGREGATION_PENDING:
      return {
        ...state,
        error: null,
        pending: true,
      }
    case FETCH_ORDERS_AGGREGATION_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.aggregation,
      }
    case FETCH_ORDERS_AGGREGATION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    default:
      return state;
  }
}
