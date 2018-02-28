import {normalize, schema} from 'normalizr'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ERROR_RECEIVING_POSTS = 'ERROR_RECEIVING_POSTS'
export const UPDATING_POST = 'UPDATING_POST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR'

const postEntity = new schema.Entity('post')
const postsEntity = [postEntity]

export function getPosts (category) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: REQUEST_POSTS })

    try {
      const posts = await services.api.getPosts(category)
      return dispatch({ type: RECEIVE_POSTS, posts: normalize(posts, postsEntity) })
    } catch (err) {
      return dispatch({ type: ERROR_RECEIVING_POSTS, error: err.message || err, posts: [] })
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
      return dispatch({ type: UPDATE_POST_SUCCESS, id, payload: { voteScore } })
    } catch (err) {
      return dispatch({ type: UPDATE_POST_ERROR, error: err.message || err, id })
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
      return dispatch({ type: UPDATE_POST_SUCCESS, id, payload: { voteScore } })
    } catch (err) {
      return dispatch({ type: UPDATE_POST_ERROR, error: err.message || err, id })
    }
  }
}

export function removePost (id) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      await services.api.removePost(id)
      return dispatch({ type: UPDATE_POST_SUCCESS, id, payload: {}, delete: true })
    } catch (err) {
      return dispatch({ type: UPDATE_POST_ERROR, error: err.message || err, id })
    }
  }
}

export function updatePost (id, params) {
  return async (dispatch, _, { services }) => {
    dispatch({ type: UPDATING_POST, id })

    try {
      const updatedPost = await services.api.updatePost(id, params)
      return dispatch({ type: UPDATE_POST_SUCCESS, id, payload: updatedPost })
    } catch (err) {
      return dispatch({ type: UPDATE_POST_ERROR, error: err.message || err, id })
    }
  }
}
