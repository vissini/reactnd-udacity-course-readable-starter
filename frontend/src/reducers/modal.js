import {
  OPEN_MODAL, CLOSE_MODAL
} from '../actions/modal'

const initialState = {
  isOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}
