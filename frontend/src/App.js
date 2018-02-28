import React, {Component} from 'react'
import './App.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Switch} from 'react-router'

import BaseLayout from './components/shared/BaseLayout'
import PageNotFound from './components/PageNotFound/PageNotFound'
import PostList from './components/PostList/PostList'
import PostDetails from './components/PostDetails/PostDetails'
import {getCategories} from './actions/categories'

class App extends Component {
  componentDidMount () {
    this.props.getCategories()
  }
  refreshPosts = (category) => {
    this.props.getPostsByCategory(category)
  }
  render () {
    return (
      this.props.loading ? (<div>Loading ...</div>) : (
        <Switch>
          <BaseLayout exact path="/:category/:postId" component={PostDetails} {...this.props}/>
          <BaseLayout exact path="/:category" component={PostList} {...this.props}/>
          <BaseLayout exact path="/" component={PostList} {...this.props}/>
          <BaseLayout path="*" component={PageNotFound} {...this.props}/>
        </Switch>
      )
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    loading: categories.loading,
    categories: categories.list,
    error: categories.error
  }
}

export default withRouter(connect(mapStateToProps, { getCategories })(App))
