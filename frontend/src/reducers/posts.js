import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ERROR_RECEIVING_POSTS,
  UPDATING_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR
} from '../actions/posts'

const initialState = {
  loading: false,
  currentPost: null,
  list: {
    result: [],
    entities: {
      post: {}
    }
  },
  updatingList: []
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
    case UPDATING_POST:
      return {
        ...state,
        updatingList: [...state.updatingList, action.id]
      }
    case UPDATE_POST_ERROR:
    case UPDATE_POST_SUCCESS:
      if (action.error) {
        return {
          ...state,
          error: action.error,
          updatingList: state.updatingList.filter(id => id !== action.id)
        }
      }
      if (action.delete) {
        const newState = Object.assign({}, state)
        delete newState.list.entities.post[action.id]
        newState.updatingList = state.updatingList.filter(id => id !== action.id)
        newState.list.result = state.list.result.filter(id => id !== action.id)
        return newState
      }
      return {
        ...state,
        list: {
          ...state.list,
          entities: {
            ...state.list.entities,
            post: {
              ...state.list.entities.post,
              [action.id]: {
                ...state.list.entities.post[action.id],
                ...action.payload
              }
            }
          }
        },
        updatingList: state.updatingList.filter(id => id !== action.id)
      }
    default:
      return state
  }
}
