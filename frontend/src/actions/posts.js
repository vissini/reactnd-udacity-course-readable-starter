import {normalize, schema} from 'normalizr'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ERROR_RECEIVING_POSTS = 'ERROR_RECEIVING_POSTS'
export const REQUEST_POST_BY_ID = 'REQUEST_POST_BY_ID'
export const RECEIVE_POST_BY_ID = 'RECEIVE_POST_BY_ID'
export const ERROR_RECEIVING_POST_BY_ID = 'ERROR_RECEIVING_POST_BY_ID'
export const UPDATING_POST = 'UPDATING_POST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR'

const postEntity = new schema.Entity('post')
const postsEntity = [postEntity]

export function getPostsByCategory (category) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: REQUEST_POSTS })

    try {
      const posts = await services.api.getPosts(category)
      dispatch({ type: RECEIVE_POSTS, posts: normalize(posts, postsEntity) })
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
      dispatch({ type: ERROR_RECEIVING_POST_BY_ID, error: err.message, post: null })
    }
  }
}

export function upVotePost (id) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      const { voteScore } = await services.api.votePost(id, {
        option: 'upVote'
      })
      dispatch({ type: UPDATE_POST_SUCCESS, id, payload: { voteScore } })
    } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, error: err.message, id })
    }
  }
}

export function downVotePost (id) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      const { voteScore } = await services.api.votePost(id, {
        option: 'downVote'
      })
      dispatch({ type: UPDATE_POST_SUCCESS, id, payload: { voteScore } })
    } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, error: err.message, id })
    }
  }
}

export function removePost (id) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      await services.api.removePost(id)
      dispatch({ type: UPDATE_POST_SUCCESS, id, payload: {}, delete: true })
    } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, error: err.message, id })
    }
  }
}

export function updatePost (id, params) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      const updatedPost = await services.api.updatePost(id, params)
      dispatch({ type: UPDATE_POST_SUCCESS, id, payload: updatedPost })
    } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, error: err.message, id })
    }
  }
}
