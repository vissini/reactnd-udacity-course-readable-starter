import React, {Component} from 'react'
import {connect} from 'react-redux' 

import api from '../../services/api'
import {randomString} from '../../utils'
import {
  removePost,
  updatePost,
  upVotePost,
  downVotePost
} from '../../actions/posts'
import TopActions from '../shared/TopActions'
import ModalCreatePost from '../shared/ModalCreatePost'
import ModalUpdatePost from '../shared/ModalUpdatePost'

function getFormattedDate (date) {
  let d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getUTCFullYear()}`
}

class PostDetails extends Component {
  editInput = null
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      loadingComments: true,
      addingComment: false,
      errorComments: null,
      comments: [],
      updatingCommentList: [],
      post: null,
      error: null,
      showModalCreatePost: false,
      showModalUpdatePost: false,
      isLoadingModalCreatePost: false,
      isLOadingModalUpdatePost: false,
      edittingComment: null
    }
  }
  componentDidMount () {
    const { postId } = this.props.match.params
    api.getPostById(postId)
      .then(post => this.setState({ post, loading: false }))
      .catch(err => this.setState({ error: (err.message || err), loading: false }))
      .then(() => {
        if (!this.state.error) {
          this.loadComments(postId)
        } else {
          this.setState({
            loadingComments: false
          })
        }
      })
  }
  loadComments (postId) {
    this.setState({ loadingComments: true, errorComments: null, comments: [] })
    api.getComments(postId)
      .then(comments => this.setState({ loadingComments: false, comments }))
      .catch(err => this.setState({ loadingComments: false, errorComments: (err.message || err) }))
  }
  createNewPost = (params) => {
    this.setState({
      isLoadingModalCreatePost: true
    })
    params.id = randomString(22)
    api.createPost(params)
      .then(() => {
        this.setState({ showModalCreatePost: false, isLoadingModalCreatePost: false })
      })
      .catch((err) => {
        this.setState({
          isLoadingModalCreatePost: true
        })
        alert(err)
      })
  }
  updatePost = (params) => {
    this.setState({ showModalUpdatePost: false, loading : true })
    this.props.updatePost(params.id, params)
      .then(post => {
        this.setState({
          post: {
            ...this.state.post,
            ...post.payload
          },
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        alert(err)
      })

  }
  upVotePost () {
    this.setState({ loading : true })
    this.props.upVotePost(this.state.post.id)
      .then(post => {
        this.setState({
          loading: false,
          post: {
            ...this.state.post,
            ...post.payload
          }
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        alert(err)
      })
  }
  downVotePost () {
    this.setState({ loading : true })
    this.props.downVotePost(this.state.post.id)
      .then(post => {
        this.setState({
          loading: false,
          post: {
            ...this.state.post,
            ...post.payload
          }
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        alert(err)
      })
  }
  removePost = (post) => {
    const result = window.confirm(`Are you sure to delete post?\n\n${post.title} - ${post.author}`)
    if (result) {
      this.setState({
        loading: true
      })
      this.props.removePost(post.id)
        .then(() => {
          this.props.history.push('/')
        })
        .catch(err => {
          this.setState({
            loading: false
          })
          alert(err)
        })
    }
  }
  openModalCreatePost = () => {
    this.setState({
      showModalCreatePost: true
    })
  }
  openModalUpdatePost = () => {
    this.setState({
      showModalUpdatePost: true
    })
  }
  addComment = (e) => {
    e.preventDefault()
    const author = e.target.querySelector('input')
    const body = e.target.querySelector('textarea')
    this.setState({
      addingComment: true
    })
    api.addComment({ id: randomString(22), author: author.value, body: body.value, parentId: this.state.post.id })
      .then(comment => {
        this.setState({
          addingComment: false,
          comments: this.state.comments.concat([comment])
        })
      })
      .catch(err => {
        this.setState({
          addingComment: false
        })
        alert('Error adding comment: ' + (err.message || err))
      })
      .then(() => {
        body.value = ''
        author.value = ''
      })
  }
  updateComment (commentId, body) {
    this.setState({
      edittingComment: null,
      updatingCommentList: [commentId].concat(this.state.updatingCommentList)
    })
    api.updateComment(commentId, { body, timestamp: Date.now() })
      .then(comment => {
        this.setState({
          comments: this.state.comments.map(c => {
            if (c.id === commentId) {
              c.body = body
            }
            return c
          }),
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
      })
      .catch(err => {
        this.setState({
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
        alert('Error updating comment: ' + (err.message || err))
      })
  }
  removeComment (commentId) {
    const result = window.confirm('Are you sure to remove this comment?')
    if (!result) {
      return
    }
    this.setState({
      updatingCommentList: [commentId].concat(this.state.updatingCommentList)
    })
    api.removeComment(commentId)
      .then(() => {
        this.setState({
          comments: this.state.comments.filter(comment => comment.id !== commentId),
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
      })
      .catch(err => {
        this.setState({
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
        alert('Error removing comment: ' + (err.message || err))
      })
  }
  upVoteComment (commentId) {
    this.setState({
      updatingCommentList: [commentId].concat(this.state.updatingCommentList)
    })
    api.voteComment(commentId, {
      option: 'upVote'
    })
      .then(({ voteScore }) => {
        this.setState({
          comments: this.state.comments.map(c => {
            if (c.id === commentId) {
              c.voteScore = voteScore
            }
            return c
          }),
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
      })
      .catch(err => {
        this.setState({
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
        alert('Error updating votes: ' + (err.message || err))
      })
  }
  downVoteComment (commentId) {
    this.setState({
      updatingCommentList: [commentId].concat(this.state.updatingCommentList)
    })
    api.voteComment(commentId, {
      option: 'downVote'
    })
      .then(({ voteScore }) => {
        this.setState({
          comments: this.state.comments.map(c => {
            if (c.id === commentId) {
              c.voteScore = voteScore
            }
            return c
          }),
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
      })
      .catch(err => {
        this.setState({
          updatingCommentList: this.state.updatingCommentList.filter(id => id !== commentId)
        })
        alert('Error updating votes: ' + (err.message || err))
      })
  }
  render () {
    const {categories} = this.props
    const {
      post,
      comments,
      loadingComments,
      errorComments,
      error,
      loading,
      showModalCreatePost,
      showModalUpdatePost,
      isLoadingModalCreatePost,
      isLOadingModalUpdatePost,
      updatingCommentList
    } = this.state

    if ((!loading && !post) || (!loading && post && !Object.keys(post).length)) {
      return (<h1 className="text-center" style={{margin: '2rem'}}>Post not found</h1>)
    }

    if (loading || !post) {
      return (
        <div className="loading center margin">
          <strong>Please wait</strong>
          <span>
            <i>Loading ...</i>
          </span>
        </div>
      )
    } else if (error) {
      return (<h1 className="error">{error}</h1>)
    }

    let formattedDate = getFormattedDate(post.timestamp)

    return (
      <div>
        {showModalCreatePost && (<ModalCreatePost
          isLoading={isLoadingModalCreatePost}
          isOpen={showModalCreatePost}
          onClose={() => this.setState({ showModalCreatePost: false })}
          categories={categories}
          onSubmit={(params) => this.createNewPost(params)}/>)}
        {showModalUpdatePost && (<ModalUpdatePost
          isLoading={isLOadingModalUpdatePost}
          isOpen={showModalUpdatePost}
          post={post}
          onClose={() => this.setState({ showModalUpdatePost: false })}
          onSubmit={(params) => this.updatePost({ post, ...params })}/>)}
  
        <TopActions actions={[
          { label: 'Create new post', onClick: this.openModalCreatePost },
          { label: 'Delete', float: 'right', class: 'btn-danger', onClick: () => {
            this.removePost(post)
          }},
          { label: 'Edit', float: 'right', onClick: () => {
            this.openModalUpdatePost()
          } },
          { group: [
            { label: 'Up vote', class: 'btn-info', icon: 'thumb-up', onClick: () => {
              this.upVotePost()
            } },
            { label: 'Down vote', class: 'btn-info', icon: 'thumb-down', onClick: () => {
              this.downVotePost()
            } }
          ], float: 'right' }
        ]}/>
        {(post && !loading && !error) && (
          <div>
            <h1 style={{marginTop: '1rem'}}>{post.title}</h1>
            <div>
              <h3>Score: {post.voteScore}</h3>
              <h4 className="float-left sub-title">Author: {post.author}</h4>
              <h4 className="float-right sub-title">Date: {formattedDate}</h4>
              <div className="clearfix"></div>
            </div>
            <p style={{ fontSize: '1.5rem', padding: '2rem 0' }}>{post.body}</p>
            <hr/>
            <h5>Comment{comments.length !== 1 ? 's' : ''}: {comments.length}</h5>
            {
              (loadingComments && (
                <div className="loading center margin">
                  <strong>Please wait</strong>
                  <span>
                    <i>Loading ...</i>
                  </span>
                </div>
              ))
              || (errorComments && (
                <div className="text-center">
                  <h5>Error getting comments information: {errorComments}</h5>
                  <button className="btn btn-primary" style={{float: 'initial'}} onClick={() => {
                    this.loadComments(post.id) 
                  }}>Reload comments</button>
                </div>
              ))
              || (
                <div>
                  <br/>
                  {comments && comments.filter(comment => !comment.deleted).map(comment => (
                    <div key={comment.id} className="card" style={{marginBottom: '1rem', position: 'relative'}}>
                      {
                        updatingCommentList.indexOf(comment.id) > -1 &&
                        (
                          <div className="body-loading loading-content">
                            <div className="loading center">
                              <strong>Please wait</strong>
                              <span>
                                <i>Loading ...</i>
                              </span>
                            </div>
                          </div>
                        )
                      }
                      <div className="card-body">
                        <h5 className="card-title float-left" style={{margin: 0}}>{comment.author}</h5>
                        <h6 className="card-subtitle mb-2 text-muted float-right" style={{margin: 0}}>{getFormattedDate(comment.timestamp)}</h6>
                        <div className="clearfix"></div>
                        <hr/>
                        { (this.state.edittingComment === comment.id && (
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            this.updateComment(comment.id, e.target.querySelector('textarea').value)
                          }}>
                            <textarea autoFocus="true" className="form-control" defaultValue={comment.body}/>
                            <br/>
                            <div>
                              <button type="submit" className="btn btn-success">Update comment</button>
                              <button type="button" className="btn btn-default" onClick={() => {
                                this.setState({
                                  edittingComment: null
                                })
                              }}>Cancel</button>
                            </div>
                            <div className="clearfix"/>
                            <br/>
                          </form>
                        )) || (
                          <p className="card-text">{comment.body}</p>
                        )}
                        <h6><b>Score: {comment.voteScore}</b></h6>
                        <div className="float-left">
                          <a className="card-link" onClick={(e) => {
                            e.preventDefault()
                            this.upVoteComment(comment.id)
                          }}>Up vote <span className="oi" data-glyph="thumb-up" style={{marginLeft: '0.5rem'}}/></a>
                          <a className="card-link" onClick={(e) => {
                            e.preventDefault()
                            this.downVoteComment(comment.id)
                          }}>Down vote <span className="oi" data-glyph="thumb-down" style={{marginLeft: '0.5rem'}}/></a>
                        </div>
                        <div className="float-right">
                          <a className="card-link text-info" onClick={(e) => {
                            e.preventDefault()
                            this.setState({ edittingComment: comment.id })
                          }}>Edit</a>
                          <a className="card-link text-danger" onClick={(e) => {
                            e.preventDefault()
                            this.removeComment(comment.id)
                          }}>Remove</a>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="add-comment" style={{padding: '.5rem'}}>
                    <h5>Add new comment:</h5>
                    <form onSubmit={this.addComment}>
                      <input disabled={this.state.addingComment} className="form-control" required placeholder="Author" />
                      <textarea disabled={this.state.addingComment} placeholder="Comment" required rows="5" className="form-control" style={{margin: '1rem 0'}}/>
                      <div>
                        <button type="submit" disabled={this.state.addingComment} className="btn btn-success">Send comment</button>
                        {this.state.addingComment && (
                          <div className="loading float-left" style={{ marginLeft: '1rem' }}>
                           <strong>Please wait</strong>
                           <span>
                             <i>Loading ...</i>
                           </span>
                         </div>
                        )}
                      </div> 
                    </form> 
                    <div className="clearfix"></div>
                    <hr/>
                  </div>
                </div>
              )
            }
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: categories.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: id => dispatch(removePost(id)),
    updatePost: (id, data) => dispatch(updatePost(id, data)),
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
