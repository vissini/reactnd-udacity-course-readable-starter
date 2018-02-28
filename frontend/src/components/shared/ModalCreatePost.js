import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {capitalizeFirstLetter} from '../../utils'
import Modal from './Modal'

export default class CreatePostModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  }
  render () {
    const { categories } = this.props
    return (
      <Modal {...this.props}
        title="Create new Post"
        getResult={() => ({
          title: this.titleInput.value,
          body: this.contentTextArea.value,
          category: this.categoryInput.value,
          author: this.authorInput.value
        })}>
        <div className="form-group">
          <label>Title</label>
          <input required autoFocus="true" className="form-control" name="title" spellCheck="false" autoComplete="off" ref={(input) => {
            this.titleInput = input;
          }}/>
        </div>
        <div className="row">
          <div className="col col-xs-6">
            <div className="form-group">
              <label>Author</label>
              <input required className="form-control" spellCheck="false" name="author" autoComplete="off" ref={(input) => {
                this.authorInput = input;
              }}/>
            </div>
          </div>
          <div className="col col-xs-6">
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" name="category" required ref={(input) => {
                this.categoryInput = input;
              }}>
                <option value="" >Select category</option>
                {categories && categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {capitalizeFirstLetter(category.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea required  rows={10} className="form-control" spellCheck="false" name="body" autoComplete="off" ref={(textarea) => {
            this.contentTextArea = textarea;
          }}/>
        </div>
      </Modal>
    )
  }
}
