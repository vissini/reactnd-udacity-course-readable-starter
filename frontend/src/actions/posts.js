export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ERROR_RECEIVING_POSTS = 'ERROR_RECEIVING_POSTS'
export const REQUEST_POST_BY_ID = 'REQUEST_POST_BY_ID'
export const RECEIVE_POST_BY_ID = 'RECEIVE_POST_BY_ID'
export const ERROR_RECEIVING_POST_BY_ID = 'ERROR_RECEIVING_POST_BY_ID'

export function getPosts (category) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: REQUEST_POSTS })

    try {
      const posts = await services.api.getPosts(category)
      dispatch({ type: RECEIVE_POSTS, posts })
    } catch (err) {
      dispatch({ type: ERROR_RECEIVING_POSTS, error: err.message, posts: [] })
    }
  }
}

export function getPost (id) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: REQUEST_POST_BY_ID })

    try {
      const post = await services.api.getPost(id)
      dispatch({ type: RECEIVE_POST_BY_ID, post })
    } catch (err) {
      dispatch({ type: ERROR_RECEIVING_POST_BY_ID, error: err.message, posts: [] })
    }
  }
}

export function addPost ({ id, timestamp,  title, author, body, category }) {
  return {
    type: ADD_POST,
    id,
    title,
    author,
    body,
    category
  }
}

export function removePost (id) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function updatePost ({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  }
}

export function postsReceived (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}
