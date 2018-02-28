import React from 'react'
import {connect} from 'react-redux'

import Navigator from './Navigator'
import Footer from './Footer'
import {Link, Route} from 'react-router-dom'

const BaseLayout = (props) => {
  const { component: Component, computedMatch: match, ...rest } = props
  return (
    <Route {...rest} render={matchProps => {
      return (
        <div>
          <header className="header-top">
            <div className="container">
              <img alt="logo" src="//s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg" className="logo"/>
              <h1 className="title">
                <Link to="/">React Nanodegree - Readable Starter</Link>
              </h1>
              <div className="clearfix"></div>
            </div>
          </header>
          <main>
            <div className="container">
              {props.categories && (<Navigator categories={props.categories} currentCategory={match.params.category} />)}
              <Component {...matchProps} />
            </div>
          </main>
          <Footer/>
          <div style={{ display: props.isModalOpen ? 'block' : 'none' }} className={`modal-backdrop fade ${props.isModalOpen ? 'show' : '' }`}></div>
        </div>
      )}
     } />
  )
}

function mapStateToProps ({ modal }) {
  return {
    isModalOpen: modal.isOpen
  }
}

export default connect(mapStateToProps)(BaseLayout)
