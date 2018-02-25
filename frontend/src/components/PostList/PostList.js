import React,{Component} from 'react'
import {connect} from 'react-redux'

import {addPost, removePost, updatePost, getPosts} from '../../actions/posts'
import TopActions from '../shared/TopActions'

class PostList extends Component {
  actions = [
    { label: 'Create new post', onClick: this.createNewPost }
  ]
  createNewPost () {
    console.log(0)
  }
  render () {
    const { posts, loading, error, updatePost, removePost } = this.props
    return (
      <div>
        <TopActions actions={this.actions}/>
        {(loading && !error) && (
          <div className="loading center margin">
            <strong>Please wait</strong>
            <span>
              <i>Loading ...</i>
            </span>
          </div>
        )}
        {error && (<h3>Error - {error}</h3>)}
        {!loading && posts.map(post => (
          <section key={post.id} id="posts">
            <article className="post">
              <section className="content">
                <header>
                  <h2>{post.title}</h2>
                  <h5>{post.author}</h5>
                </header>
                <h4>2 comments</h4>
                <h4>Score: {post.voteScore}</h4>
              </section>
              <section className="votes">
                <button className="primary">Up vote</button>
                <button className="primary">Down vote</button>
              </section>
              <section className="actions">
                <button className="primary" onClick={() => updatePost(post)}>Edit</button>
                <button className="primary" onClick={() => removePost(post.id)}>Delete</button>
              </section>
              <div className="clearfix"></div>
            </article>
          </section>
        ))}
        {!loading && !posts.length && (<h3 style={{textAlign: 'center'}}>No posts found in this category</h3>)}
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }, props) {
  return {
    loading: posts.loading,
    error: posts.error,
    posts: posts.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: (category) => dispatch(getPosts(category)),
    addPost: (data) => dispatch(addPost(data)),
    removePost: (id) => dispatch(removePost(id)),
    updatePost: (data) => dispatch(updatePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
