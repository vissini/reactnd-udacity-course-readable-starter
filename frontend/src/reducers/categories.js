import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES, ERROR_RECEIVING_CATEGORIES
} from '../actions/categories'

const initialState = {
  loading: true,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_CATEGORIES:
    case ERROR_RECEIVING_CATEGORIES:
      return {
        ...state,
        loading: false,
        list: action.categories,
        error: action.error
      }
    default:
      return state
  }
}
