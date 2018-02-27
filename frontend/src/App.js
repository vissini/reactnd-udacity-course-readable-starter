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
          <BaseLayout exact path="/:category/:post" component={PostDetails} {...this.props}/>
          <BaseLayout exact path="/:category" component={PostList} {...this.props}/>
          <BaseLayout exact path="/" component={PostList} {...this.props}/>
          <BaseLayout path="*" component={PageNotFound} {...this.props}/>
        </Switch>
      )
    )
  }
}

function mapStateToProps (state = {}, props) {
  return {
    loading: state.categories.loading,
    categories: state.categories.list,
    error: state.categories.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
