export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const ERROR_RECEIVING_CATEGORIES = 'ERROR_RECEIVING_CATEGORIES'


export function getCategories () {
  return async (dispatch, _, { services }) => {
    dispatch({ type: REQUEST_CATEGORIES })

    try {
      const categories = await services.api.getCategories()
      dispatch({ type: RECEIVE_CATEGORIES, categories: categories })
    } catch (err) {
      dispatch({ type: ERROR_RECEIVING_CATEGORIES, error: err.message, categories: [] })
    }
  }
}
