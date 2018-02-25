import React, {Component} from 'react'
import './App.css'
import {Switch} from 'react-router'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import BaseLayout from './components/shared/BaseLayout'
import PageNotFound from './components/PageNotFound/PageNotFound'
import PostList from './components/PostList/PostList'
import PostDetails from './components/PostDetails/PostDetails'
import {getCategories} from './actions/categories'
import {getPosts, getPost} from './actions/posts'

class App extends Component {
  componentDidMount () {
    this.props.getCategories()
      .then(() => {
        if (!this.props.currentPost) {
          this.props.getPosts(this.props.currentCategory)
        } else {
          this.props.getPost(this.props.currentPost)
        }
      })
  }
  componentWillReceiveProps (newProps) {
    if (newProps.error) {
      alert('Error loading categories: ' + newProps.error)
    }
    if (this.props.currentCategory !== newProps.currentCategory && !newProps.currentPost) {
      this.props.getPosts(newProps.currentCategory)
    }
  }
  render () {
    return (
      (this.props.loading && (
        <div>Loading ...</div>
      ))
      || (
        <Switch>
          <BaseLayout exact path="/:category/:post" component={PostDetails} {...this.props}/>
          <BaseLayout exact path="/:category" component={PostList} {...this.props}/>
          <BaseLayout exact path="/" component={PostList} {...this.props}/>
          <BaseLayout path="*" component={PageNotFound} {...this.props}/>
        </Switch>
      )
    )
  }
}

function mapStateToProps ({ categories, routing }, props) {
  const params = routing.location.pathname.split('/');
  return {
    loading: categories.loading,
    categories: categories.list,
    error: categories.error,
    currentCategory: params[1],
    currentPost: params[2]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPosts: category => dispatch(getPosts(category)),
    getPost: id => dispatch(getPost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
