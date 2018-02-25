import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ERROR_RECEIVING_POSTS,
  REQUEST_POST_BY_ID,
  RECEIVE_POST_BY_ID,
  ERROR_RECEIVING_POST_BY_ID
} from '../actions/posts'

const initialState = {
  loading: false,
  post: null,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_POSTS:
    case ERROR_RECEIVING_POSTS:
      return {
        ...state,
        loading: false,
        list: action.posts,
        error: action.error
      }
    case REQUEST_POST_BY_ID:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_POST_BY_ID:
    case ERROR_RECEIVING_POST_BY_ID:
      return {
        ...state,
        loading: false,
        post: action.post,
        error: action.error
      }
    default:
      return state
  }
}
