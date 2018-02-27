import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import './PostList.css'

import {
  getPostsByCategory,
  removePost,
  updatePost,
  upVotePost,
  downVotePost
} from '../../actions/posts'
import TopActions from '../shared/TopActions'
import ModalCreatePost from '../shared/ModalCreatePost'
import ModalUpdatePost from '../shared/ModalUpdatePost'
import api from '../../services/api'
import {randomString} from '../../utils'

class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModalCreatePost: false,
      showModalUpdatePost: false,
      isLoadingModalCreatePost: false,
      postToUpdate: null
    }
  }
  componentDidMount () {
    this.props.getPostsByCategory()
  }
  openModalCreatePost = () => {
    this.setState({
      showModalCreatePost: true
    })
  }
  openModalUpdatePost = (post) => {
    this.setState({
      postToUpdate: post,
      showModalUpdatePost: true
    })
  }
  createNewPost = (params) => {
    const { getPostsByCategory } = this.props
    this.setState({
      isLoadingModalCreatePost: true
    })
    params.id = randomString(22)
    api.createPost(params)
      .then(() => {
        this.setState({ showModalCreatePost: false, isLoadingModalCreatePost: false })
        getPostsByCategory()
      })
      .catch((err) => {
        this.setState({
          isLoadingModalCreatePost: true
        })
        alert(err)
      })
  }
  updatePost = (params) => {
    this.setState({ showModalUpdatePost: false })
    this.props.updatePost(params.id, params)
  }
  removePost = (post) => {
    const result = window.confirm(`Are you sure to delete post?\n\n${post.title} - ${post.author}`)
    if (result) {
      this.props.removePost(post.id)
    }
  }
  render () {
    const {
      currentCategory,
      categories,
      updating,
      posts,
      loading,
      error,
      upVotePost,
      downVotePost
    } = this.props

    const postList = posts.result
      .filter(id => posts.entities.post[id].category === currentCategory || !currentCategory)

    return (
      <div>
        {this.state.showModalCreatePost && (<ModalCreatePost
          isLoading={this.state.isLoadingModalCreatePost}
          isOpen={this.state.showModalCreatePost}
          onClose={() => this.setState({ showModalCreatePost: false })}
          categories={categories}
          onSubmit={(params) => this.createNewPost(params)}/>)}
        {this.state.showModalUpdatePost && (<ModalUpdatePost
          isLoading={this.state.isLoadingModalUpdatePost}
          isOpen={this.state.showModalUpdatePost}
          post={this.state.postToUpdate}
          onClose={() => this.setState({ showModalUpdatePost: false })}
          categories={categories}
          onSubmit={(params) => this.updatePost(params)}/>)}

        <TopActions actions={[
          { label: 'Create new post', onClick: this.openModalCreatePost }
        ]}/>

        {(loading && !error) && (
          <div className="loading center margin">
            <strong>Please wait</strong>
            <span>
              <i>Loading ...</i>
            </span>
          </div>
        )}
        {error && (<h3 style={{color: 'red', textAlign: 'center'}}>Error - {error}</h3>)}
        {!loading && 
          postList.map(id => {
            const post = posts.entities.post[id]
            return (
              <section key={post.id} id="posts" className="post">
                {
                  updating.indexOf(id) > -1 &&
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
                <article>
                  <section className="content">
                    <header>
                      <h2>{post.title}</h2>
                      <h5>{post.author}</h5>
                    </header>
                    <h4>{post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}</h4>
                    <h4>Score: {post.voteScore}</h4>
                  </section>
                  <section className="votes">
                    <button className="primary" onClick={() => upVotePost(id)}>Up vote</button>
                    <button className="primary" onClick={() => downVotePost(id)}>Down vote</button>
                  </section>
                  <section className="actions">
                    <button className="primary" onClick={() => this.openModalUpdatePost(post)}>Edit</button>
                    <button className="primary" onClick={() => this.removePost(post)}>Delete</button>
                  </section>
                  <div className="clearfix"></div>
                </article>
              </section>
            )
        })}
        {!loading && !error && !postList.length && (<h3 style={{textAlign: 'center'}}>No posts found in this category</h3>)}
        <div  style={{ display: (this.state.showModalCreatePost || this.state.showModalUpdatePost) ? 'block' : 'none' }} className={`modal-backdrop fade ${(this.state.showModalCreatePost || this.state.showModalUpdatePost) ? 'show' : '' }`}></div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }, props) {
  return {
    loading: posts.loading,
    error: posts.error,
    posts: posts.list,
    updating: posts.updatingList,
    categories: categories.list,
    currentCategory: props.match.params.category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: id => dispatch(removePost(id)),
    updatePost: (id, data) => dispatch(updatePost(id, data)),
    upVotePost: id => dispatch(upVotePost(id)),
    downVotePost: id => dispatch(downVotePost(id)),
    getPostsByCategory: category => dispatch(getPostsByCategory(category))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))
