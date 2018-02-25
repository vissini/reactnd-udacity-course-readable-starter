import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {capitalizeFirstLetter} from '../../utils'

export default class Navigator extends Component {
  render () {
    const categories = this.props.categories || []
    const currentCategory = this.props.currentCategory
    return (
      (categories.length && (
        <nav className="categories">
          {categories.map((category, index) => (
            <Link key={category.name + index} to={`/${category.path}`} className={currentCategory === category.path ? 'active' : ''}>
              {capitalizeFirstLetter(category.name)}
            </Link>
          ))}
        </nav>
      ))
      ||
      (
        <nav></nav>
      )
    )
  }
}
